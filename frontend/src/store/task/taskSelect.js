import { createSelector } from '@reduxjs/toolkit';

export const selectTaskState = (state) => state.task;

export const selectTaskData = createSelector(selectTaskState, (state) => state.data);
