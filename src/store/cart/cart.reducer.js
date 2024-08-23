import { createSlice } from "@reduxjs/toolkit";

const addCartItemHelper = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (item) => item.id === productToAdd.id,
  );

  if (existingCartItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItemHelper = (cartItems, productToRemove) => {
  return cartItems
    .map((item) =>
      item.id === productToRemove.id && item.quantity
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    .filter((item) => item.quantity);
};

const removeCartProductHelper = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

const INITIAL_STATE = {
  cartIsOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setCartIsOpen(state, action) {
      state.cartIsOpen = action.payload;
    },
    addCartItem(state, action) {
      state.cartItems = addCartItemHelper(state.cartItems, action.payload);
    },
    removeCartItem(state, action) {
      state.cartItems = removeCartItemHelper(state.cartItems, action.payload);
    },
    removeCartProduct(state, action) {
      state.cartItems = removeCartProductHelper(
        state.cartItems,
        action.payload,
      );
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { setCartIsOpen, addCartItem, removeCartItem, removeCartProduct } =
  cartSlice.actions;
