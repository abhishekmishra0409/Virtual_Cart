import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/User/UserSlice.js";
import productReducer from "../features/Product/ProductSlice.js";
import blogReducer from "../features/Blog/BlogSlice.js";
import contactReducer from "../features/Contact/ContactSlice";
import cartReducer from "../features/cart/CartSlice.js";
import authMiddleware from "../Middleware/authMiddleware.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    blogs: blogReducer,
    contact: contactReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});

export default store;
