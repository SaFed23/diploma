import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getTasksByFeatureId = (featureId) => {
  return axios.get(`${API_ROUTES.TASK}/feature/${featureId}`, AUTH);
}