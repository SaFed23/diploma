/* eslint-disable import/prefer-default-export */
import {
  commentAction,
  getCommentsByTaskId,
} from '.';
import loadingSlice from '../loading/loadingSlice';

const { startLoading, finishLoading } = loadingSlice.actions;

export const setTaskIdAndFetch = (taskId) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(commentAction.setTaskId(taskId));
  await dispatch(getCommentsByTaskId());
  dispatch(finishLoading());
};