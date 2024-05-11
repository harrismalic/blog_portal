import { apiService } from "../Utils/api.service";
import { API_URLS } from "./apiURLs";

const register = (data) => {
  return apiService.post(API_URLS.REGISTER, data);
};

const login = (data) => {
  return apiService.post(API_URLS.LOGIN, data);
};

const getUsers = () => {
  return apiService.get(API_URLS.USERS);
};

const deleteUserById = (userId) => {
  return apiService.delete(`${API_URLS.USERS}/ ${userId}`);
};

const addUserFormData = (data) => {
  return apiService.post(API_URLS.REGISTER, data, {
    headers: {
      "Content-Type": "multipart/formData",
    },
  });
};

const getUserById = (userId) => {
  return apiService.get(`${API_URLS.USERS}/ ${userId}`);
};

const updateUserFormData = (userId, data) => {
  return apiService.put(API_URLS.UPDATE_USER.replace(":userId", userId), data, {
    headers: {
      "Content-Type": "multipart/formData",
    },
  });
};

export const UserService = {
  register,
  login,
  getUsers,
  deleteUserById,
  addUserFormData,
  getUserById,
  updateUserFormData,
};
