import {Navbar,Nav,Form,FormControl, Button,Container} from 'react-bootstrap';
import {AiOutlineUser} from "react-icons/ai";
import './Navbar.css';
import { FaShoppingCart } from 'react-icons/fa';
import './CartIcon.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCart } from '../../Utils/Utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {jwtDecode} from 'jwt-decode';
export const Header=({searchChange}:any)=>{
  const navigate =  useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token"); 
  let cart=getCart();
  const [name, setName] = useState('');
  useEffect(() => {
    // Check if authentication token exists in localStorage or sessionStorage
   // You can change this based on your token storage method
    if (token) {
      const isTokenExpired = checkTokenExpiration(token);
      if(isTokenExpired){
        handleTokenExpiration();
      }else{
      setIsLoggedIn(true);
      }
    }else{
      setIsLoggedIn(false);
    }
  }, [token]);

  const checkTokenExpiration = (token: string) => {
    // Example: Decode token and check expiration time
    // Replace this with your actual token decoding logic
    try {
      const decodedToken = jwtDecode(token);
      console.log('--decodedToken--',decodedToken);
      if (decodedToken.exp === undefined) {
        console.error("Token does not contain an expiration time.");
        return false;
      }
      const expirationTime = decodedToken?.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      return currentTime > expirationTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // Treat decoding errors as expired token
    }
  };

  const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const currentPath = location.pathname;
    if(currentPath==='/foods'||currentPath==='/desserts'||currentPath==='/beverages'){
      const searchParams = new URLSearchParams();
      searchParams.set('name', name);
      navigate(`${currentPath}?${searchParams.toString()}`);

    }else {
       navigate(`/foods?name=${name}`);
    }
    // Example: You can log the current path or perform specific actions based on it
    console.log('Current Path:', currentPath);
    //navigate(`/foods?name=${name}`);
   
};

const handleSearchChange = (e:any) => {
  const query = e.target.value;
  if(searchChange){
  searchChange(query);
  }
  setName(query);
};
  const handleTokenExpiration = () => {
    // Handle token expiration actions
    localStorage.removeItem('token');
    localStorage.removeItem('cart');
    setIsLoggedIn(false);
    alert('Your session has expired. Please log in again.');
  };


  const navigateToShoppingCart = () => {
    navigate('/cart'); // Replace '/cart' with your desired route
  };
  const handleLogout=()=>{
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

    return(
    <><Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/">Cafesto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='w-100'>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/foods">Food</Nav.Link>
              <Nav.Link href="/desserts">Desserts</Nav.Link>
              <Nav.Link href="/beverages">Beverages</Nav.Link>
            </Nav>
            <Form onSubmit={handleSearch} style={{padding:10}}>
              <FormControl type="text" placeholder="Search" className="mr-sm-2"   value={name}
                        onChange={handleSearchChange}/>
            </Form>
           {!isLoggedIn? <Button onClick={() => {navigate('/login') } }><AiOutlineUser  size={20} /></Button>:<Button  onClick={handleLogout}> <FontAwesomeIcon  icon={faSignOutAlt} /></Button>}
            <div className="cart-icon-container" style={{padding:10}}>
            <FaShoppingCart size={24} color='blue' onClick={navigateToShoppingCart}/>
            {cart.length>0&& <span className="cart-badge">{cart.length}</span>}
        </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    )
};