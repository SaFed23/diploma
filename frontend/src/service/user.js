import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const userLogin = (user) => {
  return axios.post(`${API_ROUTES.AUTH}/login`, user);
};

export const getUsers = () => {
  return axios.get(`${API_ROUTES.USER}`, AUTH);
};

export const updateUser = (user) => {
  return axios.put(`${API_ROUTES.USER}`, user, AUTH);
};

export const changePassword = (user) => {
  return axios.put(`${API_ROUTES.USER}/changePassword`, user, AUTH);
};

export const createUser = (user) => {
  return axios.post(`${API_ROUTES.USER}`, user, AUTH);
};

export const deleteUser = (userId) => {
  return axios.delete(`${API_ROUTES.USER}/${userId}`, AUTH);
};