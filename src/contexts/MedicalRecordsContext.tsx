import React, { createContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast'; // Import react-hot-toast
import { getAuthToken } from '../api/Register/LoginApi';

interface MedicalRecordsContextType {
  data: any[];
  loading: boolean;
  addMedicalRecord: (record: any) => Promise<void>;
  deleteMedicalRecord: (record: any) => void; // Updated to void since deletion now happens through the modal confirmation
}

export const MedicalRecordsContext = createContext<MedicalRecordsContextType | undefined>(undefined);

export const MedicalRecordsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [recordToDelete, setRecordToDelete] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = getAuthToken();
        if (!token) {
          return;
        }

        const response = await axios.get('/api/medicalRecords/getAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error) {
        toast.error('Error fetching data'); // Show error toast
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
        toast.error('No token found'); // Show error toast
        return;
      }

      const response = await axios.post('/api/medicalRecords/addRecord', record, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the data state with the newly added record
      setData([...data, response.data]);
      toast.success('Medical record added successfully'); // Show success toast
    } catch (error) {
      toast.error('Error adding medical record'); // Show error toast
      console.error('Error adding medical record:', error);
    }
  };

  const deleteMedicalRecord = (record: any) => {
    // Set the record to be deleted and open the modal
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!recordToDelete || !recordToDelete.id) {
      toast.error('Record ID is missing'); // Show error toast
      setIsDeleteModalOpen(false);
      return;
    }

    const token = getAuthToken();
    try {
      await axios.delete(`/api/medicalRecords/delete/${recordToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      setData(data.filter((item) => item.id !== recordToDelete.id));
      toast.success('Medical record deleted successfully');
    } catch (error) {
      toast.error('Error deleting the record');
      console.error('Error deleting the record:', error);
    } finally {

      setIsDeleteModalOpen(false);
      setRecordToDelete(null);
    }
  };

  return (
    <MedicalRecordsContext.Provider value={{ data, loading, addMedicalRecord, deleteMedicalRecord }}>
      {children}
      <Toaster /> {/* Add Toaster component to render toast messages */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full mt-12">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="mb-4">
              Are you sure you want to delete the medical record for {recordToDelete?.patientName || 'this patient'}?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </MedicalRecordsContext.Provider>
  );
};
