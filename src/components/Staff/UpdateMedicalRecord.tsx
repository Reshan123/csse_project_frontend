import React, { useState, useEffect } from 'react';
import type { DataType } from './RecordsTable'; // Update the path as needed
import axios from 'axios';
import { getAuthToken } from '../../api/Register/LoginApi';

interface UpdateRecordProps {
    record: DataType;
    onBack: () => void;
}

interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    dateOfBirth?: string;
    gender?: string;
    contactNumber?: string;
    address?: string;
    allergies?: string;
    ongoingMedications?: string;
    emergencyContactName?: string;
    emergencyContactNumber?: string;
}

const UpdateRecord: React.FC<UpdateRecordProps> = ({ record, onBack }) => {
    const [formData, setFormData] = useState({
        ...record,
        allergies: record.allergies || [],
        ongoingMedications: record.ongoingMedications || [],
        address: record.address || ''
    });
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        const newErrors: ValidationErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        }

        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = "Contact number is required";
        } else if (!/^\d{10}$/.test(formData.contactNumber)) {
            newErrors.contactNumber = "Contact number should be a 10-digit number";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        if (formData.emergencyContactNumber && !/^\d{10}$/.test(formData.emergencyContactNumber)) {
            newErrors.emergencyContactNumber = "Emergency contact number should be a 10-digit number";
        }

        setErrors(newErrors);
        setIsFormValid(Object.keys(newErrors).length === 0);
    };

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'allergies' || name === 'ongoingMedications') {
            const values = value.split(',').map(item => item.trim());
            setFormData(prev => ({ ...prev, [name]: values }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        // Add confirmation dialog
        const confirmed = window.confirm('Are you sure you want to update this record?');
        if (!confirmed) return; // Exit if the user cancels

        console.log('Updated Record:', formData);

        try {
            const formattedDateOfBirth = formData.dateOfBirth.split('T')[0];

            const dataToSubmit = {
                ...formData,
                dateOfBirth: formattedDateOfBirth,
            };

            const token = getAuthToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };

            const response = await axios.put(`/api/medicalRecords/updateRecord/${record.id}`, dataToSubmit, config);
            console.log(response);
            onBack();
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };


    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Record</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient ID</label>
                    <input
                        type="text"
                        id="patientId"
                        name="patientId"
                        value={formData.patientId}
                        disabled
                        className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className={`mt-1 block w-full px-3 py-2 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className={`mt-1 block w-full px-3 py-2 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth?.split('T')[0] || ''}
                            onChange={handleInputChange}
                            required
                            className={`mt-1 block w-full px-3 py-2 border ${errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>}
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            required
                            className={`mt-1 block w-full px-3 py-2 border ${errors.gender ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        >
                            <option value="" disabled>Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                        className={`mt-1 block w-full px-3 py-2 border ${errors.contactNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    {errors.contactNumber && <p className="mt-1 text-sm text-red-500">{errors.contactNumber}</p>}
                </div>
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className={`mt-1 block w-full px-3 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                <div>
                    <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies</label>
                    <textarea
                        id="allergies"
                        name="allergies"
                        value={formData.allergies.join(', ')}
                        onChange={handleInputChange}
                        placeholder="Comma-separated list of allergies"
                        rows={2}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="ongoingMedications" className="block text-sm font-medium text-gray-700">Ongoing Medications</label>
                    <textarea
                        id="ongoingMedications"
                        name="ongoingMedications"
                        value={formData.ongoingMedications.join(', ')}
                        onChange={handleInputChange}
                        placeholder="Comma-separated list of medications"
                        rows={2}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                        <input
                            type="text"
                            id="emergencyContactName"
                            name="emergencyContactName"
                            value={formData.emergencyContactName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="emergencyContactNumber" className="block text-sm font-medium text-gray-700">Emergency Contact Number</label>
                        <input
                            type="tel"
                            id="emergencyContactNumber"
                            name="emergencyContactNumber"
                            value={formData.emergencyContactNumber}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full px-3 py-2 border ${errors.emergencyContactNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                        />
                        {errors.emergencyContactNumber && <p className="mt-1 text-sm text-red-500">{errors.emergencyContactNumber}</p>}
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                        disabled={!isFormValid}
                    >
                        Update Record
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={onBack}
                        className="w-full flex justify-center py-2 px-4 mt-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateRecord;