export interface Appointment {
    id?: string;
    aptNo: string;
    appointmentDate: string;
    patientID: string;
    patientName: string;
    docID: string;
    docName: string;
    reason: string;
    department: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}