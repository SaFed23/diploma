import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getReportsByFilter = (filter) => {
  return axios.get(`${API_ROUTES.REPORT}/user/filter`, { ...AUTH, params: { ...filter } });
};

export const createReport = (report) => {
  return axios.post(`${API_ROUTES.REPORT}`, report, AUTH);
};

export const updateReport = (report) => {
  return axios.put(`${API_ROUTES.REPORT}`, report, AUTH);
};

export const deleteReport = (reportId) => {
  return axios.delete(`${API_ROUTES.REPORT}/${reportId}`, AUTH);
};

export const getAdminReport = (filter) => {
  return axios.post(`${API_ROUTES.REPORT}/admin/filter`, filter, AUTH);
};