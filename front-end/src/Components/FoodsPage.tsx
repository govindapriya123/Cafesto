import { useProductsQuery } from "./Request/ProductsQuery";
import { Row, Col } from 'react-bootstrap';
import ProductCard from "./Common/ProductCard";
import { useSearchParams} from 'react-router-dom';
export const FoodsPage=()=>{
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');
  const result=useProductsQuery();
  const { data, isLoading, isError, error } = result;
  let filteredProducts=data;

    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error: {error.message}</div>;
      }
    return(
      <div>
       <Row>
         {filteredProducts.map((product: any) => (
        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Col>
      ))}

       </Row>
       </div>
    )

};