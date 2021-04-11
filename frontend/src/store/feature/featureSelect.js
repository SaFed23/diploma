import { createSelector } from '@reduxjs/toolkit';

export const selectFeatureState = (state) => state.feature;

export const selectFeatureData = createSelector(selectFeatureState, (state) => state.data);
