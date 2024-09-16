import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocument,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutAuthUser,
} from "../../utils/firebase/firebase.utils";
import {
  checkCurrentUser,
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  signUpFailed,
  signUpStart,
  signUpSuccess,
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

function* signInAfterSignUp(action) {
  try {
    const { user, additionalOptions } = action.payload;
    yield call(getSnapshotFromUserAuth, user, additionalOptions);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

function* signUpUser(action) {
  try {
    const { email, password, displayName } = action.payload;
    const { user } = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password,
    );
    yield put(signUpSuccess({ user, additionalOptions: { displayName } }));
  } catch (error) {
    yield put(signUpFailed(error));
  }
}

function* signOutUser() {
  try {
    yield call(signOutAuthUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
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

function* onSignUpSuccess() {
  yield takeLatest(signUpSuccess.type, signInAfterSignUp);
}

function* onSignUpStart() {
  yield takeLatest(signUpStart.type, signUpUser);
}

function* onSignOutStart() {
  yield takeLatest(signOutStart.type, signOutUser);
}

function* onCheckCurrentUser() {
  yield takeLatest(checkCurrentUser.type, isCurrentUserAuthenticated);
}

export function* userSagas() {
  yield all([
    call(onCheckCurrentUser),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
