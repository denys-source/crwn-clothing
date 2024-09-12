import {
  selectCategories,
  selectCategoriesMap,
  selectCategoryIsLoading,
} from "../categories.selector";

const categorySliceMock = {
  categories: {
    isLoading: false,
    categories: [
      {
        title: "mens",
        items: [
          { id: 1, name: "Product 1" },
          { id: 2, name: "Product 2" },
        ],
      },
      {
        title: "womens",
        items: [
          { id: 3, name: "Product 3" },
          { id: 4, name: "Product 4" },
        ],
      },
    ],
  },
};

describe("Categories selectors tests", () => {
  test("selectCategories should return categories", () => {
    const categories = selectCategories(categorySliceMock);

    expect(categories).toEqual(categorySliceMock.categories.categories);
  });

  test("selectCategoryIsLoading should return isLoading value", () => {
    const isLoading = selectCategoryIsLoading(categorySliceMock);

    expect(isLoading).toEqual(false);
  });

  test("selectCategoriesMap should return map constructed from category items", () => {
    const expectedCategoriesMap = {
      mens: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
      ],
      womens: [
        { id: 3, name: "Product 3" },
        { id: 4, name: "Product 4" },
      ],
    };
    const categoriesMap = selectCategoriesMap(categorySliceMock);

    expect(categoriesMap).toEqual(expectedCategoriesMap);
  });
});
