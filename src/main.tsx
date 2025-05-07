import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import App from "./App.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import { store } from "./app/store";
import { Provider } from "react-redux";

import {
  Home,
  Cart,
  Products,
  Result,
  ProductDetails,
  Dashboard,
  Wishlist,
} from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/cart/:userId" element={<Cart />} />
      <Route path="/result/:search" element={<Result />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
