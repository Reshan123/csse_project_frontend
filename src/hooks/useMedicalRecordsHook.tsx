import { useContext } from "react";
import { MedicalRecordsContext } from "../contexts/MedicalRecordsContext"; // Adjust the path accordingly

export const useMedicalRecords = () => {
  const context = useContext(MedicalRecordsContext);
  if (context === undefined) {
    throw new Error(
      "useMedicalRecords must be used within a MedicalRecordsProvider"
    );
  }
  return context;
};
