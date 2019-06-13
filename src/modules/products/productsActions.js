import { createAsyncActions } from '@letapp/redux-actions';

export const fetchLatest = createAsyncActions('products/FETCH_LATEST');
export const addProduct = createAsyncActions('products/ADD_PRODUCT');
export const fetchProduct = createAsyncActions('products/FETCH_PRODUCT');
export const fetchSeller = createAsyncActions('products/FETCH_SELLER');
export const fetchSellerProducts = createAsyncActions(
  'products/FETCH_SELLER_PRODUCTS',
);
export const saveProduct = createAsyncActions('products/SAVE_PRODUCT');
export const removeFromSaved = createAsyncActions('products/REMOVE_FROM_SAVED');
export const fetchSaved = createAsyncActions('products/FETCH_SAVED');
