import axios from "axios";
import { baseUrl } from "shared";

export const getPublicAssets = (token) =>
  axios.get(`${baseUrl}publicAssets/getAssets`, {
    headers: { authorization: "bearer " + token },
  });

export const getSignedUrl = (token) =>
  axios.get(`${baseUrl}publicAssets/getSignedUrlForAssetUploading`, {
    headers: { authorization: "bearer " + token },
  });
