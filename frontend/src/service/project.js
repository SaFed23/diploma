import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const getUserProjects = (userId) => {
  return axios.get(`${API_ROUTES.PROJECT}/user/${userId}`, {
    headers: {
      Authorization: localStorage.getItem('token'),
    }
  });
}