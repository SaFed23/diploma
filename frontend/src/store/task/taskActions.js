/* eslint-disable import/prefer-default-export */
import { getTasksByFeatureId } from './taskExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const fetchTasksByFeatureId = (featureId) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getTasksByFeatureId(featureId));
  dispatch(finishLoading());
};
