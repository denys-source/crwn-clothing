import { createSelector } from "reselect";
import { CategoriesState } from "./categories.reducer";
import { CategoriesMap } from "./categories.types";
import { RootState } from "../store";

const selectCategorySlice = (state: RootState): CategoriesState => {
  return state.categories;
};

export const selectCategories = createSelector(
  [selectCategorySlice],
  (categorySlice) => {
    return categorySlice.categories;
  },
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categoriesArray) => {
    return categoriesArray.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoriesMap);
  },
);

export const selectCategoryIsLoading = createSelector(
  [selectCategorySlice],
  (categorySlice) => categorySlice.isLoading,
);
