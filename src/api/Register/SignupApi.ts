import axios from "axios";
import { User } from "../../types/User";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const createUser = async (user: User) => {
  try {
    const response = await api.post("/auth/signup", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
