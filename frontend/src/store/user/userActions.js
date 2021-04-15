/* eslint-disable import/prefer-default-export */
import { getUserToken } from './userExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const userAuth = (user) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getUserToken(user));
  dispatch(finishLoading());
};
