import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setCartIsOpen = (isCartOpen) => {
  return createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, isCartOpen);
};

export const setCartItems = (cartItems) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
};

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

export const addCartItem = (cartItems, productToAdd) => {
  const updatedCartItems = addCartItemHelper(cartItems, productToAdd);
  return setCartItems(updatedCartItems);
};

export const removeCartItem = (cartItems, productToRemove) => {
  const updatedCartItems = removeCartItemHelper(cartItems, productToRemove);
  return setCartItems(updatedCartItems);
};

export const removeCartProduct = (cartItems, productToRemove) => {
  const updatedCartItems = removeCartProductHelper(cartItems, productToRemove);
  return setCartItems(updatedCartItems);
};
