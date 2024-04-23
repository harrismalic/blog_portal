import { create } from "apisauce";

const apiSauceInstant = create({
  baseURL: process.env.REACT_APP_API_URL,
});

const get = (url, params = {}) => apiSauceInstant.get(url, params);

const post = (url, data) =>
  apiSauceInstant.post(url, data, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
const put = (url, data) =>
  apiSauceInstant.put(url, data, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
const patch = (url, data) =>
  apiSauceInstant.patch(url, data, {
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
const deleteRequest = (url, params = {}) => apiSauceInstant.delete(url, params);
