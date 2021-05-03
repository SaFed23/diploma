import { createSelector } from '@reduxjs/toolkit';

export const selectInviteState = (state) => state.invite;

export const selectInviteData = createSelector(selectInviteState, (state) => state.data);
