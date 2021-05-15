/* eslint-disable import/prefer-default-export */
import { createFactor, updateFactor, getFactors } from './factorExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const fetchFactors = () => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getFactors());
  dispatch(finishLoading());
};

export const createFactorAndFetch = (factor) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(createFactor(factor))
  await dispatch(getFactors());
  dispatch(finishLoading());
};

export const updateFactorAndFetch = (factor) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(updateFactor(factor))
  await dispatch(getFactors());
  dispatch(finishLoading());
};
