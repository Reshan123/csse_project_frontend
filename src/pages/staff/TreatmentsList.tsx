import React from 'react';

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex justify-between py-2">
        <span className="font-semibold">{label}:</span>
        <span className="text-gray-700">{value}</span>
    </div>
);

interface TreatmentsListProps {
    treatments: Array<any>;
    onBack: () => void; // Update to allow any function signature
}

const TreatmentsList: React.FC<TreatmentsListProps> = ({ treatments, onBack }) => {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Treatments</h2>
            <div className="space-y-4">
                {treatments.map((treatment, index) => (
                    <div key={index} className="border-b border-gray-200 pb-2">
                        <InfoItem label="Patient ID" value={treatment.patientID} />
                        <InfoItem label="Appointment No" value={treatment.aptNo} />
                        <InfoItem label="Treatment Type" value={treatment.treatmentType} />
                        <InfoItem label="Prescription" value={treatment.prescription} />
                        <InfoItem label="Contact Info" value={treatment.contactInfo} />
                    </div>
                ))}
            </div>
            <button
                onClick={() => onBack()} // Call onBack when the button is clicked
                className="mt-4 px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors duration-200"
            >
                Back
            </button>
        </div>
    );
};

export default TreatmentsList;
