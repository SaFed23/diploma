/* eslint-disable import/prefer-default-export */
import {
  getReportByMonth,
  createReport,
  reportAction,
  updateReport,
  deleteReport,
  getAdminReport,
} from '.';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const setMonthAndFetch = (month) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(reportAction.setCurrentMonth(month));
  await dispatch(getReportByMonth());
  dispatch(finishLoading());
};

export const createReportAndFetch = (report) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(createReport(report));
  await dispatch(getReportByMonth());
  dispatch(finishLoading());
};

export const updateReportAndFetch = (report) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(updateReport(report));
  await dispatch(getReportByMonth());
  dispatch(finishLoading());
};

export const deleteReportAndFetch = (reportId) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(deleteReport(reportId));
  await dispatch(getReportByMonth());
  dispatch(finishLoading());
};

export const fetchAdminReport = (filter) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getAdminReport(filter));
  dispatch(finishLoading());
};