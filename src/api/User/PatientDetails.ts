import axios from "axios";

interface ValidateResponse {
  valid: boolean;
}

export const getPatientDetails = async (
    userId: string,
    token: string
): Promise<any> => {
  try {
    const response = await axios.get<any>(
      `http://localhost:8000/api/user/patientdetails/${userId}`,
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
