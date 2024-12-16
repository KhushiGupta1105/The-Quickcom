import {useState,useEffect} from 'react'
import { getData,serverURL, createDate} from '../../../services/FetchNodeAdminServices'
import MaterialTable from '@material-table/core'
import { userStyle } from './SubcategoryCss'
import { Dialog, DialogContent,DialogActions } from '@mui/material'
import {Button, Grid, TextField, Avatar,IconButton,FormHelperText,MenuItem,Select,FormControl,InputLabel}from '@mui/material'
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import logo from "../../../assets/logo.png"
import cart from '../../../assets/cart.png'
import Swal from "sweetalert2"
import { postData, currentDate } from '../../../services/FetchNodeAdminServices'
import CloseIcon from '@mui/icons-material/Close';

export default function DisplayAllSubcategory()
{
  const classes=userStyle()
    const [subcategoryList,setSubcategoryList]=useState([])
    const [open,setOpen]=useState(false)

    /********Subcategory Actions**** */

    const [categoryId,setCategoryId]=useState('')
    const [subcategoryId,setSubcategoryId]=useState('')
    const [subcategoryName,setSubcategoryName]=useState('')
    const [subcategoryIcon,setSubcategoryIcon]=useState({bytes:'',fileName:cart})
    const [loadingStatus,setLoadingStatus]=useState(false)
    const [errorMessages,setErrorMessages]=useState({})
    const [hideUploadButton,setHideUploadButton]=useState(false)
    const [oldImage,setOldImage]=useState('')
    const [categoryList,setCategoryList]=useState([])

    const handleImage=(e)=>{
        handleErrorMessages('subcategoryIcon',null)
        setSubcategoryIcon({bytes:e.target.files[0],fileName:URL.createObjectURL(e.target.files[0])})
        setHideUploadButton(true)
      
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
      /*if(subcategoryIcon.bytes.length==0){
          handleErrorMessages('subcategoryIcon','Pls select subcategory icon...')
          err=true
      }*/
      return err
  }

  const subcategoryForm=()=>{
    return(
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

                  {hideUploadButton?<div>{showSaveCancelButt()}</div>:
                <Button variant="contained" component='label'>Upload
                    <input onChange={handleImage} hidden type="file" accept="image/*" multiple/>
                </Button>}

                <div className={classes.errorMessageStyle}>{errorMessages?.subcategoryIcon!=null?errorMessages?.subcategoryIcon:<></>}</div>
                </div>
            </Grid>
            <Grid item xs={6} className={classes.center}>
               <Avatar src={subcategoryIcon.fileName} variant="rounded" />
            </Grid>

            
  



          </Grid>
)
  }
  /***********Subcategory Action Ends */
    
    const fetchAllSubcategory=async()=>{
        var result=await getData('subcategory/display_all_subcategory')
        if(result.status){
            setSubcategoryList(result.data)
        }
        else{
            alert(result.message)
        }
    }

    useEffect(function(){
        fetchAllSubcategory()
    },[])

    const handleOpenDialog=(rowData)=>{
      setCategoryId(rowData.categoryid)
      setSubcategoryId(rowData.subcategoryid)
      setSubcategoryName(rowData.subcategoryname)
      setSubcategoryIcon({ bytes: '', fileName: `${serverURL}/images/${rowData.subcategoryicon}` })
      setOpen(true)
      setOldImage(`${serverURL}/images/${rowData.subcategoryicon}`)
    }

    const handleCloseDialog=()=>{
      setOpen(false)
    }

    const showSubcategoryDialog=()=>{
      return(<div>
        <Dialog open={open}>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

          <DialogContent>
            {subcategoryForm()}
            </DialogContent>
            <DialogActions>
            <LoadingButton
        loading={loadingStatus}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="contained"
        onClick={handleEditData}
      >
        Edit Data
      </LoadingButton>
             <Button onClick={handleDeleteSubcategory} variant='contained'>Delete</Button>
              
            </DialogActions>
          
        </Dialog>
      </div>)
    }

    const handleEditData=async()=>{
      var err=validateData()
      if(err==false){
      setLoadingStatus(true)
      var body={'categoryid':categoryId, 'subcategoryname':subcategoryName, 'updated_at':currentDate(), 'user_admin':'Farzi','subcategoryid':subcategoryId}
      
      var result=await postData('subcategory/edit_subcategory_data',body)
      if(result.status){
          Swal.fire({
              position: "top-end",
              icon: "success",
              title: result.message,
              showConfirmButton: false,
              timer: 2000,
              toast:true
          });
      }
      else{
          Swal.fire({
              position: "top-end",
              icon: "error",
              title: result.message,
              showConfirmButton: false,
              timer: 2000,
              toast:true
           });
      } 
      setLoadingStatus(false) 
      
  }
  fetchAllSubcategory()
  }

  const showSaveCancelButt=()=>{
    return(<div>
      <Button onClick={handleEditIcon}>Save</Button>
      <Button onClick={handleCancelIcon}>Cancel</Button>
    </div>)
  }

  const handleEditIcon=async()=>{
    
    setLoadingStatus(true)
    var formData=new FormData()
    formData.append('subcategoryicon',subcategoryIcon.bytes)
    formData.append('updated_at',currentDate())
    formData.append('user_admin','Farzi')
    formData.append('subcategoryid',subcategoryId)
    
    var result=await postData('subcategory/edit_subcategory_icon',formData)
    if(result.status){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
            toast:true
        });
    }
    else{
        Swal.fire({
            position: "top-end",
            icon: "error",
            title: result.message,
            showConfirmButton: false,
            timer: 2000,
            toast:true
         });
    } 
    setLoadingStatus(false) 
    setHideUploadButton(false)

