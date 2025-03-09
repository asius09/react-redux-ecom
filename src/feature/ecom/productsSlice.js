import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=9&skip=0`
    );
    const data = await response.json();
    const products = data.products.map((product) => ({
      ...product,
      key: nanoid(),
    }));

    return products;
  }
);

export const fetchMoreProducts = createAsyncThunk(
  "products/fetchMoreProducts",
  async (_, { getState }) => {
    const { items } = getState().products;
    const count = items.length;

    const response = await fetch(
      `https://dummyjson.com/products?limit=9&skip=${count}`
    );
    const data = await response.json();

    const products = data.products.map((product) => ({
      ...product,
      key: nanoid(),
    }));

    return products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchMoreProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMoreProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items.push(...action.payload);
    });
    builder.addCase(fetchMoreProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default productsSlice;
