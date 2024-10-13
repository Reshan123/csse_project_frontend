import axios from "axios";
import { User } from "../../types/User";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const patientRegister = async (user: User) => {
  try {
    const response = await api.post("/auth/addpatient", user);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
