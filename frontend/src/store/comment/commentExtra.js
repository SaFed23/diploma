/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/comment';
import { snackbarAction } from '../snackbar';

// extra actions
export const getCommentsByTaskId = createAsyncThunk('comment/getCommentsByTaskId',
  async (_, { dispatch, getState }) => {
    const { taskId } = getState().comment;
    try {
      const { data, status } = await service.getCommentsByTaskId(taskId);
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

// export const createFeature = createAsyncThunk('feature/createFeature',
//   async (feature, { dispatch }) => {
//     try {
//       const { data, status } = await service.createFeature(feature);
//       if (status === 200) {
//         return data;
//       }
//     } catch (e) {
//       dispatch(snackbarAction.addNotification({
//         message: "error",
//         variant: "error"
//       }));
//     }
//     return null
//   });

// extra reducer
export default {
  [getCommentsByTaskId.fulfilled]: (state, action) => {
    const data = action.payload;
    console.log()
    if (data) {
      state.data = data;
    }
  },
};
