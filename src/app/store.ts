import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../feature/cartSlice.ts";
import productsSlice from "../feature/productsSlice.ts";
import themeSlice from "../feature/themeSlice.ts";
import wishlistSlice from "../feature/wishlistSlice.ts";
import resultSlice from "../feature/resultSlice.ts";
import {
  loadStateFromLocalStorage,
  saveStateToLocalStorage,
} from "../utils/useLocalStorage.ts";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    products: productsSlice,
    cart: cartSlice,
    wishlist: wishlistSlice,
    result: resultSlice,
  },
  preloadedState: loadStateFromLocalStorage(),
  devTools: true,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export default store;

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
