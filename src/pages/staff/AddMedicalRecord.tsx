import React, { useState } from 'react';
import axios from 'axios';

import { MedicalRecord } from '../../types/MedicalRecord';

const MedicalRecordForm: React.FC = () => {
  const [formData, setFormData] = useState<MedicalRecord>({
    patientId: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    address: '',
    allergies: [],
    ongoingMedications: [],
    emergencyContactName: '',
    emergencyContactNumber: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'allergies' | 'ongoingMedications') => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData({ ...formData, [field]: values });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/medicalRecords/addRecord', formData);
      console.log('Form submitted successfully:', response.data);
      // You can also handle further actions like resetting the form or displaying a success message
    } catch (error) {
      console.error('Error submitting form:', error);
     console.log(error)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Medical Record Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient ID</label>
          <input
            type="text"
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        ></textarea>
      </div>

      <div className="mt-4">
        <label htmlFor="allergies" className="block text-sm font-medium text-gray-700">Allergies (comma-separated)</label>
        <textarea
          id="allergies"
          name="allergies"
          value={formData.allergies.join(', ')}
          onChange={(e) => handleArrayInputChange(e, 'allergies')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      <div className="mt-4">
        <label htmlFor="ongoingMedications" className="block text-sm font-medium text-gray-700">Ongoing Medications (comma-separated)</label>
        <textarea
          id="ongoingMedications"
          name="ongoingMedications"
          value={formData.ongoingMedications.join(', ')}
          onChange={(e) => handleArrayInputChange(e, 'ongoingMedications')}
          rows={2}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label htmlFor="emergencyContactName" className="block text-sm font-medium text-gray-700">Emergency Contact Name</label>
          <input
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Submit Medical Record
        </button>
      </div>
    </form>
  );
};

export default MedicalRecordForm;