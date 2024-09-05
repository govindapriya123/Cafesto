// import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';
// import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
// import { useLocation } from 'react-router-dom';
// const stripePromise = loadStripe('pk_test_51PewArEQVfGphyeE4gOn4H1i8JS1eI1bjqk7CQMG1MZ3PTOhZLmJWp0tko0MXOkgZfsKYYf9dWNPtHX6jED2VYe200K7eT0Pg3');
// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const location = useLocation();
//     const { cart } = location.state || { cart: [] };
//     const handleSubmit = async (event: { preventDefault: () => void; }) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     // Ensure card element is not null
//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       console.error("Card element is not available");
//       return;
//     }

//     try {
//       // Create payment method using the card element
//       const { error, paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//       });

//       if (error) {
//         console.error(error);
//         return;
//       }
//       // Send paymentMethod.id to your server
//       const response = await axios.post(`http://localhost:8086/api/payment`, {
//         paymentMethodId: paymentMethod.id,
//         amount:parseInt(getTotalPrice()),
//         currency: 'usd',
//         confirm:true
//       });

//       if (response.data.success) {
//         console.log('Payment successful!');
//       } else {
//         console.error('Payment failed:', response.data.error);
//       }
//     } catch (error) {
//       console.error('Error during payment:', error);
//     }
//   };
//   const getTotalPrice = () => {
//     return cart.reduce((total:any, item:any) => {
//         // Ensure item.price and item.quantity are numbers
//         const price = parseFloat(item.price) || 0;
//         const quantity = parseInt(item.quantity, 10) || 0;

//         // Calculate the total
//         return total + (price * quantity);
//     }, 0);
// };

//   return (
//     <Container>
//     <Row>
//       <Col md={6}>
//         <Card  className="mt-4">
//           <Card.Body>
//             <Card.Title>Delivery Address</Card.Title>
//             <Form>
//               <Form.Group controlId="formAddress">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control type="text" placeholder="Enter your address" />
//               </Form.Group>
//               <Form.Group controlId="formCity">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control type="text" placeholder="Enter your city" />
//               </Form.Group>
//               <Form.Group controlId="formCountry">
//                 <Form.Label>Country</Form.Label>
//                 <Form.Control type="text" placeholder="Enter your country" />
//               </Form.Group>
//               <Form.Group controlId="formZip">
//                 <Form.Label>Zip Code</Form.Label>
//                 <Form.Control type="text" placeholder="Enter your zip code" />
//               </Form.Group>
//             </Form>
//           </Card.Body>
//         </Card>
//         <Card className="mt-3">
//           <Card.Body>
//             <Card.Title>Cart Details</Card.Title> 
//             <ul>
//             {cart.map((item:any, index:any) => {
//         const quantity = parseInt(item.quantity) ?? 0; // default to 0 if null or undefined
//         const price =parseFloat(item.price)?? 0; // default to 0 if null or undefined
//         return (
//           <li key={index}>
//             {item.name} - {quantity} * ${price} = ${quantity * price}
//           </li>
//         );
//       })}
//             </ul>
//             <hr />
//             <h5>Total: ${parseInt(getTotalPrice())} </h5> {/* Replace with dynamic total */}
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col md={6}>
//         <Card  className="mt-4" >
//           <Card.Body>
//             <Card.Title>Pay With Card</Card.Title>
//             <Form onSubmit={handleSubmit}>
//               <Form.Group>
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control type="email" placeholder="Enter your email" />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Card Information</Form.Label>
//                 <CardElement />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Name on Card</Form.Label>
//                 <Form.Control type="text" placeholder="Name on card" />
//               </Form.Group>
//               <Form.Group>
//                 <Form.Label>Country</Form.Label>
//                 <Form.Control type="text" placeholder="Enter your country" />
//               </Form.Group>
//               <Button type="submit" disabled={!stripe} style={{marginTop: '5px'}}>Pay</Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   </Container>
//   );
// };

// const PaymentPage = () => (
//   <Elements stripe={stripePromise}>
//     <CheckoutForm />
//   </Elements>
// );

// export default PaymentPage;

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const stripePromise = loadStripe('pk_test_51PewArEQVfGphyeE4gOn4H1i8JS1eI1bjqk7CQMG1MZ3PTOhZLmJWp0tko0MXOkgZfsKYYf9dWNPtHX6jED2VYe200K7eT0Pg3');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();
  const { cart } = location.state || { cart: [] };

  const [orderDetails, setOrderDetails] = useState({
    address: '',
    city: '',
    country: '',
    zip: '',
    email: '',
    nameOnCard: '',
  });

  const handleOrderDetailsChange = (e: { target: { name: string; value: string; }; }) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("Card element is not available");
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: orderDetails.nameOnCard,
          email: orderDetails.email,
          address: {
            line1: orderDetails.address,
            city: orderDetails.city,
            country: orderDetails.country,
            postal_code: orderDetails.zip,
          },
        },
      });

      if (error) {
        console.error(error);
        return;
      }

      const response = await axios.post(`http://localhost:8086/api/payment`, {
        paymentMethodId: paymentMethod.id,
        amount: parseInt(getTotalPrice()),
        currency: 'usd',
        confirm: true,
        orderDetails: {
          address: orderDetails.address,
          city: orderDetails.city,
          country: orderDetails.country,
          zip: orderDetails.zip,
          cart: cart,
          email:orderDetails.email,
        },
      });

      if (response.data.success) {
        console.log('Payment successful!');
      } else {
        console.error('Payment failed:', response.data.error);
      }
    } catch (error) {
      console.error('Error during payment:', error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total: number, item: { price: string; quantity: string; }) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + (price * quantity);
    }, 0).toFixed(2);
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Delivery Address</Card.Title>
              <Form>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    name="address"
                    value={orderDetails.address}
                    onChange={handleOrderDetailsChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    name="city"
                    value={orderDetails.city}
                    onChange={handleOrderDetailsChange}
                  />
                </Form.Group>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    name="country"
                    value={orderDetails.country}
                    onChange={handleOrderDetailsChange}
                  />
                </Form.Group>
                <Form.Group controlId="formZip">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your zip code"
                    name="zip"
                    value={orderDetails.zip}
                    onChange={handleOrderDetailsChange}
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Cart Details</Card.Title>
              <ul>
                {cart.map((item: any, index: any) => {
                  const quantity = parseInt(item.quantity) ?? 0;
                  const price = parseFloat(item.price) ?? 0;
                  return (
                    <li key={index}>
                      {item.name} - {quantity} * ${price} = ${quantity * price}
                    </li>
                  );
                })}
              </ul>
              <hr />
              <h5>Total: ${getTotalPrice()} </h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Pay With Card</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={orderDetails.email}
                    onChange={handleOrderDetailsChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Card Information</Form.Label>
                  <CardElement />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name on card"
                    name="nameOnCard"
                    value={orderDetails.nameOnCard}
                    onChange={handleOrderDetailsChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    name="country"
                    value={orderDetails.country}
                    onChange={handleOrderDetailsChange}
                  />
                </Form.Group>
                <Button type="submit" disabled={!stripe} style={{ marginTop: '5px' }}>Pay</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentPage;
