import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const getTasksByFeatureId = (featureId) => {
  return axios.get(`${API_ROUTES.TASK}/feature/${featureId}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    }
  });
}