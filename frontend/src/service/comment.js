import axios from "axios";
import { API_ROUTES } from "../constants/apiRoutes";
import { AUTH } from "./config";

export const getCommentsByTaskId = (taskId) => {
  return axios.get(`${API_ROUTES.COMMENT}/task/${taskId}`, AUTH);
}