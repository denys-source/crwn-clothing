import { INITIAL_STATE, CategoriesReducer } from "../categories.reducer";
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "../categories.actions";

describe("Categories Reducer tests", () => {
  test("fetchCategoriesStart", () => {
    const expectedState = {
      ...INITIAL_STATE,
      isLoading: true,
    };

    expect(CategoriesReducer(INITIAL_STATE, fetchCategoriesStart())).toEqual(
      expectedState,
    );
  });

  test("fetchCategoriesSuccess", () => {
    const mockData = [
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
    ];

    const expectedState = {
      ...INITIAL_STATE,
      isLoading: false,
      categories: mockData,
    };

    expect(
      CategoriesReducer(INITIAL_STATE, fetchCategoriesSuccess(mockData)),
    ).toEqual(expectedState);
  });

  test("fetchCategoriesError", () => {
    const mockError = new Error("Mock error");
    const expectedState = {
      ...INITIAL_STATE,
      isLoading: false,
      error: mockError,
    };

    expect(
      CategoriesReducer(INITIAL_STATE, fetchCategoriesFailed(mockError)),
    ).toEqual(expectedState);
  });
});
