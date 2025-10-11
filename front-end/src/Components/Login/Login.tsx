import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { auth, googleProvider, facebookProvider } from '../../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';  // Update CSS file if needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLoginQuery } from '../Request/LoginQuery';
import { useNavigate } from 'react-router-dom';

// Define the types for credentials and success data
interface Credentials {
  email: string;
  password: string;
}

interface OnSuccessData {
  status: any;
  token: string;
  messageIfAny: string | number | boolean | React.ReactNode | null;
}

// LoginPage component definition
const LoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' });
  const navigate = useNavigate();

  const loginData = useLoginQuery(
    (data: OnSuccessData) => {
      console.log('--data received from API--', data); // Log the entire response
      if (data && data.token) {
        localStorage.setItem('token', data.token);
        toast.success(data.messageIfAny as string, { position: 'top-right' });
        setTimeout(() => {
          navigate('/');
      }, 1000);
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    },
    (error: any) => {
      console.error('Login error:', error); // Log the error response
      toast.error('Login failed. Please check your credentials.');
    }
  );
  

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loginData && loginData.mutate) {
      console.log('Attempting to login with credentials:', credentials);
      loginData.mutate(credentials);
    } else {
      console.error('loginData or loginData.mutate is not defined');
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log('Google sign-in successful:', result);
        toast.success('Login successful!');
        navigate('/')
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  };

  // Handle Facebook sign-in
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        console.log('Facebook sign-in successful:', result);
        toast.success('Login successful!');
        navigate('/')
      })
      .catch((error) => {
        console.error('Facebook sign-in error:', error);
      });
  };

  return (
    <Container className="login-page d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="mb-4">Login</h1>
          <Form onSubmit={handleSignIn} className="w-100">
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between mb-3">
              <Button variant="link">Forgot password?</Button>
            </div>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
          </Form>

          <hr className="w-100" />

          <div className="d-flex flex-column align-items-center w-100">
            <h5 className="mb-3">or continue with</h5>
            <Button
              variant="danger"
              onClick={handleGoogleSignIn}
              className="w-100 mb-3 d-flex align-items-center justify-content-center"
            >
              <i className="fab fa-google me-2"></i> Login with Google
            </Button>
            <Button
              variant="primary"
              onClick={handleFacebookSignIn}
              className="w-100 mb-3 d-flex align-items-center justify-content-center"
            >
              <i className="fab fa-facebook-f me-2"></i> Login with Facebook
            </Button>
          </div>

          <div className="d-flex align-items-center mt-3">
            <span>Don't have an account?</span> <Button variant="link" onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default LoginPage;
