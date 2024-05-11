import { create } from "apisauce";

const apiSauceInstant = create({
  baseURL: process.env.REACT_APP_API_URL,
});

const globalHeaders = {
  headers: {
    // "Content-Type": "multipart/formdata",
    "Content-Type": "application/json",
  },
};

const get = (url, params = {}) => apiSauceInstant.get(url, params);

const post = (url, data = {}, paramsHeader = globalHeaders) =>
  apiSauceInstant.post(url, data, paramsHeader);
const put = (url, data = {}, paramsHeader = globalHeaders) =>
  apiSauceInstant.put(url, data, paramsHeader);
const patch = (url, data) => apiSauceInstant.patch(url, data, globalHeaders);
const deleteRequest = (url, params = {}) => apiSauceInstant.delete(url, params);

export const apiService = {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
