import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  cartIsOpen: false,
  setCartIsOpen: () => null,
  cartItems: [],
  addCartItem: () => null,
  removeCartItem: () => null,
  removeCartProduct: () => null,
  cartCount: 0,
  cartTotal: 0,
});

const INITIAL_STATE = {
  cartIsOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_CART_IS_OPEN: "SET_CART_IS_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_CART_IS_OPEN:
      return {
        ...state,
        cartIsOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in the cartReducer`);
  }
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

export const CartProvider = ({ children }) => {
  const [{ cartItems, cartCount, cartTotal, cartIsOpen }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (updatedCartItems) => {
    const updatedCartCount = updatedCartItems.reduce(
      (prev, curr) => prev + curr.quantity,
      0,
    );

    const updatedCartTotal = updatedCartItems.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: updatedCartItems,
        cartCount: updatedCartCount,
        cartTotal: updatedCartTotal,
      }),
    );
  };

  const setCartIsOpen = (updatedCartIsOpen) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_IS_OPEN, updatedCartIsOpen),
    );
  };

  const addCartItem = (productToAdd) => {
    const updatedCartItems = addCartItemHelper(cartItems, productToAdd);
    updateCartItemsReducer(updatedCartItems);
  };
  const removeCartItem = (productToRemove) => {
    const updatedCartItems = removeCartItemHelper(cartItems, productToRemove);
    updateCartItemsReducer(updatedCartItems);
  };
  const removeCartProduct = (productToRemove) => {
    const updatedCartItems = removeCartProductHelper(
      cartItems,
      productToRemove,
    );
    updateCartItemsReducer(updatedCartItems);
  };
  const value = {
    cartIsOpen,
    setCartIsOpen,
    cartItems,
    addCartItem,
    removeCartItem,
    removeCartProduct,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
