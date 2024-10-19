import { useState, useEffect } from 'react';
import { Button, Table, Card } from 'react-bootstrap';
import { getCart, saveCart } from '../Utils/Utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useState<any[]>([]);
    //const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCart(getCart());
    }, []);

    const removeFromCart = (productId: number) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        setCart(updatedCart);
        saveCart(updatedCart);
    };

    const updateQuantity = (productId: number, quantity: number) => {
        const updatedCart = cart.map(item =>
            item.productId === productId ? { ...item, quantity } : item
        );
        setCart(updatedCart);
        saveCart(updatedCart);
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => {
            // Ensure item.price and item.quantity are numbers
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
    
            // Calculate the total
            return total + (price * quantity);
        }, 0);
    };
    
    const handleCheckout = () => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('payment page');
            navigate('/payments',{ state: { cart } });
        } else {
            toast.error("Please Login to checkout", { position: 'top-right' });
            navigate('/login');
        }
    };

    return (
        <>
            <div className="cart-container">
                <h2 className="text-center">Shopping Cart</h2>
                <Table striped bordered hover className="cart-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(product => (
                            <tr key={product.productId}>
                                <td>
                                    <Card.Img variant="top" src={`http://localhost:8086/${product.imageUrl}`} width="100" height="100" />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Button variant="secondary" onClick={() => updateQuantity(product.productId, product.quantity - 1)} disabled={product.quantity <= 1}>-</Button>
                                        <span style={{ margin: '0 10px' }}>{product.quantity}</span>
                                        <Button variant="secondary" onClick={() => updateQuantity(product.productId, product.quantity + 1)}>+</Button>
                                    </div>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => removeFromCart(product.productId)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <h3>Total: ${parseInt(getTotalPrice())}</h3>
                <Button variant="primary" onClick={handleCheckout}>Proceed to Checkout</Button>
            </div>
            <ToastContainer />
        </>
    );
};

export default CartPage;
