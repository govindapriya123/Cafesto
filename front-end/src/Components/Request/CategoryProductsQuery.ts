
import { fetcher } from './fetch';

export const fetchProducts = async (category_id: any) => {
    console.log('--fetchProducts called with category_id--', category_id);
    try {
      const response = await fetcher(`http://localhost:8086/products/${category_id}`, 'GET');
      return response;
    } catch (error) {
      console.error('--fetchProducts error--', error);
      throw new Error('Failed to fetch products');
    }
  };
  


