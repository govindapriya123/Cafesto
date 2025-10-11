import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { HomePage } from "./Components/HomePage";
import { FoodsPage } from "./Components/FoodsPage";
import { Beverages } from "./Components/Beverages";
import { Desserts } from "./Components/Desserts";
import {  Header } from "./Components/Common";
import CartPage from "./Components/CartPage";
import PaymentPage from "./Components/PaymentPage";
import LoginPage from "./Components/Login/Login";
import SignupPage from "./Components/Login/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useRef, useState } from "react";
import AdminPage from "./Components/Pages/AdminPage";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSearchChange = (query:any) => {
    setSearchQuery(query);
    if (query) {
      // Navigate to the foods page with the search query as a URL parameter
      navigate(`/foods?name=${query}`);
    } // Update the search query state
  };
  return (
    <>
      <Header searchChange={handleSearchChange}/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path='/foods' element={<FoodsPage searchQuery={searchQuery} />} />
        <Route path='/desserts' element={<Desserts searchQuery={searchQuery} />} />
        <Route path='/beverages' element={<Beverages  searchQuery={searchQuery}/>} /> 
        <Route path='/cart' element={<CartPage />} />
        <Route path='/payments' element={<PaymentPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
