import { apiService } from "../Utils/api.service";
import { API_URLS } from "./apiURLs";

const getPost = () => apiService.get(API_URLS.GET_POST);
const getPostById = (postId) =>
  apiService.get(`${API_URLS.GET_POST}/${postId}`);

export const postService = {
  getPost,
  getPostById,
};
