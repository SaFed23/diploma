/* eslint-disable import/prefer-default-export */
import { getFeaturesByProjectId } from './featureExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const fetchFeaturesByProjectId = (projectId) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getFeaturesByProjectId(projectId));
  dispatch(finishLoading());
};
