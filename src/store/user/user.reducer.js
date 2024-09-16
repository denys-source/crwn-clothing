import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_VALUE,
  reducers: {
    checkCurrentUser(state, action) {
      return state;
    },
    signInSuccess(state, action) {
      state.currentUser = action.payload;
    },
    googleSignInStart(state, action) {
      return state;
    },
    emailSignInStart(state, action) {
      return state;
    },
    signInFailed(state, action) {
      state.error = action.payload;
    },
    signUpStart(state, action) {
      return state;
    },
    signUpSuccess(state, action) {
      return state;
    },
    signUpFailed(state, action) {
      state.error = action.payload;
    },
    signOutStart(state, action) {
      return state;
    },
    signOutSuccess(state, action) {
      state.currentUser = null;
    },
    signOutFailed(state, action) {
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
