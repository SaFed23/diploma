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

export const createReport = createAsyncThunk('report/createReport',
  async (report, { dispatch }) => {
    try {
      const { data, status } = await service.createReport(report);
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
  }
);

export const updateReport = createAsyncThunk('report/updateReport',
  async (report, { dispatch }) => {
    try {
      const { data, status } = await service.updateReport(report);
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
  }
);

export const deleteReport = createAsyncThunk('report/deleteReport',
  async (reportId, { dispatch }) => {
    try {
      const { data, status } = await service.deleteReport(reportId);
      if (status === 204) {
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
