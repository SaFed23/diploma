/* eslint-disable import/prefer-default-export */
import { changePassword, getUserToken, updateUser } from './userExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

export const userAuth = (user) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getUserToken(user));
  dispatch(finishLoading());
};

export const updateUserData = (user) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(updateUser(user));
  dispatch(finishLoading());
};

export const changeUserPassword = (user, cb) => async (dispatch) => {
  dispatch(startLoading());
  const result = await dispatch(changePassword(user));
  dispatch(finishLoading());
  cb(result);
};
