import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, ThemeSlice, productsSlice } from "../feature";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    theme: ThemeSlice.reducer,
    products: productsSlice.reducer,
  },
  devTools: true,
});

export default store;
