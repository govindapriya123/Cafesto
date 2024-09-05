// src/utils/localStorageUtils.ts

export const getCart = (): any[] => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: any[]): void => {
    localStorage.setItem('cart', JSON.stringify(cart));
};
