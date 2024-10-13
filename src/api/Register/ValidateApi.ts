import axios from "axios";

interface ValidateResponse {
valid: boolean;
}

export const validateUser = async (userId:string): Promise<ValidateResponse> => {
  try {
    const response = await axios.get<ValidateResponse>(
      `http://localhost:8000/api/auth/validate/${userId}`,
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};
