export const baseURL = 'https://fakestoreapi.com';

export const endpoints = {
    products: '/products',
    product: (id: string) => `/products/${id}`,
    categories: '/products/categories',
    productByCategory: '/products/category/:category',
}