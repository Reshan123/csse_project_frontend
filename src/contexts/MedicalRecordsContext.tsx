import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { getAuthToken } from '../api/Register/LoginApi';

interface MedicalRecordsContextType {
  data: any[];
  loading: boolean;
  addMedicalRecord: (record: any) => Promise<void>;
  deleteMedicalRecord: (record: any) => Promise<void>; // Add a function to delete a medical record
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

  const addMedicalRecord = async (record: any) => {
    try {
      const token = getAuthToken();
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await axios.post('/api/medicalRecords/addRecord', record, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the data state with the newly added record
      setData([...data, response.data]);
      console.log('Medical record added successfully:', response.data);
    } catch (error) {
      console.error('Error adding medical record:', error);
    }
  };

  const deleteMedicalRecord = async (record: any) => {
    if (!record.id) {
      console.error('Record ID is missing');
      return;
    }

    const token = getAuthToken();
    try {
      const response = await axios.delete(`/api/medicalRecords/delete/${record.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the data state by filtering out the deleted record
      setData(data.filter((item) => item.id !== record.id));
      console.log('Medical record deleted successfully:', response);
    } catch (error) {
      console.error('Error deleting the record:', error);
    }
  };

  return (
    <MedicalRecordsContext.Provider value={{ data, loading, addMedicalRecord, deleteMedicalRecord }}>
      {children}
    </MedicalRecordsContext.Provider>
  );
};
