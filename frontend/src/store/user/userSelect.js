import { createSelector } from '@reduxjs/toolkit';

export const selectUserState = (state) => state.user;

export const selectUserData = createSelector(selectUserState, (state) => state.user);
export const selectUserToken = createSelector(
  selectUserState,
  (state) => state.token,
);
export const selectUserLanguage = createSelector(
  selectUserState,
  (state) => state.language,
);
