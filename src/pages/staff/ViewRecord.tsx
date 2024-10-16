// ViewRecord.tsx
import React, { useState } from 'react';
import type { DataType } from './RecordsTable'; // Update the import path as needed
import TreatmentsForm from './AddTreatment';


interface ViewRecordProps {
    record: DataType;
    onBack: () => void;
}

const ViewRecord: React.FC<ViewRecordProps> = ({ record, onBack }) => {
    const [isAddingTreatment, setIsAddingTreatment] = useState(false);

    const handleAddTreatment = () => {
        setIsAddingTreatment(true);
    };

    const handleBackToView = () => {
        setIsAddingTreatment(false);
    };

    return isAddingTreatment ? (
        <TreatmentsForm record={record} onBack={handleBackToView} />
    ) : (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">View Record</h2>
            <div className="space-y-4">
                <InfoItem label="Patient ID" value={record.patientId} />
                <InfoItem label="First Name" value={record.firstName} />
                <InfoItem label="Last Name" value={record.lastName} />
                <InfoItem label="Date of Birth" value={record.dateOfBirth} />
                <InfoItem label="Gender" value={record.gender} />
                <InfoItem label="Contact Number" value={record.contactNumber} />
                <InfoItem label="Address" value={record.address || 'N/A'} />
                <InfoItem label="Allergies" value={record.allergies ? record.allergies.join(', ') : 'N/A'} />
                <InfoItem label="Ongoing Medications" value={record.ongoingMedications ? record.ongoingMedications.join(', ') : 'N/A'} />
                <InfoItem label="Emergency Contact Name" value={record.emergencyContactName || 'N/A'} />
                <InfoItem label="Emergency Contact Number" value={record.emergencyContactNumber || 'N/A'} />
            </div>
            <button
                onClick={onBack}
                className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
            >
                Back
            </button>
            <button
                onClick={handleAddTreatment}
                className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
            >
                Add Treatment
            </button>
        </div>
    );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-2">
        <span className="font-semibold text-gray-700">{label}:</span>
        <span className="text-gray-600">{value}</span>
    </div>
);

export default ViewRecord;
