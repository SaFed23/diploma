/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/task';
import { snackbarAction } from '../snackbar';

// extra actions
export const getTasksByFeatureId = createAsyncThunk('task/getTasksByFeatureId',
  async (_, { dispatch, getState }) => {
    const { featureId } = getState().task;
    try {
      const { data, status } = await service.getTasksByFeatureId(featureId);
      if (status === 200) {
        return data;
      }
    } catch (e) {
      dispatch(snackbarAction.addNotification({
        message: "error",
        variant: "error"
      }));
    }
    return null
  });

export const getTaskById = createAsyncThunk('task/getTaskById',
  async (taskId, { dispatch }) => {
    try {
      const { data, status } = await service.getTaskById(taskId);
      if (status === 200) {
        return data;
      }
    } catch (e) {
      dispatch(snackbarAction.addNotification({
        message: "error",
        variant: "error"
      }));
    }
    return null
  });

export const createTask = createAsyncThunk('task/createTask',
  async (task, { dispatch }) => {
    try {
      const { data, status } = await service.createTask(task);
      if (status === 201) {
        dispatch(snackbarAction.addNotification({
          message: "success",
          variant: "success"
        }));
        return data;
      }
    } catch (e) {
      dispatch(snackbarAction.addNotification({
        message: "error",
        variant: "error"
      }));
    }
    return null
  });

// extra reducer
export default {
  [getTasksByFeatureId.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.all = data;
    }
  },

  [getTaskById.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.current = data;
    }
  },
};
