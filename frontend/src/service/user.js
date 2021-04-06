import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";

export const userLogin = (user) => {
  return axios.post(`${API_ROUTES.AUTH}/login`, user);
}