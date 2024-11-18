import { createSlice } from "@reduxjs/toolkit";

// Function to load the length of orders data from localStorage
const loadOrderDataLengthFromLocaStorage = () => {
  try {
    // Attempt to retrieve the saved orders data length from localStorage
    const saveOrderDataLength = localStorage.getItem("ordersDataLength");
    // If found, parse and return it, otherwise return 0
    return saveOrderDataLength ? JSON.parse(saveOrderDataLength) : 0;
  } catch (err) {
    // Log an error if loading from localStorage fails
    console.error("Error loading orderData from localStorage:", err);
    return 0; // Return 0 as a fallback in case of an error
  }
};

// Define the initial state of the slice
const initialState = {
  // Initialize the state with the order data length from localStorage or default to 0
  ordersDataLength: loadOrderDataLengthFromLocaStorage(),
};

// Create a slice of Redux state related to orders
export const orderSlice = createSlice({
  name: "orders", // Name of the slice (used in action types)
  initialState, // Initial state for this slice
  reducers: {
    // Action to update the length of the orders data in both the state and localStorage
    ordersDataLength: (state, action) => {
      // Update the Redux state with the new orders data length
      state.ordersDataLength = action.payload;
      // Also update the value in localStorage to persist it across page reloads
      localStorage.setItem("ordersDataLength", JSON.stringify(action.payload));
    },
  },
});

// Export the action creator for updating the orders data length
export const { ordersDataLength } = orderSlice.actions;

// Export the reducer to be included in the store
export default orderSlice.reducer;
