import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit
import Cookies from "js-cookie"; // Importing js-cookie to handle cookies

// Function to set userId to cookie
const setUserIdToCookie = (userId) => {
  if (userId) {
    const expires = new Date(); // Create a new Date object to set expiration
    expires.setDate(expires.getDate() + 7); // Set expiration date to 7 days from today
    // Set the cookie with the userId, expiration, secure flag, and sameSite policy
    Cookies.set("user_info", JSON.stringify(userId), {
      expires: expires,
      secure: process.env.NODE_ENV === "production", // Set 'secure' to true only in production (HTTPS)
      sameSite: "Strict", // Prevent CSRF by setting SameSite to Strict
    });
  }
};

// Function to get userId from cookie
const getUserIdFromCookie = () => {
  const userInfo = Cookies.get("user_info"); // Try to get the "user_info" cookie
  return userInfo ? JSON.parse(userInfo) : null; // If cookie exists, parse and return userId, else return null
};

// Initial state structure
const initialState = {
  userId: getUserIdFromCookie(), // Initialize state with userId from the cookie (if exists)
};

// Create slice using Redux Toolkit's createSlice
export const userSlice = createSlice({
  name: "user", // The name of the slice (used in the Redux store)
  initialState, // The initial state of the user slice, which includes the userId from the cookie
  reducers: {
    // Reducer to set the userId in the Redux state and in the cookie
    setUserId: (state, action) => {
      state.userId = action.payload; // Set the userId in Redux state
      setUserIdToCookie(action.payload); // Also update the cookie with the new userId
    },
    // Reducer to clear the userId from the Redux state and remove the cookie
    clearUserId: (state) => {
      Cookies.remove("user_info"); // Remove the "user_info" cookie
      Cookies.remove("user_session"); // Optionally remove a session cookie (if exists)
      state.userId = null; // Clear the userId from the Redux state
    },
  },
});

// Export actions for use in components (e.g., dispatch setUserId, clearUserId)
export const { setUserId, clearUserId } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
