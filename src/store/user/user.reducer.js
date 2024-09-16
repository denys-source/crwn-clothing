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
  },
});

export const {
  signInSuccess,
  googleSignInStart,
  emailSignInStart,
  signInFailed,
  checkCurrentUser,
} = userSlice.actions;
export const userReducer = userSlice.reducer;
