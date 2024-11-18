import { createSlice } from "@reduxjs/toolkit";

const loadOrderDataLengthFromLocaStorage = () => {
  try {
    const saveOrderDataLength = localStorage.getItem("ordersDataLength");
    return saveOrderDataLength ? JSON.parse(saveOrderDataLength) : 0;
  } catch (err) {
    console.error("Error loading orderData from localStorage:", err);
    return 0;
  }
};

const initialState = {
  ordersDataLength: loadOrderDataLengthFromLocaStorage(),
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    ordersDataLength: (state, action) => {
      // Update both the state and localStorage
      state.ordersDataLength = action.payload;
      localStorage.setItem("ordersDataLength", JSON.stringify(action.payload));
    },
  },
});

export const { ordersDataLength } = orderSlice.actions;

export default orderSlice.reducer;
