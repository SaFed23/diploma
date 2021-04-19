import { createSelector } from '@reduxjs/toolkit';

export const selectTaskState = (state) => state.task;

export const selectAllTasks = createSelector(selectTaskState, (state) => state.all);
export const selectCurrentTask = createSelector(selectTaskState, (state) => state.current);