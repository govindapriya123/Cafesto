import { Col,  Row } from "react-bootstrap";
import { fetchProducts } from "./Request/CategoryProductsQuery";
import ProductCard from "./Common/ProductCard";
import { useEffect, useState } from "react";
export const Beverages=()=>{
    const [data, setData] = useState([]);

    useEffect(() => {
      // Simulating fetching products, replace with actual fetch logic
      const fetchData = async () => {
        try {
          const result = await fetchProducts(13); // Replace with your category_id
          setData(result);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchData();
    }, []);

    return(
        <Row>
        {data?.map((product: any) => (
       <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
         <ProductCard product={product} />
       </Col>
     ))}

      </Row>

    )

};