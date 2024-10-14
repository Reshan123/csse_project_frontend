import axios from "axios";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  accessToken?: string;
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(
      "http://localhost:8000/api/auth/signin",
      data
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};
