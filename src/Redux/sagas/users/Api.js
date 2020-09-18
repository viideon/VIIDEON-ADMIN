import API from "../../../lib/Api";

export const getUsersApi = (pageNo, pageSize, token) =>
  API.get("user/", {
    params: { pageNo, pageSize },
    headers: { authorization: "bearer " + token }
  });
