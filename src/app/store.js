import { configureStore } from "@reduxjs/toolkit";
import { cartSlice, ThemeSlice, productsSlice, resultSlice, WishlistSlice } from "../feature";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../utils/useLocalStorage";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    theme: ThemeSlice.reducer,
    products: productsSlice.reducer,
    result: resultSlice.reducer,
    wishlist: WishlistSlice.reducer,
  },
  preloadedState: loadStateFromLocalStorage(),
  devTools: true,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;
