/* eslint-disable import/prefer-default-export */
import { getUserProjects, createProject, updateProject, deleteProject } from './projectExtra';
import loadingSlice from '../loading/loadingSlice'

const { startLoading, finishLoading } = loadingSlice.actions;

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


export const updateProjectAndFetch = (project) => async (dispatch) => {
  dispatch(startLoading());
  const result = await dispatch(updateProject(project));
  await dispatch(getUserProjects());
  dispatch(finishLoading());
  return result;
};

export const deleteProjectAndFetch = (projectId) => async (dispatch) => {
  dispatch(startLoading());
  await dispatch(deleteProject(projectId));
  await dispatch(getUserProjects());
  dispatch(finishLoading());
};