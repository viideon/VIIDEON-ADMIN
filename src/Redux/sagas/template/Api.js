import API from "../../../lib/Api";

export const addTemplateApi = template => {
  API.post("/campaign/templates", template);
};
