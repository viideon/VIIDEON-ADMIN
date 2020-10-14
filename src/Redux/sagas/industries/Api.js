import API from "../../../lib/Api";

export const addIndustryApi = industry => {
  return API.post("/industry/", industry);
};
export const getIndustriesApi = () => {
  return API.get("/industry/");
};
export const updateIndustryApi = (industry) => {
  return API.patch("/industry/", industry);
};
export const deleteIndustryApi = id => {
  return API.delete(`/industry/${id}`)
}