fetchAllSubcategory()
}

const handleCancelIcon=()=>{
  setSubcategoryIcon({bytes:'',fileName:oldImage})
  setHideUploadButton(false)
}

const handleDeleteSubcategory=async()=>{
  Swal.fire({
    title: "Do you want to delete the subcategory?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't delete`
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      subcategoryDelete()
    } 
    else if (result.isDenied) {
      Swal.fire("Subcategory not deleted", "", "info");
    }
  
  });
    
}

const subcategoryDelete=async()=>{
  setLoadingStatus(true)
  var body={'subcategoryid':subcategoryId}
  var result=await postData('subcategory/delete_subcategory',body)

  if (result.status) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: result.message,
      showConfirmButton: false,
      timer: 2000,
      toast: true
    });
  }
  else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: result.message,
      showConfirmButton: false,
      timer: 2000,
      toast: true
    });
  }
  setLoadingStatus(false)
  setHideUploadButton(false)

  fetchAllSubcategory()
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





    /**********Table***** */

    function subcategoryTable() {
        return (
          <div className={classes.root}>
            <div className={classes.displayBox}>
              <MaterialTable
                title="Subcategory List"
                columns={[
                  { title: 'Category Name', field: 'categoryname' },
                  { title: 'Subcategory Id', field: 'subcategoryid' },
                  { title: 'Subcategory Name', field: 'subcategoryname' },
                  { title: 'Created At', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },
                  { title: 'Admin', field: 'user_admin' },
                  { title: 'Icon', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.subcategoryicon}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> },
                ]}
    
                data={subcategoryList}
                options={{
                  pageSize: 3,
                  pageSizeOptions: [3, 5, 10, { value: subcategoryList.length, label: 'All' }]
                }}
    
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Edit Category',
                    onClick: (event, rowData) =>handleOpenDialog(rowData)
                  }
                ]}
              />
            </div>
          </div>
        )
      }
      /************Table ends */


    return(<div>
        {subcategoryTable()}
        {showSubcategoryDialog()}
    </div>)
}