/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/feature';
import { snackbarAction } from '../snackbar';

// extra actions
export const getFeaturesByProjectId = createAsyncThunk('feature/getFeaturesByProjectId',
  async (_, { dispatch, getState }) => {
    const { projectId } = getState().feature;
    try {
      const { data, status } = await service.getFeaturesByProjectId(projectId);
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

export const createFeature = createAsyncThunk('feature/createFeature',
  async (feature, { dispatch }) => {
    try {
      const { data, status } = await service.createFeature(feature);
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


export const updateFeature = createAsyncThunk('feature/updateFeature',
  async (feature, { dispatch }) => {
    try {
      const { data, status } = await service.updateFeature(feature);
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

export const deleteFeature = createAsyncThunk('feature/deleteFeature',
  async (featureId, { dispatch }) => {
    try {
      const { data, status } = await service.deleteFeature(featureId);
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

// extra reducer
export default {
  [getFeaturesByProjectId.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.data = data;
    }
  },
};
