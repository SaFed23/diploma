/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/task';
import { snackbarAction } from '../snackbar';

// extra actions
export const getTasksByFeatureId = createAsyncThunk('task/getTasksByFeatureId',
  async (featureId, { dispatch }) => {
    try {
      const { data, status } = await service.getTasksByFeatureId(featureId);
      if (status === 200) {
        return data;
      }
    } catch (e) {
      dispatch(snackbarAction.addNotification({
        message: "login_fail",
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
      state.data = data;
    }
  },
};
