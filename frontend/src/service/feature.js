import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getFeaturesByProjectId = (projectId) => {
  return axios.get(`${API_ROUTES.FEATURE}/project/${projectId}`, AUTH);
};

export const createFeature = (feature) => {
  return axios.post(`${API_ROUTES.FEATURE}`, feature, AUTH);
};

export const updateFeature = (feature) => {
  return axios.put(`${API_ROUTES.FEATURE}`, feature, AUTH);
};

export const deleteFeature = (featureId) => {
  return axios.delete(`${API_ROUTES.FEATURE}/${featureId}`, AUTH);
};