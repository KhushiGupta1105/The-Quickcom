
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AdminLogin from "./components/admin/adminlogin/AdminLogin";

import Dashboard from "./components/admin/adminlogin/Dashboard";
import HomePage from "./components/userinterface/homepage/HomePage";
import PageCategoryDisplay from "./components/userinterface/pagedisplay/PageCategoryDisplay"
import ProductDetailPage from "./components/userinterface/productdetailspage/ProductDetailPage"




function App() {
  return (
    <div>
      <Router>
        <Routes>
         
         <Route element={<AdminLogin/>} path="/adminlogin"></Route>
         <Route element={<Dashboard/>} path="/dashboard/*"></Route>
         <Route element={<HomePage/>} path="/homepage"></Route>
         <Route element={<PageCategoryDisplay/>} path="/pagecategorydisplay"></Route>
         <Route element={<ProductDetailPage/>}path="/productdetailpage"></Route>
         
        </Routes>
      </Router>

   
   </div>
  );
}

export default App;
