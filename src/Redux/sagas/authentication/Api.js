import {API} from 'aws-amplify';

export const loginApi = ({ email }) =>
  API.post('Backend', "/user/login", { body: { email } });
