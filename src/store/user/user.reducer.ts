import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth"


export type UserState = {
  readonly currentUser: User | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const INITIAL_VALUE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_VALUE,
  reducers: {
    checkCurrentUser(state) {
      return state;
    },
    signInSuccess(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
    },
    googleSignInStart(state) {
      return state;
    },
    emailSignInStart(state) {
      return state;
    },
    signInFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload;
    },
    signUpStart(state) {
      return state;
    },
    signUpSuccess(state) {
      return state;
    },
    signUpFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload;
    },
    signOutStart(state) {
      return state;
    },
    signOutSuccess(state) {
      state.currentUser = null;
    },
    signOutFailed(state, action: PayloadAction<Error>) {
      state.error = action.payload;
    },
  },
});

export const {
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
  checkCurrentUser,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
