import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material/useMediaQuery'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { serverURL,postData } from '../../../services/FetchNodeAdminServices'
import AddToCart from './AddToCart'
import {Avatar, Divider, Grid, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from'@mui/material'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import  KeyboardArrowUpIcon  from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useRef } from 'react'
import ProductDescription from './ProductDescription'
import Header from '../homepage/Header'
import PlusMinusButton from '../homepage/PlusMinusButton'
import { useDispatch,useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

export default function ProductImageComponent({product,setProduct,refresh,setRefresh})
{

    const dispatch=useDispatch()
    const navigate = useNavigate()
    const [index,setIndex]=useState(0)

    var cartData=useSelector((state)=>state?.cart)
    var keys=Object.keys(cartData)

    
    var scrollRef=useRef()
    var settings={
        dots:false, infinite:true, spaceBetween:24, slidesToShow:4, slidesToScroll:1, 
        arrow:false, vertical:true, verticalSwiping:true, beforeChange:(current,next)=>setIndex(next) 
    }

    const [productImages,setProductImages]=useState([])
    const [selectedImage,setSelectedImage]=useState(product.picture)

    const fetchAllImages=async()=>{
     var response=await postData('userinterface/user_display_product_pictures',{productdetailid:product?.productdetailid})
    setProductImages(response?.data[0]?.filenames?.split(","))
 }

 useEffect(()=>{
    setSelectedImage(product.picture)
     fetchAllImages()
 },[product])

   const handleImage=(item)=>{
    setSelectedImage(item)
   } 

    const showImage=()=>{
        return productImages.map((item,i)=>{
            return <div>
            <img onClick={()=>handleImage(item)} src={`${serverURL}/images/${item}`} style={{width:'60%', borderRadius:20, border:'1px solid #e0e0e0', padding:6}}/>
            </div>
        })
    }

    const handleNext=()=>{
        scrollRef.current.slickNext()
    }

    const handlePrev=()=>{
        scrollRef.current.slickPrev()
    }

/*var data=[{ productdetailname:'Maaza Mango Drink ', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
            offerprice:0, offertype:'Festival', productstatus:'Trending', picture:'maaza.webp'},
    { productdetailname:'Maggi 2-Minute Masala Noodles', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:420, 
             offerprice:390, offertype:'Festival', productstatus:'Trending', picture:'maggi.webp'},
    { productdetailname:'Strings Energy Drink', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
             offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'string.jpg'},
    { productdetailname:'Vim Lemon Concentrated Dishwash', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
               offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'vim.webp'},
    { productdetailname:'Lays American Style Cream and Onion Potato Chips', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
              offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'lays.webp'},
    { productdetailname:'Munch Choclate', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
             offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'munch.webp'},
    { productdetailname:'Wagh Bakri Premium Leaf Tea ', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
              offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'wakhtea.webp'},
    { productdetailname:'Parle Hide & Seek Biscuits', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
                offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'hide&seek.webp'},
    { productdetailname:'Tata Tea Premium', weight:250, weighttype:'gm', packagingtype:'1', noofqty:'1', stock:5, price:99, 
                  offerprice:80, offertype:'Festival', productstatus:'Trending', picture:'tea.webp'}
     
            ]*/

                  const handleChange=(value,item)=>{
                    if(value==0)
                    {
                        dispatch({type:"DELETE_CART",payload:[item.productdetailid]})
                    }
                    else
                    {
                    item['qty']=value
                    dispatch({type:"ADD_CART",payload:[item.productdetailid,item]})
                    }
                
                    setRefresh(!refresh)
                }

        const showImages=()=>{
            return(
                <div style={{display:'flex', flexDirection:'column', justifyContent:'center', width:'90%'}}>
                    <div>
                        <img src={`${serverURL}/images/${selectedImage}`} style={{height:450, width:'95%'}}/>
                    </div>

                    <div style={{display:'flex', justifyContent:'center'}}>
                    <PlusMinusButton qty={keys.includes(product?.productdetailid+"")?product?.qty:0}  onChange={(value)=>handleChange(value,product)} />
                    </div>
                </div>
            )
        }

        return(
            <div style={{marginLeft:20, display:'flex', marginTop:10, position:'relative'}}>

                <div onClick={handleNext} style={{cursor:'pointer',marginLeft:-3, marginBottom:50, marginTop:5, position:'absolute',zIndex:1,
                    background:'#fff', width:80, height:35, verticalAlign:'top', transition:'cubic-bezier(0.35,0.25,1) 300ms', borderRadius:22, border:'1px solid #e0e0e0',
                    display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                    <KeyboardArrowUpIcon style={{color:'#0c5273'}} />
                </div>

            <div elevation={0.5}>
                <Slider ref={scrollRef} {...settings} style={{position:'relative', objectFit:'contain', marginTop:35, paddingTop:15, overflow:'hidden', width:100}}>
                    {showImage()}
                </Slider>
            </div>

            <div onClick={handlePrev} style={{cursor:'pointer',marginLeft:-3,  marginTop:380, position:'absolute',zIndex:1,
                    background:'#fff', width:80, height:35,  transition:'cubic-bezier(0.35,0.25,1) 300ms', borderRadius:22, border:'1px solid #e0e0e0',
                    display:'flex', alignItems:'center', justifyContent:'center'
                }}>
                    <KeyboardArrowDownIcon style={{color:'#0c5273'}} />
                </div>

                <Paper elevation={0.5} style={{position:'relative',padding:16, borderRadius:24, border:'1px solid #e0e0e0', overflow:'hidden', height:550}}>
                    <Slider style={{display:'flex', justifyContent:'center', marginLeft:-5, height:500, width:400}}>
                        {showImages()}
                    </Slider>
                </Paper>

                
            
            
            
            </div>
        )


}
