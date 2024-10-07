import { createSelector } from "reselect";

import { UserState } from "./user.reducer";
import { RootState } from "../store";

export const selectUserSlice = (state: RootState): UserState => state.user;

export const selectUser = createSelector([selectUserSlice], (user) => user.currentUser);
