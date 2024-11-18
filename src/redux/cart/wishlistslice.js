import { createSlice } from "@reduxjs/toolkit";

// Function to load the wishlist from localStorage, if available
const loadWishlistFromLocalStorage = () => {
  try {
    // Attempt to retrieve the wishlist data from localStorage
    const savedWishlist = localStorage.getItem("wishlist");

    // If the wishlist exists in localStorage, parse it as JSON and return it
    // If not, return an empty array
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    // If there's an error (e.g., invalid JSON), log the error and return an empty array
    console.error("Error loading wishlist from localStorage:", error);
    return [];
  }
};

// Initial state of the wishlist, which is loaded from localStorage if available
const initialState = {
  items: loadWishlistFromLocalStorage(),
};

// Create a slice of state for managing the wishlist
const wishlistSlice = createSlice({
  name: "wishlist", // Name of the slice
  initialState, // Initial state for the wishlist
  reducers: {
    // Action to add an item to the wishlist
    addToWishlist: (state, action) => {
      // Check if the item is already in the wishlist before adding it
      if (!state.items.includes(action.payload)) {
        // If the item isn't already in the wishlist, add it
        state.items.push(action.payload);
      }

      // Save the updated wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    // Action to remove an item from the wishlist
    removeFromWishlist: (state, action) => {
      // Filter out the item by its ID (action.payload)
      state.items = state.items.filter((id) => id !== action.payload);

      // Save the updated wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },

    // Action to clear all items from the wishlist
    clearWishlist: (state) => {
      // Reset the items array to an empty array
      state.items = [];

      // Save the empty wishlist to localStorage
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

// Export the actions to be used elsewhere in the app
export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

// Export the reducer to be added to the Redux store
export default wishlistSlice.reducer;
