import { Grid, TextField, Button, Avatar,FormControl,InputLabel,Select,MenuItem,FormHelperText } from "@mui/material"
import logo from "../../../assets/logo.png"
import { useState } from "react"
import cart from '../../../assets/cart.png'
import { postData, currentDate } from "../../../services/FetchNodeAdminServices"
import Swal from "sweetalert2"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import { userStyle } from "./SubcategoryCss"
import { useEffect } from "react"
import { getData } from "../../../services/FetchNodeAdminServices"


export default function Subcategory(props){
    const [categoryId,setCategoryId]=useState('')
    const [subcategoryName,setSubcategoryName]=useState('')
    const [subcategoryIcon,setSubcategoryIcon]=useState({bytes:'',fileName:cart})
    const [loadingStatus,setLoadingStatus]=useState(false)
    const [errorMessages,setErrorMessages]=useState({})
    const [categoryList,setCategoryList]=useState([])

    const handleImage=(e)=>{
        handleErrorMessages('subcategoryIcon',null)
        setSubcategoryIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
    }

    const handleSubmit=async()=>{
        var err=validateData()
        if(err==false){
        setLoadingStatus(true)
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryname',subcategoryName)
        formData.append('subcategoryicon',subcategoryIcon.bytes)
        formData.append('created_at',currentDate())
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Farzi')
        var result=await postData('subcategory/subcategory_submit',formData)
        if(result.status){
            Swal.fire({
                //position: "top-end",
                icon: "success",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast:false
            });
        }
        else{
            Swal.fire({
                //position: "top-end",
                icon: "error",
                title: result.message,
                showConfirmButton: false,
                timer: 2000,
                toast:true
             });
        } 
        setLoadingStatus(false) 
        resetValue()
    }
    }

    const resetValue=()=>{
        setCategoryId('')
        setSubcategoryName('')
        setSubcategoryIcon({bytes:'',fileName:cart})
    }

    const handleReset=()=>{
        resetValue()
    }

    const handleErrorMessages=(label,message)=>{
        var msg=errorMessages
        msg[label]=message
        setErrorMessages((prev)=>({...prev,...msg}))
    }

    const validateData=()=>{
        var err=false
        if(categoryId.length==0)
        {
            handleErrorMessages('categoryId','Pls input categoryid')
            err=true
        }
        if(subcategoryName.length==0)
        {  
           handleErrorMessages('subcategoryName','Pls input subcategoryname')
            err=true
        }
        if(subcategoryIcon.bytes.length==0){
            handleErrorMessages('subcategoryIcon','Pls select subcategory icon...')
            err=true
        }
        return err
    }

    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')
        setCategoryList(result.data)
    }

    useEffect(function(){
        fetchAllCategory()
    },[])

    const fillCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }


    var classes=userStyle()

    return(<div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
                <div className={classes.mainHeadingStyle}>
                    <img src={logo} className={classes.imageStyle} />
                
                   <div className={classes.headingStyle}>
                      Subcategory Register
                   </div>
                </div>
            </Grid>

            <Grid item xs={12}>
                {/*<TextField error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} onFocus={()=>handleErrorMessages('categoryId','')} onChange={(e)=>setCategoryId(e.target.value)} label="Category Id" value={categoryId} fullWidth /> */}  
                <FormControl fullWidth>
                    <InputLabel>Category Id</InputLabel>
                    <Select value={categoryId}
                    error={!!errorMessages.categoryId}
                    onFocus={()=>handleErrorMessages('categoryId',null)}
                        label="Category Id" 
                        onChange={(e)=>setCategoryId(e.target.value)}>
                            {fillCategory()}
                    </Select>
                    <FormHelperText><div className={classes.errorMessageStyle}>{errorMessages?.categoryId}</div></FormHelperText>
                </FormControl>

                <TextField error={errorMessages?.subcategoryName} helperText={errorMessages?.subcategoryName} onFocus={()=>handleErrorMessages('subcategoryName','')} onChange={(e)=>setSubcategoryName(e.target.value)} label="Subcategory Name" value={subcategoryName} fullWidth />
            </Grid>

            <Grid item xs={6} className={classes.center}>
                <div style={{dispaly:'flex',flexDirection:'column'}}>
                <Button variant="contained" component='label'>Upload
                    <input onChange={handleImage} hidden type="file" accept="image/*" multiple/>
                </Button>
                <div className={classes.errorMessageStyle}>{errorMessages?.subcategoryIcon!=null?errorMessages?.subcategoryIcon:<></>}</div>
                </div>
            </Grid>
            <Grid item xs={6} className={classes.center}>
               <Avatar src={subcategoryIcon.fileName} variant="rounded" />
            </Grid>

            <Grid item xs={6} className={classes.center}>
            <LoadingButton
        loading={loadingStatus}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        onClick={handleSubmit}
      >
        Save
      </LoadingButton>
            </Grid>
            <Grid item xs={6} className={classes.center}>
                <Button onClick={handleReset} variant="contained" >Reset</Button>
            </Grid>
  



          </Grid>

        </div>

       
    
    
    
    </div>)
}