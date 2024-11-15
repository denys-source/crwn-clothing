import { all, call, put, takeLatest } from "redux-saga/effects";

import { getCollectionDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
} from "./categories.actions";
import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionDocuments, "category");
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    yield put(fetchCategoriesFailed(error));
  }
}

export function* onFetchCategories() {
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync,
  );
}

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]);
}
