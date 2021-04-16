import API from "../../../lib/Api";

export const getPublicAssets = token =>
  API.get("/publicAssets/getAssets", {
    headers: { authorization: "bearer " + token }
  });

export const getSignedUrl = token =>
  API.get("/publicAssets/getSignedUrlForAssetUploading", {
    headers: { authorization: "bearer " + token }
  });
  export async function addMusicAsset(newAsset) {
    return API.post("/asset/addpublicmusic", newAsset);
  }
  export async function getPublicMusicApi() {
    return API.get("/asset/getpublicmusic");
  }
