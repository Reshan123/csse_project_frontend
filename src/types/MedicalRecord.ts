export interface MedicalRecord {
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
  }