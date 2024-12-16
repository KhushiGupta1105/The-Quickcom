import { useEffect,useState } from 'react';
import Header from '../homepage/Header';
import Footer from '../homepage/Footer'
import ProductDetailsCategory from './ProductDetailsCategory';
import ShowCategory from './ShowCategory';
import { postData,getData } from '../../../services/FetchNodeAdminServices';
import { useLocation } from 'react-router-dom';


export default function PageCategoryDisplay()
{
    const [category,setCategory]=useState([])
    const[refresh,setRefresh]=useState(false)

    var location=useLocation()
    var productData=location?.state?.productData
    

    const fetchAllCategory=async()=>{
        var result=await getData('userinterface/user_display_all_subcategory')
        setCategory(result.data)
    }
    useEffect(()=>{
        fetchAllCategory()
    },[])

    return(<div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>

        <div>
            <Header/>
        </div>
        
        <div style={{marginTop:50, display:'flex', flexDirection:'column',position:'relative', background:'#fff'}}>
            <span style={{display:'flex',background:'#fff'}}>
                <ShowCategory data={category} scid={productData[0]?.subcategoryid} />
            <ProductDetailsCategory refresh={refresh} setRefresh={setRefresh} productData={productData} />
            </span>
        </div>

        <div>
            <Footer />
        </div>
    </div>)
}