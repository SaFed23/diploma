/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/taskStatuses';
import { snackbarAction } from '../snackbar';

// extra actions
export const getTaskStatuses = createAsyncThunk('taskStatus/getTaskStatuses',
  async (_, { dispatch }) => {
    try {
      const { data, status } = await service.getTaskStatuses();
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
  [getTaskStatuses.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.data = data;
    }
  },
};
