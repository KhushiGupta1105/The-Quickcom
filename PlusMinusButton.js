import { useState } from "react"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { useEffect } from "react"

export default function PlusMinusButton(props){
    const [overState,setOverState]=useState('#b5b5b5')
    const [value,setValue]=useState(props.qty)

    useEffect(function(){
        setValue(props.qty)
    },[props.qty])

    const handlePlus=()=>{
       var v=value
        v++
        setValue(v)
        props.onChange(v)
    }

    const handleMinus=()=>{
       var v=value
        v--
        setValue(v)
        props.onChange(v)
    }

    return(<div>
        {value==0?<div onClick={handlePlus} onMouseOver={()=>setOverState('#1f3d4c')} onMouseLeave={()=>setOverState('#b5b5b5')} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:8,width:150,height:35,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5,cursor:'pointer'}}>
        Add

    </div>:

    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8,width:150,height:35,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5}}>
    <div onClick={handleMinus} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:8,width:35,height:35,border:`0.7px solid ${overState}`,color:'#1f3d4c',fontSize:16,fontWeight:'bold',borderRadius:17.5,cursor:'pointer'}}><RemoveIcon /></div>
    <div>{value}</div>
    <div onClick={handlePlus} style={{display:'flex', background:'#0c52732', justifyContent:'center',alignItems:'center',marginTop:8,width:35,height:35,border:`0.7px solid ${overState}`,color:'#fff',fontSize:16,fontWeight:'bold',borderRadius:17.5,cursor:'pointer'}}><AddIcon /></div>
        </div>}
    </div>)
}