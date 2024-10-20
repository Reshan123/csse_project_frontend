import React, { useEffect, useState } from 'react';
import { Calendar, User, Stethoscope, FileText, Building } from 'lucide-react';
import axios from 'axios';
import { getUserIdFromJwtCookie } from '../../../util/jwtDecode';
import { User as Doctor } from '../../../types/User';
import { getAllDoctors } from '../../../api/User/GetDoctors';

console.log("Token", getUserIdFromJwtCookie());

const ScheduleForm = () => {

  const [doctor, setDoctor] = useState<Doctor[]>();
  const [loading, setLoading] = useState<boolean>(false);

  console.log("Doctor", doctor);

  useEffect(() => {
    // id == undefined && setUserId(id);
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("authToken="))
          ?.split("=")[1];

        if (!token) {
          console.error("No token found");
          return;
        }

        const doctor = await getAllDoctors(token);
        setDoctor(doctor);
        setLoading(false);
        return true;
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    
    fetchDoctors();
  }, []);

  const [appointment, setAppointment] = useState({
    patientID: getUserIdFromJwtCookie()?.id,
    appointmentDate: '',
    patientName: '',
    docName: '',
    reason: '',
    department: '',
    status: 'Pending',
  });

  const departments = [
    'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology',
    'Gynecology', 'Dermatology', 'Ophthalmology', 'Psychiatry', 'General Surgery'
  ];

  const doctors = [
    'Dr. Emily Johnson', 'Dr. Michael Chen', 'Dr. Sarah Patel', 'Dr. David Kim',
    'Dr. Lisa Rodriguez', 'Dr. James Wilson', 'Dr. Maria Garcia', 'Dr. Robert Taylor'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('authToken='))
          ?.split('=')[1];

        if (!token) {
          console.error('No token found');
          return;
        }
  
      const response = await axios.post(
        '/api/appointments/addAppointment', appointment,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
      console.log('Form submitted successfully:', response.data);
     
    } catch (error) {
      console.error('Error submitting form', error);
      console.log(error);
    }
  };

  return (
    <div className="bg-teal-800 min-h-screen p-5 sm:p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg mt-5 w-full max-w-full">
        <div className="flex flex-col md:flex-row items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center md:text-left text-gray-800">Schedule New Appointment</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="appointmentDate" className="block mb-2 font-medium text-gray-700 flex items-center">
                <Calendar className="mr-2 text-teal-600" size={20} />
                Appointment Date & Time
              </label>
              <input
                type="datetime-local"
                id="appointmentDate"
                name="appointmentDate"
                value={appointment.appointmentDate}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="patientName" className="block mb-2 font-medium text-gray-700 flex items-center">
                <User className="mr-2 text-teal-600" size={20} />
                Patient Name
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={appointment.patientName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label htmlFor="department" className="block mb-2 font-medium text-gray-700 flex items-center">
                <Building className="mr-2 text-teal-600" size={20} />
                Department
              </label>
              <select
                id="department"
                name="department"
                value={appointment.department}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="doctor" className="block mb-2 font-medium text-gray-700 flex items-center">
                <Stethoscope className="mr-2 text-teal-600" size={20} />
                Doctor
              </label>
              <select
                id="docName"
                name="docName"
                value={appointment.docName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doc, index) => (
                  <option key={index} value={doc}>{doc}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="reason" className="block mb-2 font-medium text-gray-700 flex items-center">
              <FileText className="mr-2 text-teal-600" size={20} />
              Reason for Visit
            </label>
            <textarea
              id="reason"
              name="reason"
              value={appointment.reason}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300"
              rows={4}
              required
            ></textarea>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
            <button type="button" className="w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300">
              Cancel
            </button>
            <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-300">
              Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleForm;
