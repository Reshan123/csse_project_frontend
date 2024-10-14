import axios from "axios";


export const removeAppointment = async (
  aptNo: string,
  token: string
): Promise<any> => {
  try {
     const response = await axios.get(
       `http://localhost:8000/api/appointments/delete/${aptNo}`,
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