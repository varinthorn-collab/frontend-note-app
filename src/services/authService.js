import api from "./api"; // Axios instance with withCredentials:true

export const loginUser = async (credentials) => {
  const response = await api.post("/mongo/auth/login", credentials); 
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/mongo/auth/logout");
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await api.post("/mongo/auth/register", userData, {
    headers: {
      'Content-Type': 'application/json', // Ensure this header is set if needed
    },
 });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/mongo/auth/profile");
  return response.data;
};
