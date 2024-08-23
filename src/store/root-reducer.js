import { combineReducers } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.reducer";
import { CategoriesReducer } from "./categories/categories.reducer";
import { cartReducer } from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: CategoriesReducer,
  cart: cartReducer,
});
