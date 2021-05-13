import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getTaskStatuses = () => {
  return axios.get(`${API_ROUTES.TASK_STATUSES}`, AUTH);
};

export const createTaskStatus = (status) => {
  return axios.post(`${API_ROUTES.TASK_STATUSES}`, status, AUTH);
};

export const updateTaskStatus = (status) => {
  return axios.put(`${API_ROUTES.TASK_STATUSES}`, status, AUTH);
};