import { apiService } from "../Utils/api.service";
import { API_URLS } from "./apiURLs";

const storeComment = (data = {}) =>
  apiService.post(API_URLS.STORE_COMMENT, data);

export const commentService = {
  storeComment,
};
