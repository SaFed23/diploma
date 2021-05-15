/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/factor';
import { snackbarAction } from '../snackbar';

// extra actions
export const getFactors = createAsyncThunk('factor/getFactors',
  async (_, { dispatch }) => {
    try {
      const { data, status } = await service.getFactors();
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

export const createFactor = createAsyncThunk('factor/createFactor',
  async (factor, { dispatch }) => {
    try {
      const { data, status } = await service.createFactor(factor);
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

export const updateFactor = createAsyncThunk('factor/updateFactor',
  async (factor, { dispatch }) => {
    try {
      const { data, status } = await service.updateFactor(factor);
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
  [getFactors.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.data = data;
    }
  },
};
