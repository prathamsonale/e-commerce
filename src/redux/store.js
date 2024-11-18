import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import userReducer from "./user/userSlice";
import wishlistReducer from "./cart/wishlistslice";
import orderReducer from "./order/orderSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    orders: orderReducer,
  },
});
