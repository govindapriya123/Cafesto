import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "./Common/ProductCard";
import { fetchProducts } from "./Request/CategoryProductsQuery";
import { useEffect, useState } from "react";

export const Desserts=()=>{

     const [data,setData]=useState<any>();
useEffect(()=>{
fetchProducts(1)
.then((result) => {
    setData(result);
  
})
.catch((error) => {
  console.error('Error fetching products:', error);
});
console.log('--data--',data);
},[])

    return(
        <Container>
        <Row>
        {data?.map((product: any) => (
       <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
         <ProductCard product={product} />
       </Col>
     ))}

      </Row>
      </Container>

    )

};