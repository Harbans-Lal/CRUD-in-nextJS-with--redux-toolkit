import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../productSlice/productSlice';
import postsReducer from '../postsSlice/postsSlice'

 const store = configureStore({
  reducer: {
    products: productsReducer,
    postReducer:postsReducer
  }
});
export default store;