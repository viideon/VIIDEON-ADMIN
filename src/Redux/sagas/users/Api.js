import API from "../../../lib/Api";

export const getUsersApi = (pageNo, token) =>
  API.get("user/getAllUsersWithPagination", {
    params: { pageNo },
    headers: { authorization: "bearer " + token }
  });
