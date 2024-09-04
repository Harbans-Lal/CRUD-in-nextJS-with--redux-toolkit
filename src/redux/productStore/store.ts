import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../productSlice/productSlice';

 const store = configureStore({
  reducer: {
    products: productsReducer
  }
});
export default store;