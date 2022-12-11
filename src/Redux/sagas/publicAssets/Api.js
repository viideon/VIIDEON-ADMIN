import {API} from 'aws-amplify';

export const getPublicAssets = () =>
  API.get('Backend', "/publicAssets/getAssets", {});

export const getSignedUrl = () =>
  API.get('Backend', "/publicAssets/getSignedUrlForAssetUploading", {});

export async function addMusicAsset(newAsset) {
  return API.post('Backend', "/asset/addpublicmusic", { body: newAsset});
}
export async function getPublicMusicApi() {
  return API.get('Backend', "/asset/getpublicmusic", {});
}
