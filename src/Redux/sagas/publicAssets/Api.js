import API from "../../../lib/Api";

export const getPublicAssets = token =>
  API.get("/publicAssets/getAssets", {
    headers: { authorization: "bearer " + token }
  });

export const getSignedUrl = token =>
  API.get("/publicAssets/getSignedUrlForAssetUploading", {
    headers: { authorization: "bearer " + token }
  });
