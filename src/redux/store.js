// Importing necessary functions from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing individual reducers for different parts of the state
import cartReducer from "./cart/cartSlice";          // Reducer to manage cart state
import userReducer from "./user/userSlice";          // Reducer to manage user state
import wishlistReducer from "./cart/wishlistslice";  // Reducer to manage wishlist state
import orderReducer from "./order/orderSlice";      // Reducer to manage order state

// Configuring and creating the Redux store
export const store = configureStore({
  reducer: {
    // The key names here represent the slices of the state, and the value is the reducer
    cart: cartReducer,           // Adds the cartReducer to manage cart-related state
    user: userReducer,           // Adds the userReducer to manage user-related state
    wishlist: wishlistReducer,   // Adds the wishlistReducer to manage wishlist-related state
    orders: orderReducer,        // Adds the orderReducer to manage order-related state
  },
});
