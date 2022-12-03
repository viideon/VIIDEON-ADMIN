import {API} from 'aws-amplify';

export const addTemplateApi = template => {
  return API.post('Backend', "/campaign/templates", {body: template});
};
export const getTemplatesApi = () => {
  return API.get('Backend', "/campaign/templates", {});
};
export const updateTemplateApi = queryObj => {
  return API.patch('Backend', "/campaign/templates", {body: queryObj});
};
export const deleteTemplateApi = id => {
  return API.del('Backend', `/campaign/templates/${id}`, {})
}
