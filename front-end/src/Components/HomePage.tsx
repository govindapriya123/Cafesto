import Carousel from 'react-bootstrap/Carousel';
import FoodImage from '../Resources/food1.jpg';
import FoodImage1 from '../Resources/food2.jpg';
import Deserts from '../Resources/Cake.jpg';
import Beverages from '../Resources/beverages.jpg';
export const HomePage=()=>{
   return(
    <div>
       <Carousel className="custom-carousel" data-bs-theme="dark">
         <Carousel.Item className="carousel-item">
         <div className="carousel-image-wrapper">
            <img
            className="d-block w-100 carousel-image"
            src={FoodImage}
            alt="pizza"
            style={{width:400,height:700}}
            />
            {/* <h1>Italian Pizza</h1> */}
         </div>
         </Carousel.Item>
         <Carousel.Item>
         <div className="carousel-image-wrapper">
            <img
            className="d-block w-100 carousel-image"
            src={FoodImage1}
            alt="lasgna"
            style={{width:4000,height:700}}
            />
            {/* <h1>Singapore Lasagna</h1> */}
         </div>
         </Carousel.Item>
         <Carousel.Item>
         <div className="carousel-image-wrapper">
            <img
            className="d-block w-100 carousel-image"
            src={Deserts}
            alt="deserts"
            style={{width:400,height:700}}
            />
            {/* <h1>Desserts</h1> */}
         </div>
         </Carousel.Item>
         <Carousel.Item>
         <div className="carousel-image-wrapper">
            <img
            className="d-block w-100 carousel-image"
            src={Beverages}
            alt="beverages"
            style={{width:400,height:700}}
            />
            {/* <h1>Cold Beverages </h1> */}
         </div>
         </Carousel.Item>
       </Carousel>
    </div>
   )
};