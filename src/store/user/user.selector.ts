import { createSelector } from "reselect";

import { UserState } from "./user.reducer";

export const selectUserSlice = (state): UserState => state.user;

export const selectUser = createSelector([selectUserSlice], (user) => user.currentUser);
