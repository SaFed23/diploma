/* eslint-disable import/prefer-default-export */
import { changePassword, createUser, fetchUsers, getUserToken, updateUser, deleteUser } from './userExtra';
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

export const fetchAllUsersData = () => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(fetchUsers());
  dispatch(finishLoading());
};

export const createUserAndFetch = (user) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(createUser(user));
  await dispatch(fetchUsers());
  dispatch(finishLoading());
};

export const deleteUserAndFetch = (userId) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(deleteUser(userId));
  await dispatch(fetchUsers());
  dispatch(finishLoading());
};