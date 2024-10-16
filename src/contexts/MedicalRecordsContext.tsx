
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { getAuthToken } from '../api/Register/LoginApi';

interface MedicalRecordsContextType {
  data: any[]; 
  loading: boolean;
}

export const MedicalRecordsContext = createContext<MedicalRecordsContextType | undefined>(undefined);

export const MedicalRecordsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = getAuthToken();
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('/api/medicalRecords/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <MedicalRecordsContext.Provider value={{ data, loading }}>
      {children}
    </MedicalRecordsContext.Provider>
  );
};
