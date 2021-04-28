import { createSelector } from '@reduxjs/toolkit';

export const selectCommentState = (state) => state.comment;

export const selectCommentData = createSelector(selectCommentState, (state) => state.data);
