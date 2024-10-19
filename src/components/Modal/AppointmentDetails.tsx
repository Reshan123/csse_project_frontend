import React, { FC, useState, useEffect } from 'react';
import { PencilIcon } from 'lucide-react';
import ModalWithBody from './ModalWithBody';
import axios from 'axios';
import { getAuthToken } from '../../api/Register/LoginApi';

interface Appointment {
  aptNo: string;
  appointmentDate: string;
  docName: string;
  department: string;
  patientName: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  appointment: Appointment | null;
  onUpdate: (updatedAppointment: Appointment) => void;
}

const departments = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology',
  'Gynecology', 'Dermatology', 'Ophthalmology', 'Psychiatry', 'General Surgery'
];

const doctors = [
  'Dr. Emily Johnson', 'Dr. Michael Chen', 'Dr. Sarah Patel', 'Dr. David Kim',
  'Dr. Lisa Rodriguez', 'Dr. James Wilson', 'Dr. Maria Garcia', 'Dr. Robert Taylor'
];

const AppointmentDetails: FC<Props> = ({
  title,
  open,
  setOpen,
  appointment,
  onUpdate
}) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedAppointment, setUpdatedAppointment] = useState<Appointment | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(appointment);

  useEffect(() => {
    setCurrentAppointment(appointment);
  }, [appointment]);

  if (!currentAppointment && !appointment) return null;

  const handleUpdateClick = () => {
    setUpdatedAppointment(currentAppointment ? { ...currentAppointment } : { ...appointment! });
    setIsUpdateModalOpen(true);
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (updatedAppointment) {
      setUpdatedAppointment({
        ...updatedAppointment,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleUpdate = async () => {
    if (updatedAppointment) {
      setIsUpdating(true);
      setUpdateError(null);
      try {
        const token = getAuthToken()
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.put(
          `/api/appointments/updateAppointment/${updatedAppointment.aptNo}`,
          updatedAppointment,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCurrentAppointment(response.data);
        onUpdate(response.data);
        setIsUpdateModalOpen(false);
        setOpen(true);
      } catch (error) {
        console.error('Error updating appointment:', error);
        setUpdateError('Failed to update appointment. Please try again.');
      } finally {
        setIsUpdating(false);
        window.location.reload();
      }
    }
  };

  const displayAppointment = currentAppointment || appointment;

  const isPending = displayAppointment?.status.toLowerCase() === 'pending';

  return (
    <>
      <ModalWithBody
        open={open}
        setOpen={setOpen}
        title={title}
        bigScreenWidth="4xl"
      >
        <div className="overflow-hidden bg-white shadow-lg rounded-lg w-full max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="px-4 py-6 border-b bg-teal-800 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg font-semibold text-white sm:text-2xl">
                  Appointment Information
                </h3>
                <p className="mt-1 text-xs text-teal-200 sm:text-sm">
                  Detailed information for the selected appointment
                </p>
              </div>
              {isPending && (
                <button
                  onClick={handleUpdateClick}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 md:ml-5 rounded-md flex items-center transition duration-150 ease-in-out"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Update
                </button>
              )}
            </div>
          </div>

          {/* Appointment Details */}
          <div className="border-t border-gray-200 bg-white">
            <dl className="divide-y divide-gray-100">
              {/* Appointment Date */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Appointment Date</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {new Date(displayAppointment!.appointmentDate).toLocaleDateString()} at{" "}
                  {new Date(displayAppointment!.appointmentDate).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </dd>
              </div>
              {/* Doctor Name */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Doctor Name</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {displayAppointment!.docName}
                </dd>
              </div>
              {/* Department */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Department</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {displayAppointment!.department}
                </dd>
              </div>
              {/* Reason */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Reason</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 break-words">
                  {displayAppointment!.reason}
                </dd>
              </div>
              {/* Status */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Status</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {displayAppointment!.status}
                </dd>
              </div>
              {/* Created At */}
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Created At</dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                  {new Date(displayAppointment!.createdAt).toLocaleDateString()} at{" "}
                  {new Date(displayAppointment!.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </ModalWithBody>

      {/* Update Modal */}
      <ModalWithBody
        open={isUpdateModalOpen}
        setOpen={setIsUpdateModalOpen}
        title=""
        bigScreenWidth="2xl"
      >
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-teal-800 sm:text-xl">
              Edit Appointment Details
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Please update the appointment information below.
            </p>
          </div>
          {updateError && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {updateError}
            </div>
          )}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">
                  Appointment Date
                </label>
                <div className="mt-1">
                  <input
                    type="datetime-local"
                    name="appointmentDate"
                    id="appointmentDate"
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={updatedAppointment?.appointmentDate.slice(0, 16)}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="docName" className="block text-sm font-medium text-gray-700">
                  Doctor Name
                </label>
                <div className="mt-1">
                  <select
                    name="docName"
                    id="docName"
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={updatedAppointment?.docName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc, index) => (
                      <option key={index} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <div className="mt-1">
                  <select
                    name="department"
                    id="department"
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={updatedAppointment?.department}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                  Reason
                </label>
                <div className="mt-1">
                  <textarea
                    id="reason"
                    name="reason"
                    rows={3}
                    className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    value={updatedAppointment?.reason}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
            <button
              onClick={() => 
                {
                  setIsUpdateModalOpen(false)
                  setOpen(true)
                }
              }
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              disabled={isUpdating}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Update Appointment'}
            </button>
          </div>
        </div>
      </ModalWithBody>
    </>
  );
};

export default AppointmentDetails;