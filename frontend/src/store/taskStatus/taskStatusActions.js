/* eslint-disable import/prefer-default-export */
import { getTaskStatuses } from './taskStatusExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const fetchTaskStatuses = () => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getTaskStatuses());
  dispatch(finishLoading());
};
