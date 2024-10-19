import { PaperClipIcon } from '@heroicons/react/20/solid';
import ModalWithBody from './ModalWithBody';
import React, { FC } from 'react';

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
}

const AppointmentDetails: FC<Props> = ({
  title,
  open,
  setOpen,
  appointment
}) => {
  if (!appointment) return null;

  return (
    <ModalWithBody
      open={open}
      setOpen={setOpen}
      title={title}
      bigScreenWidth={"4xl"}
    >
      <div className="overflow-hidden bg-white shadow-lg rounded-lg min-w-full sm:min-w-[600px]">
        {/* Header Section */}
        <div className="px-4 py-6 border-b bg-teal-800 sm:px-6">
          <h3 className="text-lg font-semibold text-white sm:text-2xl">
            Appointment Information
          </h3>
          <p className="mt-1 text-xs text-teal-200 sm:text-sm">
            Detailed information for the selected appointment
          </p>
        </div>

        {/* Appointment Details */}
        <div className="border-t border-gray-200 bg-white">
          <dl className="divide-y divide-gray-100">
            {/* Appointment Date */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">Appointment Date</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                {new Date(appointment.appointmentDate).toLocaleDateString()} at{" "}
                {new Date(appointment.appointmentDate).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </dd>
            </div>
            {/* Doctor Name */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">Doctor Name</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                {appointment.docName}
              </dd>
            </div>
            {/* Department */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">Department</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                {appointment.department}
              </dd>
            </div>
            {/* Reason */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">Reason</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                {appointment.reason}
              </dd>
            </div>
            {/* Status */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">Status</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                {appointment.status}
              </dd>
            </div>
            {/* Created At */}
            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-semibold text-gray-900">Created At</dt>
              <dd className="mt-1 text-sm text-gray-600 sm:col-span-2 sm:mt-0">
                {new Date(appointment.createdAt).toLocaleDateString()} at{" "}
                {new Date(appointment.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </ModalWithBody>
  );
};

export default AppointmentDetails;
