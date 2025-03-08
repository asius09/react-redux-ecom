import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 1,
      },
    ],
  },
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
    priceTotal: (state) => {
      state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
  },
});

export const { addProduct, removeProduct, priceTotal } = cartSlice.actions;
export default cartSlice;
