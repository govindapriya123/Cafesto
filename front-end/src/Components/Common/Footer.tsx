
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'
export const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      <Container className='foot'>
        <Row>
          <Col md="4">
            <h5>About Us</h5>
            <p>
              We are a company dedicated to providing the best service.
            </p>
          </Col>
          <Col md="4">
            <h5>Contact Us</h5>
            <p>
              Email: caferio@company.com
            </p>
            <p>
              Phone: +123 456 7890
            </p>
          </Col>
          <Col md="4">
            <h5>Follow Us</h5>
            <a href="https://facebook.com" className="text-white">Facebook</a><br />
            <a href="https://twitter.com" className="text-white">Twitter</a><br />
            <a href="https://instagram.com" className="text-white">Instagram</a>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <p className="mb-0">© 2024 Your Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
