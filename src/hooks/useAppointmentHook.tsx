import { useContext } from "react";
import { AppointmentsContext } from "../contexts/AppointmentContext"; // Adjust the path accordingly

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (context === undefined) {
    throw new Error(
      "useAppointments must be used within a AppointmentsProvider"
    );
  }
  return context;
};
