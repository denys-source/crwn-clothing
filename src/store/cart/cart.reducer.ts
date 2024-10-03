import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CategoryItem } from "../categories/categories.types";


export type CartItem = CategoryItem & {
  quantity: number;
}

export type CartState = {
  readonly cartIsOpen: boolean;
  readonly cartItems: CartItem[];
}

const addCartItemHelper = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItemHelper = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
  return cartItems
    .map((item) =>
      item.id === productToRemove.id && item.quantity
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    )
    .filter((item) => item.quantity);
};

const removeCartProductHelper = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

const INITIAL_STATE: CartState = {
  cartIsOpen: false,
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: INITIAL_STATE,
  reducers: {
    setCartIsOpen(state, action: PayloadAction<boolean>) {
      state.cartIsOpen = action.payload;
    },
    addCartItem(state, action: PayloadAction<CategoryItem>) {
      state.cartItems = addCartItemHelper(state.cartItems, action.payload);
    },
    removeCartItem(state, action: PayloadAction<CartItem>) {
      state.cartItems = removeCartItemHelper(state.cartItems, action.payload);
    },
    removeCartProduct(state, action: PayloadAction<CartItem>) {
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
