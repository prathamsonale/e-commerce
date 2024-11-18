import { createSlice } from "@reduxjs/toolkit";

//Function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cartData");
  return cartData ? JSON.parse(cartData) : { cartProducts: [] };
};

//Function to save cart to localStorage
const saveCartToLocalStorage = (cartProducts, finalAmount) => {
  const cartData = { cartProducts };
  localStorage.setItem("cartData", JSON.stringify(cartData)); //Make sure to convert object to string
};

// State
const initialState = loadCartFromLocalStorage();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Function to add product to cart
    addProduct: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.id === action.payload.id
      );
      product
        ? (product.quantity += 1)
        : state.cartProducts.push(action.payload);
      saveCartToLocalStorage(state.cartProducts);
    },

    // Function to increment product quantity
    increment: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.quantity += 1;
      }
      saveCartToLocalStorage(state.cartProducts);
    },

    // Function to decrement product quantity
    decrement: (state, action) => {
      const product = state.cartProducts.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      saveCartToLocalStorage(state.cartProducts);
    },

    // Function to remove product from cart
    removeProduct: (state, action) => {
      const productIndex = state.cartProducts.findIndex(
        (product) => product.id === action.payload
      );
      if (productIndex !== -1) {
        state.cartProducts.splice(productIndex, 1);
      }
      saveCartToLocalStorage(state.cartProducts);
    },
    clearCartProducts: (state) => {
      state.cartProducts = [];
      state.finalAmount = 0;
    },
  },
});

export const {
  addProduct,
  increment,
  decrement,
  removeProduct,
  clearCartProducts,
} = cartSlice.actions;

export default cartSlice.reducer;
