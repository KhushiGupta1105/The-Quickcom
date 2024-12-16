import { useState, useEffect } from 'react'
import { getData, serverURL, createDate } from '../../../services/FetchNodeAdminServices'
import MaterialTable from '@material-table/core'
import { userStyle } from './BrandCss'
import {
  Grid, TextField, Avatar, Dialog, DialogContent, DialogActions, Button, IconButton, FormControl,
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material'
import logo from '../../../assets/logo.png'
import cart from '../../../assets/cart.png'
import { LoadingButton } from "@mui/lab"
import SaveIcon from '@mui/icons-material/Save';
import Swal from "sweetalert2"
import { postData, currentDate } from '../../../services/FetchNodeAdminServices'
import CloseIcon from '@mui/icons-material/Close';

export default function DisplayAllBrand() {
  const classes = userStyle()
  const [brandList, setBrandList] = useState([])
  const [open, setOpen] = useState(false)

  /**********Brand Action****** */
  const [categoryId, setCategoryId] = useState('')
  const [subcategoryId, setSubcategoryId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [brandName, setBrandName] = useState('')
  const [brandIcon, setBrandIcon] = useState({ bytes: '', fileName: cart })
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [errorMessages, setErrorMessages] = useState({})
  const [hideUploadButton, setHideUploadButton] = useState(false)
  const [oldImage, setOldImage] = useState('')
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategoryList(result.data);
  };
  useEffect(function () {
    fetchAllCategory();
  }, []);

  const fillCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const fillSubCategory = () => {
    return subcategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      );
    });
  };

  const handleSubcategory = (cid) => {
    setCategoryId(cid);
    fetchAllSubCategory(cid);
  };

  const fetchAllSubCategory = async (cid) => {
    var body = { categoryid: cid };
    var result = await postData(
      "subcategory/get_all_subcategory_by_categoryid",
      body
    );
    setSubCategoryList(result.data);
  };

  const handleImage = ((e) => {
    handleErrorMessages('brandIcon', null)
    setBrandIcon({ bytes: e.target.files[0], fileName: URL.createObjectURL(e.target.files[0]) })
    setHideUploadButton(true)

  })

  const validateData = () => {
    var err = false
    if (categoryId.length == 0) {
      handleErrorMessages('categoryId', 'Pls input categoryid')
      err = true
    }
    if (subcategoryId.length == 0) {
      handleErrorMessages('subcategoryId', 'Pls input subcategoryid')
    }
    if (brandName.length == 0) {
      handleErrorMessages('brandName', 'Pls input brandname')
      err = true
    }
    /*if(brandIcon.bytes.length==0){
        handleErrorMessages('brandIcon','Pls select brand icon...')
        err=true
    }*/
    return err
  }

  const handleErrorMessages = (label, message) => {
    var msg = errorMessages
    msg[label] = message
    setErrorMessages((prev) => ({ ...prev, ...msg }))
  }

  const brandForm = () => {
    return (
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <div className={classes.mainHeadingStyle}>
            <img src={logo} className={classes.imageStyle} />
            <div className={classes.headingStyle}>
              Brand Register
            </div>
          </div>
        </Grid>

        {/*<Grid item xs={12}>*/}
        { /*<TextField onFocus={()=>handleErrorMessages('categoryId',null)} error={errorMessages?.categoryId} helperText={errorMessages?.categoryId} onChange={(e)=>setCategoryId(e.target.value)} label="Category Id" value={categoryId} fullWidth/>
                <TextField onFocus={()=>handleErrorMessages('subcategoryId',null)} error={errorMessages?.subcategoryId} helperText={errorMessages?.subcategoryId} onChange={(e)=>setSubcategoryId(e.target.value)}  label="Subcategory Id" value={subcategoryId} fullWidth/> */}

        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category Id</InputLabel>
            <Select
              value={categoryId}
              error={!!errorMessages?.categoryId}
              onFocus={() => handleErrorMessages("categoryId", null)}
              label="Category Id"
              onChange={(e) => handleSubcategory(e.target.value)}
            >
              {fillCategory()}
            </Select>
            <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.categoryId}
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Subcategory Id</InputLabel>
            <Select
              value={subcategoryId}
              error={!!errorMessages?.subcategoryId}
              onFocus={() => handleErrorMessages("subcategoryId", null)}
              label="Subcategory Id"
              onChange={(e) => setSubcategoryId(e.target.value)}
            >
              {fillSubCategory()}
            </Select>
            <FormHelperText>
              <div className={classes.errorMessageStyle}>
                {errorMessages?.subcategoryId}
              </div>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField onFocus={() => handleErrorMessages('brandName', null)} error={errorMessages?.brandName} helperText={errorMessages?.brandName} onChange={(e) => setBrandName(e.target.value)} label="Brand Name" value={brandName} fullWidth />
        </Grid>

        <Grid item xs={6} className={classes.center}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            {hideUploadButton ? <div>{showSaveCancelButt()}</div> :
              <Button variant="contained" component='label'>Upload
                <input onChange={handleImage} type="file" accept="image/*" hidden multiple />
              </Button>}

            <div className={classes.errorMessageStyle}>{errorMessages?.brandIcon != null ? errorMessages?.brandIcon : <></>}</div>
          </div>
        </Grid>
        <Grid item xs={6} className={classes.center}>
          <Avatar src={brandIcon.fileName} style={{ width: 70, height: 70 }} variant="rounded" />
        </Grid>



      </Grid>
    )
  }

  /************************************ */

  const fetchAllBrand = async () => {
    var result = await getData('brand/display_all_brand')
    if (result.status) {
      setBrandList(result.data)
      
    }
    else {
      alert(result.message)
    }
  }

  useEffect(function () {
    fetchAllBrand()
  }, [])

  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid)
    fetchAllSubCategory(rowData.categoryid)
    setSubcategoryId(rowData.subcategoryid)
    setBrandId(rowData.brandid)
    setBrandName(rowData.brandname)
    setBrandIcon({ bytes: '', fileName: `${serverURL}/images/${rowData.brandicon}` })
    setOpen(true)
    setOldImage(`${serverURL}/images/${rowData.brandicon}`)
  }

  const showBrandDialog = () => {
    return (<div>
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
          {brandForm()}
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
          <Button onClick={handleDeleteBrand} variant="contained">Delete</Button>

        </DialogActions>
      </Dialog>
    </div>)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleEditData = async () => {
    var err = validateData()
    if (err == false) {
      setLoadingStatus(true)
      var body = { 'categoryid': categoryId, 'subcategoryid': subcategoryId, 'brandname': brandName, 'updated_at': currentDate(), 'user_admin': 'Farzi', 'brandid': brandId }

      var result = await postData('brand/edit_brand_data', body)
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
    }
    fetchAllBrand()
  }

  const showSaveCancelButt = () => {
    return (<div>
      <Button onClick={handleEditIcon}>Save</Button>
      <Button onClick={handleCancelIcon}>Cancel</Button>
    </div>)
  }

  const handleEditIcon = async () => {

    setLoadingStatus(true)
    var formData = new FormData()
    formData.append('brandicon', brandIcon.bytes)
    formData.append('updated_at', currentDate())
    formData.append('user_admin', 'Farzi')
    formData.append('brandid', brandId)

    var result = await postData('brand/edit_brand_icon', formData)
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

    fetchAllBrand()
  }

  const handleCancelIcon = () => {
    setBrandIcon({ bytes: '', fileName: oldImage })
    setHideUploadButton(false)
  }

  const handleDeleteBrand = async () => {
    Swal.fire({
      title: "Do you want to delete the brand?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't delete`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        brandDelete()
      }
      else if (result.isDenied) {
        Swal.fire("Brand not deleted", "", "info");
      }

    });

  }

  const brandDelete = async () => {
    setLoadingStatus(true)
    var body = { 'brandid': brandId }
    var result = await postData('brand/delete_brand', body)

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

    fetchAllBrand()
  }

  /**********Material Table**** */
  function brandTable() {
    return (
      <div className={classes.root}>
        <div className={classes.displayBox}>
          <MaterialTable
            title="Brand  List"
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: "Category Name", field: "categoryname" },
              { title: "Subcategory Name", field: "subcategoryname" },
              { title: 'Brand Name', field: 'brandname' },
              { title: 'Created At', render: (rowData) => <div style={{ display: 'flex', flexDirection: 'column' }}><div>{createDate(rowData.created_at)}</div><div>{createDate(rowData.updated_at)}</div></div> },
              { title: 'Admin', field: 'user_admin' },
              { title: 'Icon', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.brandicon}`} style={{ width: 60, height: 60, borderRadius: 6 }} /></div> },
            ]}

            data={brandList}
            options={{
              pageSize: 3,
              pageSizeOptions: [3, 5, 10, { value: brandList.length, label: 'All' }]
            }}

            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand',
                onClick: (event, rowData) => handleOpenDialog(rowData)
              }
            ]}
          />
        </div>
      </div>
    )
  }

  /************ */


  return (<div>
    {brandTable()}
    {showBrandDialog()}

  </div>)
}