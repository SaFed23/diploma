import { createSelector } from '@reduxjs/toolkit';

export const selectUserState = (state) => state.user;

export const selectUserData = createSelector(selectUserState, (state) => state.user);
export const selectUserToken = createSelector(
  selectUserState,
  (state) => state.token,
);
export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading,
);
