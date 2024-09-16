import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createUserDocument,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import {
  checkCurrentUser,
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
} from "./user.reducer";

function* getSnapshotFromUserAuth(userAuth, additionalOptions) {
  try {
    const userSnapshot = yield call(
      createUserDocument,
      userAuth,
      additionalOptions,
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signInWithEmail(action) {
  try {
    const { email, password } = action.payload;
    const { user } = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password,
    );
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* isCurrentUserAuthenticated() {
  try {
    const authUser = yield call(getCurrentUser);
    if (authUser) {
      yield call(getSnapshotFromUserAuth, authUser);
    }
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart.type, signInWithGoogle);
}

function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart.type, signInWithEmail);
}

function* onCheckCurrentUser() {
  yield takeLatest(checkCurrentUser.type, isCurrentUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckCurrentUser),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}
