import { MedicalRecord } from "./MedicalRecord";

export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    department?: string;
  role: string[];
  link?: string;
}

export interface UserResponse {
  link?: string;
  id?: string;
  username: string;
  email: string;
  medicalrecord?: MedicalRecord;
}