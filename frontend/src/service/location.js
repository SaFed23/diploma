import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getLocations = () => {
  return axios.get(`${API_ROUTES.LOCATION}`, AUTH);
};

export const createLocation = (location) => {
  return axios.post(`${API_ROUTES.LOCATION}`, location, AUTH);
};

export const updateLocation = (location) => {
  return axios.put(`${API_ROUTES.LOCATION}`, location, AUTH);
};