/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/feature';

// extra actions
export const getFeaturesByProjectId = createAsyncThunk('feature/getFeaturesByProjectId',
  async ({ projectId, notification }) => {
    try {
      const { data, status } = await service.getFeaturesByProjectId(projectId);
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
  [getFeaturesByProjectId.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.data = data;
    }
  },
};
