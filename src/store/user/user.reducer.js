import { createSlice } from "@reduxjs/toolkit";

const INITIAL_VALUE = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_VALUE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
