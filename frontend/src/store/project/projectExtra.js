/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/project';
import { snackbarAction } from '../snackbar';

// extra actions
export const getUserProjects = createAsyncThunk('project/getUserProjects',
  async (_, { dispatch, getState }) => {
    const { user } = getState().user;
    try {
      const { data, status } = await service.getUserProjects(user.id);
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

export const createProject = createAsyncThunk('project/createProject',
  async (project, { dispatch }) => {
    try {
      const { data, status } = await service.createProject(project);
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
  [getUserProjects.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.data = data;
    }
  },
};
