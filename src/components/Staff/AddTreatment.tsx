import React, { useState } from 'react';
import { DataType } from './RecordsTable';
import axios from 'axios';
import { useAppointments } from '../../hooks/useAppointmentHook';

interface TreatmentProps {
    record: DataType;
    onBack: () => void;
}

interface TreatmentFormData {
    patientID: string;
    aptNo: string;
    treatmentType: string;
    prescription: string;
    contactInfo: string;
}

const TreatmentsForm: React.FC<TreatmentProps> = ({ record, onBack }) => {
    const [formData, setFormData] = useState<TreatmentFormData>({
        patientID: record.patientId,
        aptNo: '',
        treatmentType: '',
        prescription: '',
        contactInfo: '',
    });

    const { appointments } = useAppointments();

    const data = appointments.filter(appointment => {

        return (appointment.patientID == record.userId)
    })

    console.log(data)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        onBack();

        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('authToken='))
            ?.split('=')[1];

        if (!token) {
            console.error('No token found');
            return null;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        console.log('Auth Token:', token);

        try {
            const response = await axios.post(`api/medicalRecords/${record.id}/addTreatment`, formData, config);
            console.log('Form submitted successfully:', response.data);
            // Optionally reset form data or display success message
        } catch (error) {
            console.error('Error submitting form:', error);
            // Optionally display error message to the user
        }
    };


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Treatment Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="patientID" className="block text-sm font-medium text-gray-700">Patient ID</label>
                    <input
                        type="text"
                        id="patientID"
                        name="patientID"
                        value={formData.patientID}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="aptNo" className="block text-sm font-medium text-gray-700">Appointment Number</label>
                    <input
                        type="text"
                        id="aptNo"
                        name="aptNo"
                        value={formData.aptNo}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="treatmentType" className="block text-sm font-medium text-gray-700">Treatment Type</label>
                    <input
                        type="text"
                        id="treatmentType"
                        name="treatmentType"
                        value={formData.treatmentType}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="prescription" className="block text-sm font-medium text-gray-700">Prescription</label>
                    <textarea
                        id="prescription"
                        name="prescription"
                        value={formData.prescription}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="contactInfo" className="block text-sm font-medium text-gray-700">Contact Info</label>
                    <input
                        type="text"
                        id="contactInfo"
                        name="contactInfo"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit Treatment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TreatmentsForm;