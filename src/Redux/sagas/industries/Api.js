import {API} from 'aws-amplify';

export const addIndustryApi = industry => {
  return API.post('Backend', "/industry", { body: industry });
};
export const getIndustriesApi = () => {
  return API.get('Backend', "/industry", {});
};
export const updateIndustryApi = (industry) => {
  return API.patch('Backend', "/industry", { body: industry });
};
export const deleteIndustryApi = id => {
  return API.del('Backend', `/industry/${id}`, {})
}
