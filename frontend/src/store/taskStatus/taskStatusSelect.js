import { createSelector } from '@reduxjs/toolkit';

export const selectTaskStatusState = (state) => state.taskStatus;

export const selectTaskStatusData = createSelector(selectTaskStatusState, (state) => state.data);
