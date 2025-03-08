import { createSlice } from "@reduxjs/toolkit";

// Get cart from localStorage or use default
const getInitialState = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart
    ? JSON.parse(savedCart)
    : {
        products: [],
      };
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: getInitialState(),
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
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(state));
    },
    priceTotal: (state) => {
      return state.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      );
    },
  },
});

export const { addProduct, removeProduct, priceTotal } = cartSlice.actions;
export default cartSlice;
