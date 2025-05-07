import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { ProductItem } from "../types/product.ts";

export const fetchResults = createAsyncThunk(
  "result/fetchResults",
  async (search: string) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${search}`
    );
    const data = await response.json();
    return data.products as ProductItem[];
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

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      state.error = action.error.message || null;
      state.loading = false;
    });
  },
});

export default resultSlice.reducer;
