export interface MedicalRecord {
  userId: string | null
  id?: string;
  patientId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
  address: string;
  allergies: string[];
  ongoingMedications: string[];
  emergencyContactName: string;
  emergencyContactNumber: string;
  treatments?: Treatment[];
}


interface Treatment {

  id: string;
  patientID: string;
  aptNo: string;
  treatmentType: string;
  prescription: string;
  contactInfo: string;
}