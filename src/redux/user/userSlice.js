import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Function to set userId to cookie
const setUserIdToCookie = (userId) => {
  if (userId) {
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // Set expiration to 7 days from now
    Cookies.set("user_info", JSON.stringify(userId), {
      expires: expires,
      secure: process.env.NODE_ENV === "production", // Only set 'secure: true' in production when true https when false http
      sameSite: "Strict",
    });
  }
};

// Function to get userId from cookie
const getUserIdFromCookie = () => {
  const userInfo = Cookies.get("user_info");
  return userInfo ? JSON.parse(userInfo) : null; // return userId or null if not found
};

// Initial state structure
const initialState = {
  userId: getUserIdFromCookie(),
};

// Create slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload; // Set userId in the state
      setUserIdToCookie(action.payload); // Also update the cookie
    },
    clearUserId: (state, action) => {
      Cookies.remove("user_info"); // Remove user info from cookies
      Cookies.remove("user_session");
      state.userId = null; // Clear the userId from the state
    },
  },
});

export const { setUserId, clearUserId } = userSlice.actions;

export default userSlice.reducer;
