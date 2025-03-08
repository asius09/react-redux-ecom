import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    // Try to get products from localStorage first
    const storedProducts = localStorage.getItem("products");

    if (storedProducts) {
      return JSON.parse(storedProducts);
    }

    // If not in localStorage, fetch from API
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    const products = data.products.map((product) => ({
      ...product,
      isAddedToCart: false,
      key: nanoid(),
    }));

    // Save to localStorage for future use
    localStorage.setItem("products", JSON.stringify(products));

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
  reducers: {
    loadMore: (state, action) => {
      const newItems = action.payload.map((item) => ({
        ...item,
        key: nanoid(),
      }));

      state.items.push(...newItems);

      // Update localStorage with new items
      localStorage.setItem("products", JSON.stringify(state.items));
    },
  },
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
  },
});

export const { loadMore } = productsSlice.actions;
export default productsSlice;
