import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [
      {
        name: "Product 1",
        price: 100,
        stock: 10,
        category: "Category 1",
      },
    ],
  },
  reducers: {
    loadMore: (state, action) => {
      state.products.push(...action.payload);
    },
  },
});

export const { loadMore } = productsSlice.actions;
export default productsSlice.reducer;
