import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getUserProjects = (userId) => {
  return axios.get(`${API_ROUTES.PROJECT}/user/${userId}`, AUTH);
};

export const createProject = (project) => {
  return axios.post(`${API_ROUTES.PROJECT}`, project, AUTH);
};