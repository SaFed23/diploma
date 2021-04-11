import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const getTaskStatuses = (featureId) => {
  return axios.get(`${API_ROUTES.TASK_STATUSES}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    }
  });
}