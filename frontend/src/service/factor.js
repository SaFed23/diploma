import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getFactors = () => {
  return axios.get(`${API_ROUTES.FACTOR}`, AUTH);
};

export const createFactor = (factor) => {
  return axios.post(`${API_ROUTES.FACTOR}`, factor, AUTH);
};

export const updateFactor = (factor) => {
  return axios.put(`${API_ROUTES.FACTOR}`, factor, AUTH);
};