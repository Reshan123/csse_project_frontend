import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { getAuthToken } from '../api/Register/LoginApi';

interface Appointment {
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

interface AppointmentsContextType {
  appointments: any[];
  loading: boolean;
}

export const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export const AppointmentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const token = getAuthToken();
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('/api/appointments/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <AppointmentsContext.Provider value={{ appointments, loading }}>
      {children}
    </AppointmentsContext.Provider>
  );
};
