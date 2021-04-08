/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/project';

// extra actions
export const getUserProjects = createAsyncThunk('project/getUserProjects',
  async ({ userId, notification }) => {
    try {
      const { data, status } = await service.getUserProjects(userId);
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
  [getUserProjects.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.projects = data;
    }
  },
};
