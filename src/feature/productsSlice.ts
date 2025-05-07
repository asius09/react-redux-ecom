import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductItem } from "../types/product.ts";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=9&skip=0`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data.products as ProductItem[];
    } catch (error: unknown) {
      throw new Error("Failed to fetch products");
    }
  }
);

export const fetchMoreProducts = createAsyncThunk(
  "products/fetchMoreProducts",
  async (_, { getState }) => {
    try {
      const state = getState() as { products: { items: ProductItem[] } };
      const count = state.products.items.length;
      const response = await fetch(
        `https://dummyjson.com/products?limit=9&skip=${count}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data.products as ProductItem[];
    } catch (error: unknown) {
      throw new Error("Failed to fetch more products");
    }
  }
);

interface ProductState {
  items: ProductItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchMoreProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoreProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(...action.payload);
      })
      .addCase(fetchMoreProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch more products";
      });
  },
});

export default productsSlice.reducer;
