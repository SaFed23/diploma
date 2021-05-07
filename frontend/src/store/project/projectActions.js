/* eslint-disable import/prefer-default-export */
import { getUserProjects, createProject } from './projectExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;
// const { getUserToken } = userSlice.actions;

export const fetchUserProjects = () => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(getUserProjects());
  dispatch(finishLoading());
};

export const createProjectAndFetch = (project) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(createProject(project));
  await dispatch(getUserProjects());
  dispatch(finishLoading());
};
