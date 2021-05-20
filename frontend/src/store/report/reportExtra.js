/* eslint-disable import/no-anonymous-default-export */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as service from '../../service/report';
import { snackbarAction } from '../snackbar';

// extra actions
export const getReportByMonth = createAsyncThunk('report/getReportByMonth',
  async (_, { dispatch, getState }) => {
    const { currentMonth } = getState().report;
    try {
      const { data, status } = await service.getReportsByFilter({ month: currentMonth });
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
  }
);

// extra reducer
export default {
  [getReportByMonth.fulfilled]: (state, action) => {
    const data = action.payload;
    if (data) {
      state.data = data;
    }
  },
};
