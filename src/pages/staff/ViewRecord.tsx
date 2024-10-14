import React, { useEffect, useState } from 'react';
import type { DataType } from '../../components/Staff/RecordsTable'; // Update the import path as needed
import TreatmentsForm from '../../components/Staff/AddTreatment';
import UpdateRecord from '../../components/Staff/UpdateMedicalRecord';
import { getAuthToken } from '../../api/Register/LoginApi';
import axios from 'axios';
import TreatmentsList from './TreatmentsList';

interface ViewRecordProps {
    record: DataType;
    onBack: () => void;
}

const ViewRecord: React.FC<ViewRecordProps> = ({ record, onBack }) => {
    const [isAddingTreatment, setIsAddingTreatment] = useState(false);
    const [isUpdatingRecord, setIsUpdatingRecord] = useState(false);
    const [isViewingTreatments, setIsViewingTreatments] = useState(false);

    const [refreshKey, setRefreshKey] = useState(0);
    const [data, setRecord] = useState<DataType | null>(null);

    const token = getAuthToken();
    if (!token) {
        console.error('No token found');
        return;
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(`/api/medicalRecords/getById/${record.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Record fetched:', response.data);
            setRecord(response.data);
        } catch (error) {
            console.error('Error fetching record:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refreshKey]);

    useEffect(() => {
        console.log('ViewRecord mounted', record);
        return () => {
            console.log('ViewRecord unmounted');
        };
    }, [record, refreshKey]);

    const handleUpdate = () => {
        setIsUpdatingRecord(true);
    };

    const handleAddTreatment = () => {
        setIsAddingTreatment(true);
    };

    const handleBackToView = () => {
        setIsAddingTreatment(false);
        setIsUpdatingRecord(false);
        setIsViewingTreatments(false);
        setRefreshKey(prevKey => prevKey + 1);
    };


    const formattedDateOfBirth = data?.dateOfBirth ? data.dateOfBirth.split('T')[0] : 'N/A';

    if (isAddingTreatment) {
        return <TreatmentsForm record={record} onBack={handleBackToView} />;
    }

    if (isUpdatingRecord) {
        return <UpdateRecord record={record} onBack={handleBackToView} />;
    }

    const handleViewTreatments = () => {
        setIsViewingTreatments(true);
    };

    if (isViewingTreatments) {
        return <TreatmentsList treatments={data?.treatments || []} onBack={handleBackToView} />;
    }

    return (
        <div key={refreshKey} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">View Record</h2>
            <div className="space-y-4">
                <InfoItem label="Patient ID" value={data?.patientId || 'NA'} />
                <InfoItem label="First Name" value={data?.firstName || 'NA'} />
                <InfoItem label="Last Name" value={data?.lastName || 'NA'} />
                <InfoItem label="Date of Birth" value={formattedDateOfBirth} />
                <InfoItem label="Gender" value={data?.gender || 'NA'} />
                <InfoItem label="Contact Number" value={data?.contactNumber || 'NA'} />
                <InfoItem label="Address" value={data?.address || 'N/A'} />
                <InfoItem label="Allergies" value={data?.allergies ? data?.allergies.join(', ') : 'N/A'} />
                <InfoItem label="Ongoing Medications" value={data?.ongoingMedications ? data?.ongoingMedications.join(', ') : 'N/A'} />
                <InfoItem label="Emergency Contact Name" value={data?.emergencyContactName || 'N/A'} />
                <InfoItem label="Emergency Contact Number" value={data?.emergencyContactNumber || 'N/A'} />
            </div>
            <div className="mt-6 space-x-4">
                <button
                    onClick={onBack}
                    className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-200"
                >
                    Back
                </button>
                <button
                    onClick={handleAddTreatment}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
                >
                    Add Treatment
                </button>
                <button
                    onClick={handleUpdate}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 transition-colors duration-200"
                >
                    Update Record
                </button>
                <button
                    onClick={handleViewTreatments}
                    className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-colors duration-200"
                >
                    View Treatments
                </button>
            </div>
        </div>
    );
}


const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-2">
        <span className="font-semibold text-gray-700">{label}:</span>
        <span className="text-gray-600">{value}</span>
    </div>
);

export default ViewRecord;
