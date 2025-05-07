import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../types/cart.ts";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  products: [] as CartItem[],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      const { id, quantity = 1 } = action.payload;
      const existingProduct = state.products.find(
        (product) => product.id === id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.products.push({ ...action.payload, quantity });
      }
    },
    removeProduct: (state, action: PayloadAction<CartItem>) => {
      const { id } = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
    updateQuantity: (
      state,
      action: PayloadAction<CartItem & { update: "add" | "subtract" }>
    ) => {
      const { id, update, quantity = 1 } = action.payload;
      const product = state.products.find((product) => product.id === id);
      if (product) {
        if (update === "add") {
          product.quantity += Number(quantity);
        } else if (update === "subtract") {
          product.quantity = Math.max(1, product.quantity - Number(quantity));
        }
      }
    },
  },
});

export const { addProduct, removeProduct, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
