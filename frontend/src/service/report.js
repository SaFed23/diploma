import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getReportsByMonth = (month) => {
  return axios.get(`${API_ROUTES.REPORT}/month/${month}`, AUTH);
}