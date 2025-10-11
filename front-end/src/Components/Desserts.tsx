import { Col, Row } from "react-bootstrap";
import ProductCard from "./Common/ProductCard";
import { fetchProducts } from "./Request/CategoryProductsQuery";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { filterData, useDebounce } from "../Utils/Utils";

export const Desserts = ({ searchQuery }: any) => {
  const [searchParams] = useSearchParams();
  const nameFromURL = searchParams.get("name");
  const combinedSearchQuery = searchQuery || nameFromURL;

  // State for fetched products and filtered products
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  // Debounce the search query to avoid rapid filtering
  const debouncedSearchQuery = useDebounce(combinedSearchQuery, 500);

  // Fetch product data (Separate useEffect for fetching)
  useEffect(() => {
    fetchProducts(1)
      .then((result) => {
        setProducts(result); // Store fetched products in separate state
        setFilteredProducts(result); // Initially set filtered products to all fetched products
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  // Apply filtering logic based on debounced search query (Separate useEffect for filtering)
  useEffect(() => {
    if (products && debouncedSearchQuery) {
      const results = filterData({ query: debouncedSearchQuery, data: products });
      setFilteredProducts(results);
    } else {
      setFilteredProducts(products); // Reset to all products if no search query
    }
  }, [debouncedSearchQuery, products]);

  return (
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
  );
};
