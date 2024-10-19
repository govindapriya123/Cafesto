// src/utils/localStorageUtils.ts

import { useEffect, useState } from "react";

export const getCart = (): any[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: any[]): void => {
    localStorage.setItem('cart', JSON.stringify(cart));
};


export const filterData =
    (props: any) => {
      const { query, data } = props;
      if (!data || !Array.isArray(data)) return data; // Check if data is an array
      if (!query || typeof query !== 'string') return data; // Ensure query is a valid string

      const searchTerms = query?.toLowerCase()?.split(" ");
  
      const results = data.filter((item:any) =>
        searchTerms.every((term:any) =>
          item?.title?.toLowerCase()?.includes(term) ||
          item?.description?.toLowerCase()?.includes(term) 
        )
      );
  
      return results;
    };


    // Custom hook for debouncing
    export const useDebounce = (value:any, delay:any) => {
      const [debouncedValue, setDebouncedValue] = useState(value);
    
      useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
    
        // Cleanup function to clear timeout if value changes before delay
        return () => {
          clearTimeout(handler);
        };
      }, [value, delay]);
    
      return debouncedValue;
    };
    