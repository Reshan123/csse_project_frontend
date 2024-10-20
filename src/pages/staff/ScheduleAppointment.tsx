import React, { useState } from "react";
import {
  Calendar,
  User,
  Stethoscope,
  FileText,
  Building,
  X,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Importing toast

interface ScheduleAppointmentProps {
  userId: string;
  username: string;
}

const ScheduleAppointment: React.FC<ScheduleAppointmentProps> = ({
  userId,
  username,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [appointment, setAppointment] = useState({
    patientID: userId,
    appointmentDate: "",
    patientName: username,
    docName: "",
    reason: "",
    department: "",
    status: "Pending",
  });

  const departments = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Oncology",
    "Gynecology",
    "Dermatology",
    "Ophthalmology",
    "Psychiatry",
    "General Surgery",
  ];

  const doctors = [
    "Dr. Emily Johnson",
    "Dr. Michael Chen",
    "Dr. Sarah Patel",
    "Dr. David Kim",
    "Dr. Lisa Rodriguez",
    "Dr. James Wilson",
    "Dr. Maria Garcia",
    "Dr. Robert Taylor",
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Scheduling appointment..."); // Create loading toast

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];

      if (!token) {
        toast.error("No token found. Please log in again.", {
          id: loadingToastId,
        }); // Error toast if no token
        console.error("No token found");
        return;
      }

      const response = await axios.post(
        "/api/appointments/addAppointment",
        appointment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      toast.success("Appointment scheduled successfully!", {
        id: loadingToastId,
      }); // Success toast
      setIsOpen(false); // Close the popup after successful submission
    } catch (error) {
      toast.error("Error scheduling appointment. Please try again.", {
        id: loadingToastId,
      }); // Error toast
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300 my-5"
      >
        Add Appointment
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                Schedule New Appointment
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="appointmentDate"
                    className="block mb-1 font-medium text-gray-700 flex items-center"
                  >
                    <Calendar className="mr-2 text-teal-600" size={20} />
                    Appointment Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={appointment.appointmentDate}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="patientName"
                    className="block mb-1 font-medium text-gray-700 flex items-center"
                  >
                    <User className="mr-2 text-teal-600" size={20} />
                    Patient Name
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={appointment.patientName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="block mb-1 font-medium text-gray-700 flex items-center"
                  >
                    <Building className="mr-2 text-teal-600" size={20} />
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={appointment.department}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept, index) => (
                      <option key={index} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="docName"
                    className="block mb-1 font-medium text-gray-700 flex items-center"
                  >
                    <Stethoscope className="mr-2 text-teal-600" size={20} />
                    Doctor
                  </label>
                  <select
                    id="docName"
                    name="docName"
                    value={appointment.docName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                    required
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doc, index) => (
                      <option key={index} value={doc}>
                        {doc}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="reason"
                  className="block mb-1 font-medium text-gray-700 flex items-center"
                >
                  <FileText className="mr-2 text-teal-600" size={20} />
                  Reason for Visit
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={appointment.reason}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300"
                >
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleAppointment;
