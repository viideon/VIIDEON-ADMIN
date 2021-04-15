import API from "../../../lib/Api";

export const getUsersApi = (pageNo, pageSize, token) =>
  API.get("user/", {
    params: { pageNo, pageSize },
    headers: { authorization: "bearer " + token }
  });


  // export const removeUserApi = (id) => {
  //   console.log('api',id)
  //    API.delete(`/user/${id}`)
  // }
  export const removeUserApi = (id , token) =>
  API.get(`user/${id}`, {
    params: { id },
    headers: { authorization: "bearer " + token }
  });