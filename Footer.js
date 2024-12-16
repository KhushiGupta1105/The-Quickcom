import { useState } from "react"
import AppBar from "@mui/material/AppBar";
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";
import logo from '../../../assets/logo.png'

export default function Footer() {
    return (
        <Box style={{ marginTop: 50 }}>
            <AppBar position="static" style={{ backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>

                <Grid container style={{ paddingLeft: 100, paddingTop: 40, paddingBottom: 20 }}>

                    <Grid item xs={2}>
                        <div style={{ color: '#141414', fontWeight: 800, fontSize: 17, marginBottom: 10, padding: 8 }}>All Categories</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Groceries</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Lifestyle</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Fashion</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Electronics</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Wellness</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Furniture</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Toys</div>
                    </Grid>

                    <Grid item xs={2}>
                        <div style={{ color: '#141414', fontWeight: 800, fontSize: 17, marginBottom: 10, padding: 8 }}>Popular Categories</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Biscuits, Drinks & Packages Foods</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Fruits & Vegetables</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Cooking Essentials</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Dairy & Bakery</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Personal Care</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Beauty</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Home Care</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Mom & Baby Care</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>School, Office & Stationery</div>
                    </Grid>

                    <Grid item xs={2}>
                        <div style={{ color: '#141414', fontWeight: 800, fontSize: 17, marginBottom: 10, padding: 8 }}>Customer Account</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>My Account</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>My Orders</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Wishlist</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Delivery Addresses</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>JioMart Wallet</div>
                    </Grid>

                    <Grid item xs={2}>
                        <div style={{ color: '#141414', fontWeight: 800, fontSize: 17, marginBottom: 10, padding: 8 }}>Help & Support</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>About Us</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>FAQ</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Terms & Conditions</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Privacy Policy</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>E-waste Policy</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Cancellation & Return Policy</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>Shipping & Delivery Policy</div>
                        <div style={{ color: '#636e72', fontWeight: 500, fontSize: 16, padding: 8, letterSpacing: -0.08, lineHeight: 1.5 }}>AC Installation by resQ</div>
                    </Grid>

                    <Grid item xs={4}>
                        <div style={{ color: '#141414', fontWeight: 900, fontSize: 24, marginTop: 2, padding: 8, letterSpacing: -0.72, lineHeight: 1, paddingBottom: 16 }}>Contact Us</div>
                        <div>
                            <span style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: 14, fontWeight: 500, letterSpacing: -0.07, lineHeight: 1.5, paddingLeft: 8.5 }}>WhatsApp us:</span>
                            <span style={{ color: '#0c5273', fontSize: 14, fontWeight: 700, letterSpacing: -0.07, lineHeight: 1.5 }}> 70003 70003</span>
                        </div>

                        <div>
                            <span style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: 14, fontWeight: 500, letterSpacing: -0.07, lineHeight: 1.5, paddingLeft: 8.5 }}>Call us:</span>
                            <span style={{ color: '#0c5273', fontSize: 14, fontWeight: 700, letterSpacing: -0.07, lineHeight: 1.5 }}> 1800 890 1222</span>
                        </div>

                        <div style={{ color: 'rgba(0, 0, 0, 0.65)', fontSize: 14, fontWeight: 500, letterSpacing: -0.07, lineHeight: 1.5, paddingLeft: 8.5, paddingBottom: 24 }}>8:00 AM to 8:00 PM, 365 days</div>

                        <div style={{ width: '66%' }}>
                            <span style={{ fontWeight: 500, fontSize: 14, letterSpacing: -0.07, lineHeight: 1.5, color: 'rgba(0, 0, 0, 0.65)' }}>
                                Should you encounter any bugs, glitches, lack of functionality, delayed deliveries, billing errors or other problems on the website.
                            </span>
                            <span style={{ fontWeight: 750, fontSize: 14, letterSpacing: -0.07, lineHeight: 1.5, paddingBottom: 16, color: '#0c5273' }}>cs@Quickcomm.com</span>
                        </div>

                        <div style={{color:'#141414',fontSize :24,fontWeight:900,letterSpacing: -0.72,lineHeight: 1,marginTop:30,paddingBottom:16}}>Download the app</div>
                        <div>
                            <span><img src="/iphone.jpg" style={{width:'30%'}}/></span>
                            <span style={{marginLeft:10}}><img src="/android.jpg" style={{width:'30%'}}/></span>
                        </div>
                    </Grid>

                </Grid>
            </AppBar>

            <div style={{alignSelf:'normal',borderTop:'2px solid #bdc3c7'}}></div>
            <div style={{backgroundColor:'#f5f5f5',display:'flex',alignItems:'center',maxWidth:1398,width:'100%', paddingLeft:8,paddingRight:8,paddingTop:8,paddingBottom:8}}>
                <div style={{display:'flex',alignItems:'center',marginLeft:100}}><span style={{width:42,height:42,borderRadius:15,background:'#81ecec',margin:8}}><img src={logo} style={{width:45,height:45}}/></span><span style={{fontWeight:500,fontSize:13,letterSpacing:-0.06,lineHeight:1.3333333333,color:'rgba(0,0,0,.65)'}}>© 2024 All rights reserved. Quickcomm Ltd</span></div>
                <div style={{marginLeft:360,fontWeight:500,fontSize:13,letterSpacing:-0.06,lineHeight:1.33333333,color:'rgba(0,0,0,.65)'}}>Best viewed on Microsoft Edge 81+, Mozilla Firefox 75+, Safari 5.1.5+, Google Chrome 80+</div>
            </div>
        </Box>
    )

}