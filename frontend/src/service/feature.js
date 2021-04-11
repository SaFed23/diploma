import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const getFeaturesByProjectId = (projectId) => {
  return axios.get(`${API_ROUTES.FEATURE}/project/${projectId}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    }
  });
}