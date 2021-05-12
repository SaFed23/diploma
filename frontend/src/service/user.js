import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const userLogin = (user) => {
  return axios.post(`${API_ROUTES.AUTH}/login`, user);
};

export const getUsers = () => {
  return axios.get(`${API_ROUTES.USER}`, AUTH);
}