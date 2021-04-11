import { createSelector } from '@reduxjs/toolkit';

export const selectProjectState = (state) => state.project;

export const selectProjectData = createSelector(selectProjectState, (state) => state.data);
