import { createSelector } from "reselect";

const selectCategorySlice = (state) => {
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
    }, {});
  },
);
