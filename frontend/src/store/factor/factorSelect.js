import { createSelector } from '@reduxjs/toolkit';

export const selectFactorState = (state) => state.factor;

export const selectFactorData = createSelector(selectFactorState, (state) => state.data);
