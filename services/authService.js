import api from "./api"; // Axios instance with withCredentials:true

export const loginUser = async (email, password) => {
  const response = await api.post("/auth/cookie/login", { email, password });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout"); 
  return response.data;
};

export const signupUser = async (name, email, password) => {
  const response = await api.post("/auth/register", { name, email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/auth/profile"); 
  return response.data;
};
