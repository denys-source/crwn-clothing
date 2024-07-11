import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { CategoriesReducer } from "./categories/categories.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  categories: CategoriesReducer,
});
