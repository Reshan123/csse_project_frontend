import axios from "axios";
import { User } from "../../types/User";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const updateUser = async (user: User,userId:string) => {
  try {
    const response = await api.put(`/auth/updatepatient/${userId}`, user);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
