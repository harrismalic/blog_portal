import { apiService } from "../Utils/api.service";
import { API_URLS } from "./apiURLs";

const searchPost = (data) => {
  return apiService.post(API_URLS.SEARCH_POST, data);
};

export const SearchService = {
  searchPost,
};
