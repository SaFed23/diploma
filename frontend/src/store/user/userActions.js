/* eslint-disable import/prefer-default-export */
import userSlice from './userSlice';
import { getUserToken } from './userExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;
// const { getUserToken } = userSlice.actions;

export const userAuth = (user, notification) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getUserToken({ user, notification }));
  dispatch(finishLoading());
};
