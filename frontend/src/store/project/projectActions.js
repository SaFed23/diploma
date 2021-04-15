/* eslint-disable import/prefer-default-export */
import { getUserProjects } from './projectExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;
// const { getUserToken } = userSlice.actions;

export const fetchUserProjects = (userId) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getUserProjects(userId));
  dispatch(finishLoading());
};
