import API from "../../../lib/Api";

export const loginApi = ({ email, password }) =>
  API.post("user/login", { email, password });
