/* eslint-disable import/prefer-default-export */
import { getUserProjects } from './projectExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;
// const { getUserToken } = userSlice.actions;

export const userProjects = (userId, notification) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getUserProjects({ userId, notification }));
  dispatch(finishLoading());
};
