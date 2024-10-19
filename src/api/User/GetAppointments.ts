import axios from "axios";


export const getAppointments = async (
  userId: string,
  token: string
): Promise<any> => {
  try {
     const response = await axios.get(`/api/appointments/getpatient/${userId}`, {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Something went wrong");
    }
    throw new Error("Network error");
  }
};