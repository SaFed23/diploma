import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getRoles = () => {
  return axios.get(`${API_ROUTES.ROLES}`, AUTH);
};