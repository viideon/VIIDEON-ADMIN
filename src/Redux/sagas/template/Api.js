import API from "../../../lib/Api";

export const addTemplateApi = template => {
  return API.post("/campaign/templates", template);
};
export const getTemplatesApi = () => {
  return API.get("/campaign/templates");
};
