import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getReportsByFilter = (filter) => {
  return axios.get(`${API_ROUTES.REPORT}/filter`, { ...AUTH, params: { ...filter } });
}