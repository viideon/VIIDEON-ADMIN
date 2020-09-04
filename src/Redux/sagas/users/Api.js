import axios from "axios";
import { baseUrl } from "shared";

export const getUsersApi = (pageNo, token) =>
  axios.get(`${baseUrl}user/getAllUsersWithPagination`, {
    params: { pageNo },
    headers: { authorization: "bearer " + token },
  });
