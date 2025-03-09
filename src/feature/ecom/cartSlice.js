import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity || 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
    subTotal: (state) => {
      return state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
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

export const { addProduct, removeProduct, subTotal, updateQuantity } =
  cartSlice.actions;
export default cartSlice;
