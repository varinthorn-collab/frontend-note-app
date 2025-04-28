import api from "./api"; // Our Axios instance withCredentials=true

// Fetch public profile by user ID
export const getPublicProfile = async (userId) => {
  const response = await api.get(`/mongo/public-profile/${userId}`);
  return response.data;
};

// Fetch public notes for a user
export const getPublicNotes = async (userId) => {
  const response = await api.get(`/mongo/public-notes/${userId}`);
  return response.data;
};
