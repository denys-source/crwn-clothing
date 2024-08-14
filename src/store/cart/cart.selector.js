import { createSelector } from "reselect";

const selectCartSlice = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartSlice],
  (cartSlice) => cartSlice.cartItems,
);

export const selectCartIsOpen = createSelector(
  [selectCartSlice],
  (cartSlice) => cartSlice.cartIsOpen,
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((prev, curr) => prev + curr.quantity, 0),
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((prev, curr) => prev + curr.price * curr.quantity, 0),
);