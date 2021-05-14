/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/location';
import { snackbarAction } from '../snackbar';

// extra actions
export const getLocations = createAsyncThunk('taskStatus/getLocations',
  async (_, { dispatch }) => {
    try {
      const { data, status } = await service.getLocations();
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

export const createLocation = createAsyncThunk('taskStatus/createLocation',
  async (location, { dispatch }) => {
    try {
      const { data, status } = await service.createLocation(location);
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

export const updateLocation = createAsyncThunk('taskStatus/updateLocation',
  async (location, { dispatch }) => {
    try {
      const { data, status } = await service.updateLocation(location);
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
  [getLocations.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.data = data;
    }
  },
};
