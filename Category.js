
import { Grid, TextField, Button, Avatar } from "@mui/material"
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import { useState } from "react"
import { currentDate, postData,serverURL } from "../../../services/FetchNodeAdminServices"
import Swal from "sweetalert2"
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import { userStyle } from "./CategoryCss"



export default function Category(props){
    var classes=userStyle()

    const [categoryName,setCategoryName]=useState('')
    const [categoryIcon,setCategoryIcon]=useState({bytes:'',fileName:cart})
    const [loadingStatus,setLoadingStatus]=useState(false)
    const [errorMessages,setErrorMessages]=useState({})

    const handleErrorMessages=(label,message)=>{
        var msg=errorMessages
        msg[label]=message
        setErrorMessages((prev)=>({...prev,...msg}))
    }

    const validateData=()=>{
        var err=false
        if(categoryName.length==0){
            handleErrorMessages('categoryName','Pls input categoryname...')
            err=true
        }
        if(categoryIcon.bytes.length==0){
            handleErrorMessages('categoryIcon','Pls select category icon...')
            err=true
        }
        return err
    }

    function handleImage(e){
        setCategoryIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
        handleErrorMessages('categoryIcon',null)
    }

    const resetValue=()=>{
        setCategoryName('')
        setCategoryIcon({bytes:'',fileName:cart})
    }
    
    const handleSubmit=async()=>{
        var err=validateData()
        if(err==false){
        setLoadingStatus(true)
        var formData=new FormData
        formData.append('categoryname',categoryName)
        formData.append('categoryicon',categoryIcon.bytes)
        formData.append('created_at',currentDate())
        formData.append('updated_at',currentDate())
        formData.append('user_admin','Farzi')
        var result=await postData('category/category_submit',formData)
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

    const handleReset=()=>{
        resetValue()
    }


    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <div className={classes.mainHeadingStyle}>
                        <img src={logo} className={classes.imageStyle} />
                    
                  <div className={classes.headingStyle}>
                    Category Register
                  </div>
                  </div>
                </Grid>

                <Grid item xs={12}>
                    <TextField onFocus={()=>handleErrorMessages('categoryName',null)} error={errorMessages?.categoryName} helperText={errorMessages?.categoryName} onChange={(e)=>setCategoryName(e.target.value)} label="Category Name" value={categoryName} fullWidth />                
                </Grid>

                <Grid item xs={6} className={classes.center}>
                    <div style={{display:'flex', flexDirection:'column'}}>
                      
                      <Button variant="contained" component='label'>Upload
                        <input onChange={handleImage} hidden type="file" accept="image/*" multiple />
                      </Button>

                      <div className={classes.errorMessageStyle}>{errorMessages?.categoryIcon!=null?errorMessages?.categoryIcon:<></>}</div>
                    </div>

                </Grid>
                <Grid item xs={6} className={classes.center}>
                    <Avatar src={categoryIcon.fileName} variant="rounded" />
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
                <Button onClick={handleReset} variant="contained">Reset</Button>
                </Grid>



            </Grid>
        </div>
        </div>
       
    )
}