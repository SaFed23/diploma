/* eslint-disable import/prefer-default-export */
import {
  createFeature,
  getFeaturesByProjectId,
  featureAction,
  updateFeature,
  deleteFeature
} from './';
import loadingSlice from '../loading/loadingSlice';

const { startLoading, finishLoading } = loadingSlice.actions;

export const setProjectIdAndFetch = (projectId) => async (dispatch) => {
  dispatch(startLoading());
  dispatch(featureAction.setProjectId(projectId));
  await dispatch(getFeaturesByProjectId());
  dispatch(finishLoading());
};

export const createFeatureAndFetch = (feature) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(createFeature(feature));
  await dispatch(getFeaturesByProjectId());
  dispatch(finishLoading());
}

export const updateFeatureAndFetch = (feature) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(updateFeature(feature));
  await dispatch(getFeaturesByProjectId());
  dispatch(finishLoading());
}

export const deleteFeatureAndFetch = (featureId) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(deleteFeature(featureId));
  await dispatch(getFeaturesByProjectId());
  dispatch(finishLoading());
}