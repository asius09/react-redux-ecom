import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../feature/ecom/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
