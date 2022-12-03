import {API} from 'aws-amplify';

export const getUsersApi = (pageNo, pageSize) =>
  API.get('Backend', "/user/", {
    params: { pageNo, pageSize }
  });
  export const removeUserApi = (id) =>
  API.get('Backend', `/user/${id}`, {
    params: { id }
  });