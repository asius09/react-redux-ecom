import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../types/product.ts";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [] as ProductItem[],
  },
  reducers: {
    addWishlistProduct: (state, action: PayloadAction<ProductItem>) => {
      state.products.push(action.payload);
    },
    removeWishlistProduct: (state, action: PayloadAction<ProductItem>) => {
      const { id } = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { addWishlistProduct, removeWishlistProduct } =
  WishlistSlice.actions;
export default WishlistSlice.reducer;
