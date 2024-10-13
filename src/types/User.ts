import { MedicalRecord } from "./MedicalRecord";

export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    department?: string;
    role: string[];
}

export interface UserResponse {
  id?: string;
  username: string;
  email: string;
  medicalrecord?: MedicalRecord;
}