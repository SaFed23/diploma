import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getTasksByFeatureId = (featureId) => {
  return axios.get(`${API_ROUTES.TASK}/feature/${featureId}`, AUTH);
};

export const getTaskById = (taskId) => {
  return axios.get(`${API_ROUTES.TASK}/${taskId}`, AUTH);
};

export const createTask = (task) => {
  return axios.post(`${API_ROUTES.TASK}`, task, AUTH);
};