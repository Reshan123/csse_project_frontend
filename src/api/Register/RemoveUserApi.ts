import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const removeUser = async (userId:string) => {
  try {
    const response = await api.delete(`/auth/delete/${userId}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
