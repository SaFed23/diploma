/* eslint-disable import/prefer-default-export */
import { getFeaturesByProjectId } from './featureExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const featuresByProjectId = (projectId, notification) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getFeaturesByProjectId({ projectId, notification }));
  dispatch(finishLoading());
};
