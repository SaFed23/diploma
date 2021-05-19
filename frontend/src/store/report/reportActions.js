/* eslint-disable import/prefer-default-export */
import {
  getReportByMonth,
  reportAction
} from '.';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const setMonthAndFetch = (month) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(reportAction.setCurrentMonth(month));
  await dispatch(getReportByMonth());
  dispatch(finishLoading());
};