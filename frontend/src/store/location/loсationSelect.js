import { createSelector } from '@reduxjs/toolkit';

export const selectLocationState = (state) => state.location;

export const selectLocationData = createSelector(selectLocationState, (state) => state.data);
