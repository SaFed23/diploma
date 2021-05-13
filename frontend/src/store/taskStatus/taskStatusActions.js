/* eslint-disable import/prefer-default-export */
import { getTaskStatuses, createTaskStatus, updateTaskStatus } from './taskStatusExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const fetchTaskStatuses = () => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getTaskStatuses());
  dispatch(finishLoading());
};

export const createTaskStatusAndFetch = (status) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(createTaskStatus(status))
  await dispatch(getTaskStatuses());
  dispatch(finishLoading());
};

export const updateTaskStatusAndFetch = (status) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(updateTaskStatus(status))
  await dispatch(getTaskStatuses());
  dispatch(finishLoading());
};
