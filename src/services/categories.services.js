// import { apiService } from "../Utils/api.service.";
import { apiService } from "../Utils/api.service";
import { API_URLS } from "./apiURLs";

const getCategory = () => {
  return apiService.get(API_URLS.GET_CATEGORY);
};

const getCategoryById = (catid) => {
  return apiService.get(`${API_URLS.GET_CATEGORY}/${catid}`);
};

const deleteCategoryById = (catId) => {
  return apiService.delete(`${API_URLS.GET_CATEGORY}/${catId}`);
};

const addCategory = (payload) => {
  return apiService.post(API_URLS.GET_CATEGORY, payload);
};

const updateCategoryById = (catId, payload) => {
  return apiService.put(`${API_URLS.GET_CATEGORY}/${catId}`, payload);
};

export const CategoryService = {
  getCategory,
  getCategoryById,
  deleteCategoryById,
  addCategory,
  updateCategoryById,
};
