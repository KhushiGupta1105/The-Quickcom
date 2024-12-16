
import { Avatar, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material"
import logo from '../../../assets/logo.png'
import { useState } from "react"
import cart from '../../../assets/cart.png'
import { currentDate, postData, getData} from "../../../services/FetchNodeAdminServices"
import Swal from "sweetalert2"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import { userStyle } from "./BrandCss"
import { useEffect } from "react"


export default function Brand(props){
    var classes=userStyle()

    const [categoryId,setCategoryId]=useState('')
    const [subcategoryId,setSubcategoryId]=useState('')
    const [brandName,setBrandName]=useState('')
    const [brandIcon,setBrandIcon]=useState({bytes:'',fileName:cart})
    const [loadingStatus,setLoadingStatus]=useState(false)
    const [errorMessages,setErrorMessages]=useState({})
    const [categoryList,setCategoryList]=useState([])
    const [subcategoryList,setSubcategoryList]=useState([])

    const fetchAllCategory=async()=>{
        var result = await getData('category/display_all_category')
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

    const fetchAllSubcategory=async(cid)=>{
        var body={categoryid:cid}
        var result=await postData('subcategory/get_all_subcategory_by_categoryid',body)
        setSubcategoryList(result.data)
    }

    const handleSubcategory=(cid)=>{
        setCategoryId(cid);
        fetchAllSubcategory(cid)
    }

    const fillSubcategory=()=>{
        return subcategoryList.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }

    const handleImage=((e)=>{
        handleErrorMessages('brandIcon',null)
        setBrandIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
        
    })

    const handleSubmit=async()=>{
        var err=validateData()
        if(err==false){
        setLoadingStatus(true)
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subcategoryId)
        formData.append('brandname',brandName)
        formData.append('brandicon',brandIcon.bytes)
        formData.append('created_at',currentDate())
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Farzi')
        var result=await postData('brand/brand_submit',formData)
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
        setSubcategoryId('')
        setBrandName('')
        setBrandIcon({bytes:'',fileName:cart})
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
        if(subcategoryId.length==0){
            handleErrorMessages('subcategoryId','Pls input subcategoryid')
        }
        if(brandName.length==0)
        {
            handleErrorMessages('brandName','Pls input brandname')
            err=true
        }
        if(brandIcon.bytes.length==0){
            handleErrorMessages('brandIcon','Pls select brand icon...')
            err=true
        }
        return err
    }

    
    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <div className={classes.mainHeadingStyle}>
                        <img src={logo} className={classes.imageStyle} />
                        <div className={classes.headingStyle}>
                          Brand Register
                         </div>
                    </div>
                </Grid>

                <Grid item xs={12}>
                    { /* <TextField onFocus={()=>handleErrorMessages('categoryId',null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} onChange={(e)=>setCategoryId(e.target.value)} label="Category Id" value={categoryId} fullWidth/> */} 
                    { /* <TextField onFocus={()=>handleErrorMessages('subcategoryId',null)} error={errorMessages?.subcategoryId} helperText={errorMessages?.subcategoryId} onChange={(e)=>setSubcategoryId(e.target.value)}  label="Subcategory Id" value={subcategoryId} fullWidth/> */}
                    <FormControl fullWidth>
                        <InputLabel>CategoryId</InputLabel>
                        <Select value={categoryId}
                        label="Category Id"
                        error={!!errorMessages?.categoryId}
                        onFocus={() => handleErrorMessages("categoryId", null)}
                            onChange={(e)=>handleSubcategory(e.target.value)}>
                             {fillCategory()}
                             
                        </Select>
                        <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.categoryId}
              </div>
            </FormHelperText>
                    </FormControl>

                   <FormControl fullWidth>
                        <InputLabel>Subcategory Id</InputLabel>
                        <Select value={subcategoryId}
                        label="Subcategory Id"
                        error={!!errorMessages?.subcategoryId}
                         onFocus={() => handleErrorMessages("subcategoryId", null)}
                        onChange={(e)=>setSubcategoryId(e.target.value)}>
                           {fillSubcategory()}
                        </Select>
                        <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.subcategoryId}
              </div>
            </FormHelperText>
                    </FormControl> 

                    <TextField onFocus={()=>handleErrorMessages('brandName',null)} error={errorMessages?.brandName} helperText={errorMessages?.brandName} onChange={(e)=>setBrandName(e.target.value)}  label="Brand Name" value={brandName} fullWidth/>
                </Grid>

                <Grid item xs={6} className={classes.center}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                         <Button variant="contained" component='label'>Upload
                        <input onChange={handleImage} type="file" accept="image/*" hidden multiple />
                    </Button>

                    <div className={classes.errorMessageStyle}>{errorMessages?.brandIcon!=null?errorMessages?.brandIcon:<></>}</div>
                    </div>
                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <Avatar src={brandIcon.fileName} style={{width:70,height:70}} variant="rounded"/>
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
                    <Button variant="contained" onClick={handleReset}>Reset</Button>
                </Grid>

            </Grid>
        
        </div>
    </div>)
}