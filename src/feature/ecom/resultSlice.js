import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchResults = createAsyncThunk(
  "result/fetchResults",
  async (search) => {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${search}`
    );
    const data = await response.json();
    const products = data.products.map((product) => ({
      ...product,
      key: nanoid(),
    }));
    return products;
  }
);

const resultSlice = createSlice({
  name: "result",
  initialState: {
    items: [],
    error: null,
    Loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResults.pending, (state) => {
      state.Loading = true;
      state.error = null;
    });
    builder.addCase(fetchResults.fulfilled, (state, action) => {
      state.items = action.payload;
      state.Loading = false;
    });
    builder.addCase(fetchResults.rejected, (state, action) => {
      state.error = action.error.message;
      state.Loading = false;
    });
  },
});

export default resultSlice;
