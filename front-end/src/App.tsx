import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/foods' element={<FoodsPage />} />
        <Route path='/desserts' element={<Desserts />} />
        <Route path='/beverages' element={<Beverages />} /> 
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
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
