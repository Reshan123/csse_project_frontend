import axios from "axios";
import { User } from "../../types/User";

export const getUsers = async (
  token: string
): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(
      `http://localhost:8000/api/user/all`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};
