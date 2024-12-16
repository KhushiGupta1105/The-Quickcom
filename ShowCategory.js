import  useMediaQuery  from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import * as React from 'react'
import { useState,useEffect } from "react"
import { styled } from '@mui/material/styles'
import  ArrowForwardIosSharpIcon  from "@mui/icons-material/ArrowForwardIosSharp"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import Slider from "@mui/material/Slider"
import { postData } from "../../../services/FetchNodeAdminServices"
import { Avatar, Divider, Grid, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const Accordion= styled((props)=>(
    <MuiAccordion disableGutters elevation={0} square {...props} />
))
(({theme})=>({
    border: `0px solid ${theme.palette.divider}`,
    '&:not(:last-child)':{
        borderBottom:1,
    },
    '&:: before':{
        display:'none'
    }
}))

const AccordionSummary= styled((props)=>(
    <MuiAccordionSummary expandIcon={<ExpandMoreIcon sx={{fontSize: '1.5rem', color:'#0652DD'}} />}
    {...props} />
))
(({theme})=>({
    flexDirection:'row-reverse',
    '&.MuiAccordionSummary-expandIconWrapper.Mui-expanded':{
        tranform:'rotate(180deg)',
    },
    '&.MuiAccordionSummary-content':{
        marginLeft:theme.spacing(1),
    },
    ...theme.applyStyles('white',{
        backgroundColor: 'inherit'
    })
}))

const AccordionDetails=styled(MuiAccordionDetails)(({theme})=>({
    padding:theme.spacing(2),
    //borderBotton:'1px solid #606060'
}))

export default function ShowCategory({data,scid})
{
    const theme= useTheme()
    const matches= useMediaQuery(theme.breakpoints.up('md'))
    const [expanded,setExpanded]=useState('panel1')
    const [brands,setBrands]=useState([])
    
    const fetchAllBrands=async(subcategoryid)=>{
        var result=await postData('userinterface/user_get_all_brand_by_subcategoryid',{subcategoryid:subcategoryid})
        setBrands(result.data)
    }
   
    const showAllBrands=()=>{
        return brands.map((item)=>{
            return <div style={{
                fontWeight:500, fontSize:14, letterSpacing:-0.07, lineHeight: 1.4285714286,
                marginBottom:5
            }}>
                {item.brandname}
            </div>
        })
    }
    
    useEffect(()=>{
        setExpanded(scid)
        fetchAllBrands(scid)
    },[scid])

    const handleChange=(panel)=>(event,newExpanded) =>{
        fetchAllBrands(panel)
        setExpanded(newExpanded ? panel:false)
    }

    const [range,setRange]=React.useState([0,30])
    function handleChanges(event,newValue){
        setRange(newValue)
    }

    const [range1,setRange1]=React.useState([0,30])
    function handleChange1(event,newValue){
        setRange1(newValue)
    }


    const showAllSubCategory=()=>{
        return data.map((item)=>{
            return <div> <Accordion expanded={expanded ===item.subcategoryid} onChange={handleChange(item.subcategoryid)} style={{marginBottom:10}}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{display:'flex', alignItems:'center',flexGrow:1, marginBottom:-15}}>
                    <Typography style={{
                        fontWeight:700, fontSize:14.5, letterSpacing:-0.07, lineHeight: 1.4285714286,
                        width:'100%', color:'rgba(0,0,0,.65)', overflow:"hidden", textOverflow:'ellipsis',
                        display:"webkit-box",webkitLineClamp:"1",webkitBoxOrient:"vertical"
                    }}>
                        {item.subcategoryname}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography style={{marginLeft:30, marginTop:-5}}>
                       {showAllBrands()}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Divider style={{width:'90%'}}/>
            </div>
        })
    }

    return (
        <div>
         {matches?<div style={{display:'flex', flexDirection:'column'}}>
                <div>
                    <Box sx={{marginLeft:10, display:'flex', flexWrap:'wrap', '& > :not(style)':{m:1, width:270, height:500}}}>
                        <section elevation={3} style={{position:'relative',padding:16, borderRadius:24, border:'1px solid #e0e0e0', overflow:'hidden'}}>
                            <div style={{padding:15,borderRadius:24, fontWeight:900, fontSize:24, letterSpacing:-0.72, lineHeight:1}}>Category</div>
                            <div style={{float:'left',width:300,overflowY:'auto', height:450}}>

                                {showAllSubCategory()}
                            </div>
                        </section>
                    </Box>
                    </div>

                    <div style={{marginTop:10}}>
                        <Box sx={{marginLeft:10,display:'flex',flexWrap:'wrap','&> :not(style)': {m:1,width:250,heoght:800}}}>
                            <section elevation={3} style={{position:'relative', padding:16, borderRadius:24, border:'1px solid #e0e0e0', overflow:'hidden'}}>
                                <div style={{marginBotton:12, paddingLeft:15, borderRadius:24, fontWeight:900, fontSize:24, letterSpacing:-0.72, lineHeight:1}}>Filters</div>

                                    <div style={{display:'flex', alignItems:'center', clear:'both', paddingLeft:15, fontWeight:800, fontSize:16, letterSpacing:-0.08, lineHeight:1.5,
                                        color:'#141414',webkitFontSmoothing:'antialiased'}}>
                                            Availability
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex',marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, 
                                                display:'fllex', alignItems:'flex-start',color:'rgba(0,0,0,.65)', cursor:'pointer', position:'relative'}}>
                                                    <span><input type='checkBox'style={{marginLeft:'0.90em',display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9,border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                    name='stock' id='instock' value={1} autoComplete='off' />
                                                    </span>
                                                    <span>
                                                        Include Out of Stock
                                                    </span>
                                                </label>
                                        </div>

                                        <Divider style={{width:'100%', marginTop:10, marginBottom:10}} />

                                        <div style={{display:'flex', alignItems:'center',clear:'both', paddingLeft:15, fontWeight:800, fontSize:16, letterSpacing:-0.08, lineHeight:1.5, color:'#141414',webkitFontSmoothing:'antialised'}}>
                                            Categories
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex',alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'ponter',position:'relative'}}>
                                                <span><input type="checkBox" style={{marginLeft:'0.90em',display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>Breakfast & Snacks Mixes</span>
                                            </label>
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex',alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'ponter',position:'relative'}}>
                                                <span><input type="checkBox" style={{marginLeft:'0.90em',display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>Canned Food</span>
                                            </label>
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex',alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'ponter',position:'relative'}}>
                                                <span><input type="checkBox" style={{marginLeft:'0.90em',display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>Chips & Corn Snacks</span>
                                            </label>
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex',alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'ponter',position:'relative'}}>
                                                <span><input type="checkBox" style={{marginLeft:'0.90em',display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>Choco & Nut Spread</span>
                                            </label>
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex',alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'ponter',position:'relative'}}>
                                                <span><input type="checkBox" style={{marginLeft:'0.90em',display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>Choclates</span>
                                            </label>
                                        </div>

                                        <Divider style={{width:'100%', marginTop:10, marginBottom:10}}/>

                                        <div style={{display:'flex', alignItems:'center', clear:'both', paddingLeft:15, fontWeight:800, fontSize:16, letterSpacing:-0.08, lineHeight:1.5, 
                                            color:'#141414', webkitFontSmoothing:'antialised'}}>
                                            Brand
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex', alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'pointer', position:'relative'}}>
                                                <span>
                                                    <input type='checkBox' style={{marginLeft:'0.90em', display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                    name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>90's Mill</span>
                                            </label>
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex', alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'pointer', position:'relative'}}>
                                                <span>
                                                    <input type='checkBox' style={{marginLeft:'0.90em', display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                    name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>9GRAMS</span>
                                            </label>
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex', alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'pointer', position:'relative'}}>
                                                <span>
                                                    <input type='checkBox' style={{marginLeft:'0.90em', display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                    name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>ADD ME</span>
                                            </label>
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex', alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'pointer', position:'relative'}}>
                                                <span>
                                                    <input type='checkBox' style={{marginLeft:'0.90em', display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                    name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>APLENTY</span>
                                            </label>
                                        </div>

                                        <div style={{paddingLeft:8, display:'flex', marginTop:12, marginBottom:12}}>
                                            <label style={{fontWeight:500, fontSize:15, letterSpacing:-0.07, lineHeight:1.4285714286, display:'flex', alignItems:'flex-start', color:'rgba(0,0,0,.65)', cursor:'pointer', position:'relative'}}>
                                                <span>
                                                    <input type='checkBox' style={{marginLeft:'0.90em', display:'inline-block', width:'1.25em', height:'1.25em', marginRight:9, border:'1 solid rgba(0,0,0,.65)', borderRadius:4}}
                                                    name='stock' id='instock' value={1} autoComplete="off"/>
                                                </span>
                                                <span>BEVZILLA</span>
                                            </label>
                                        </div>

                                        <Divider style={{width:'100%', marginTop:10, marginBottom:10}}/>

                                        <div style={{display:'flex', alignItems:'center', clear:'both',marginBottom:15, paddingLeft:15, fontWeight:800, fontSize:16, letterSpacing:-0.08, lineHeight:1.5, 
                                            color:'#141414', webkitFontSmoothing:'antialised'}}>
                                            Price
                                        </div>

                                        <div style={{width:'80%', paddingLeft:20, paddingRight:12, display:'flex', marginTop:5, marginBottom:12}}>
                                            <Slider value={range} onChange={handleChanges} valueLabelDisplay="auto" />
                                        </div>

                                        <Divider style={{width:'100%', marginTop:10, marginBottom:10}}/>

                                           <div style={{display:'flex', alignItems:'center', clear:'both',marginBottom:15, paddingLeft:15, fontWeight:800, fontSize:16, letterSpacing:-0.08, lineHeight:1.5, 
                                            color:'#141414', webkitFontSmoothing:'antialised'}}>
                                             Price
                                          </div>

                                            <div style={{width:'80%', paddingLeft:20, paddingRight:12, display:'flex', marginTop:0, marginBottom:12}}>
                                                <Slider value={range1} onChange={handleChange1} valueLabelDisplay="auto" />
                                            </div>

                           
                            </section>
                        </Box>
                    </div>

                    </div>:<></>
            }

        </div>
    )
}