import API from "../../../lib/Api";

export const addTemplateApi = template => {
  return API.post("/campaign/templates", template);
};
export const getTemplatesApi = () => {
  return API.get("/campaign/templates");
};
export const updateTemplateApi = queryObj => {
  return API.patch("/campaign/templates", queryObj);
};
export const deleteTemplateApi = id => {
  return API.delete(`/campaign/templates/${id}`)
}
