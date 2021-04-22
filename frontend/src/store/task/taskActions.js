/* eslint-disable import/prefer-default-export */
import {
  getTaskById,
  getTasksByFeatureId,
  taskAction,
  createTask
} from './';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const setFeatureIdAndFetch = (featureId) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(taskAction.setFeatureId(featureId));
  await dispatch(getTasksByFeatureId());
  dispatch(finishLoading());
};

export const fetchTaskById = (taskId) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getTaskById(taskId));
  dispatch(finishLoading());
};

export const createTaskAndFetch = (task) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(createTask(task));
  await dispatch(getTasksByFeatureId());
  dispatch(finishLoading());
};
