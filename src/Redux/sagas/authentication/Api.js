import axios from "axios";
import { baseUrl } from "shared";

export const loginApi = ({ email, password }) =>
  axios.post(`${baseUrl}user/login`, { email, password });
