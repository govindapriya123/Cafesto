import { useCustomQuery } from './fetch';
import { fetcher } from './fetch';

const fetchProducts = async () => {
  return fetcher('http://localhost:8086/products/product/fetchAll', 'GET');
};

export const useProductsQuery = () => {
  return useCustomQuery<any, Error>({
    queryKey: ['products'],
    queryFn: fetchProducts,
    select: (data: any) => {
      console.log('--data--', data);
      return data;
    }
  });
};
