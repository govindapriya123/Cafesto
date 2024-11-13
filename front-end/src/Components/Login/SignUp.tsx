import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSignupQuery } from '../Request/SignUpQuery';
import './SignupPage.css';  // Update CSS file if needed
import { useNavigate } from 'react-router-dom';
const SignupPage: React.FC = () => {
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [validated, setValidated] = useState(false);
  const navigate=useNavigate();
  const onSuccess = (data: any) => {
    console.log('--data--', data);

    // Check for successful creation
    if (data?.statusCode === "CREATED") {
        toast.success("Signup successful! Welcome!", { position: 'top-right' });
        // You may want to redirect the user or perform additional actions here
        // For example, redirect to a login page or home page
        setTimeout(() => {
          navigate('/login');
      }, 1000);
    } else {
        console.log('--messageIfAny--', data.messageIfAny);
        toast.error(data.messageIfAny || "Signup failed. Please try again.", { position: 'top-right' });
    }
}
const onError = (error: any) => {
  console.log('--error--', error);

  // Check if the error is an instance of Response to get server error messages
  if (error instanceof Response) {
      error.json().then(errData => {
          // Check if the server provided a specific error message
          if (errData?.message) {
              toast.error(errData.message, { position: 'top-right' });
          } else {
              toast.error('Signup failed. Please try again.', { position: 'top-right' });
          }
      }).catch(() => {
          // If the JSON parsing fails, fall back to a generic error message
          toast.error('Signup failed. Please try again.', { position: 'top-right' });
      });
  } else {
      // Handle generic errors
      toast.error('Signup failed. Please check your credentials.', { position: 'top-right' });
  }
};


  const SignupData = useSignupQuery(onSuccess, onError);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSignUp = async (e: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords do not match", { position: 'top-right' });
    } else {
      SignupData.mutate(signupData);
    }
  };

  return (
    <Container className="signup-page d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100">
        <Col md={6} className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="mb-4">Sign Up</h1>
          <Form noValidate validated={validated} onSubmit={handleSignUp} className="w-100">
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                required
                autoComplete="email"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please confirm your password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default SignupPage;
