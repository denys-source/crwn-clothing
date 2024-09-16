import { testSaga, expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "redux-saga/effects";

import { getCollectionDocuments } from "../../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "../categories.actions";
import {
  categoriesSaga,
  fetchCategoriesAsync,
  onFetchCategories,
} from "../categories.sagas";
import { CATEGORIES_ACTION_TYPES } from "../categories.types";

describe("Categories sagas", () => {
  test("categoriesSagas", () => {
    testSaga(categoriesSaga)
      .next()
      .all([call(onFetchCategories)])
      .next()
      .isDone();
  });

  test("onFetchCategories", () => {
    testSaga(onFetchCategories)
      .next()
      .takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync,
      )
      .next()
      .isDone();
  });

  test("fetchCategoriesAsync success", () => {
    const mockCategoriesArray = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
    ];

    expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getCollectionDocuments, "category"), mockCategoriesArray],
      ])
      .put(fetchCategoriesSuccess(mockCategoriesArray))
      .run();
  });

  test("fetchCategoriesAsync failed", () => {
    const mockError = new Error();

    expectSaga(fetchCategoriesAsync)
      .provide([
        [call(getCollectionDocuments, "category"), throwError(mockError)],
      ])
      .put(fetchCategoriesFailed(mockError))
      .run();
  });
});
