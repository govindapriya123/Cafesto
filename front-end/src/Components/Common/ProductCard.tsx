// src/components/ProductCard.js
import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { getCart, saveCart } from '../../Utils/Utils';

export const ProductCard = ( product:any ) => {
    const data=product;
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
      setQuantity(prevQuantity => prevQuantity + 1);
  };
  const decreaseQuantity = () => {
      if (quantity > 1) {
          setQuantity(prevQuantity => prevQuantity - 1);
      }
  };

  const addToCart = () => {
    let cart = getCart();
    const product = data.product; // Ensure that product is accessed correctly
    const existingProduct = cart.find((item) => item.productId === product.productId);
    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCart(cart);
};


    if (!product) return null;
    const localUri=`http://localhost:8086/${data.product.imageUrl}`;
  return (
    <Card style={{ width: '18rem', margin: '20px' }}>
      <Card.Img variant="top" src={localUri} width="250" height="250" loading='lazy' alt={data.product.name} />
      <Card.Body>
        <Card.Title>{data.product.name}</Card.Title>
        <Card.Text>{data.product.description}</Card.Text>
        <Card.Text>Price: ${data.product.price}</Card.Text>
        <Card.Text>Rating: {data.product.rating}</Card.Text>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <Button variant="secondary" onClick={decreaseQuantity} disabled={quantity <= 1}>-</Button>
                    <span style={{ margin: '0 10px' }}>{quantity}</span>
                    <Button variant="secondary" onClick={increaseQuantity}>+</Button>
                </div>
        <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
