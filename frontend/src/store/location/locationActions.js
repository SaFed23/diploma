/* eslint-disable import/prefer-default-export */
import { createLocation, updateLocation, getLocations } from './locationExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const fetchLocations = () => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getLocations());
  dispatch(finishLoading());
};

export const createLocationAndFetch = (location) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(createLocation(location))
  await dispatch(getLocations());
  dispatch(finishLoading());
};

export const updateLocationAndFetch = (location) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(updateLocation(location))
  await dispatch(getLocations());
  dispatch(finishLoading());
};
