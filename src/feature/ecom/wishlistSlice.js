import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
  },
  reducers: {
    addWishlistProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeWishlistProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addWishlistProduct, removeWishlistProduct } = WishlistSlice.actions;
export default WishlistSlice;
