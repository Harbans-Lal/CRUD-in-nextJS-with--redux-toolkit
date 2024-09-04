import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
}

interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

interface EditProduct {
  price: number,
  title: string,
  description: string,
}


// Async thunk for fetching products
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    return data.products; 
  }
);

// Async thunk for deleting a product
export const deleteProduct = createAsyncThunk<number, number>(
  'products/deleteProduct',
  async (id) => {
    await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    });
    return id; 
  }
);


export const addProduct = createAsyncThunk<Product, Product>(
  'products/addProduct',
  async (product) => {
    const response = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    const data = await response.json();
    return data;
  }
);


export const updateProduct = createAsyncThunk<Product, { id: number; updates: EditProduct }>(
  'products/updateProduct',
  async ({ id, updates }) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await response.json();
    return data;
  }
);


// Slice for products
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [] as Product[],
    status: 'idle',
    error: null
  } as ProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload);
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      });
  }
});

export default productsSlice.reducer;
