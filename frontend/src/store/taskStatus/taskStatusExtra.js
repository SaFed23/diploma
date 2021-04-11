/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/taskStatuses';

// extra actions
export const getTaskStatuses = createAsyncThunk('taskStatus/getTaskStatuses',
  async ({ notification }) => {
    try {
      const { data, status } = await service.getTaskStatuses();
      if (status === 200) {
        return data;
      }
    } catch (e) {
      notification(e.message, { variant: "error" });
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
