import { useProductsQuery } from "./Request/ProductsQuery";
import { Row, Col } from 'react-bootstrap';
import ProductCard from "./Common/ProductCard";
import { useSearchParams} from 'react-router-dom';
import { useEffect, useImperativeHandle, useState } from "react";
import { filterData, useDebounce } from "../Utils/Utils";
export const FoodsPage=({searchQuery}:any)=>{
  const [searchParams] = useSearchParams();
  const nameFromURL= searchParams.get('name');
  console.log('--name--',nameFromURL);
  const result=useProductsQuery();
  const { data, isLoading, isError, error } = result;
  const combinedSearchQuery = searchQuery || nameFromURL;

  const [filteredProducts, setFilteredProducts] = useState(data);
  
  const debouncedSearchQuery = useDebounce(combinedSearchQuery, 500);
  useEffect(() => {
    if (data && debouncedSearchQuery) {
      console.log('--data--');
      const results = filterData({ query: debouncedSearchQuery, data });
      console.log('--results--', results);
      setFilteredProducts(results);
    } else {
      console.log('----');
      setFilteredProducts(data || []); // Set to empty array if data is not yet loaded
    }
  }, [data, debouncedSearchQuery]);

  if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (isError) {
        return <div>Error: {error.message}</div>;
      }
    return(
      <div>
       <Row>
       {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product: any) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <div>No results found</div>  
        )}
       </Row>
       </div>
    )

};