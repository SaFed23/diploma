import { createSelector } from '@reduxjs/toolkit';

export const selectDictionaryState = (state) => state.dictionary;

export const selectDictionaryData = createSelector(selectDictionaryState, (state) => state.data);
export const selectDictionaryPagination = createSelector(
  selectDictionaryState,
  (state) => state.pagination,
);
export const selectDictionaryTotalElements = createSelector(
  selectDictionaryState,
  (state) => state.totalElements,
);
export const selectDictionaryName = createSelector(
  selectDictionaryState,
  (state) => state.dictionaryName,
);
export const selectDictionaryLoading = createSelector(
  selectDictionaryState,
  (state) => state.loading,
);
