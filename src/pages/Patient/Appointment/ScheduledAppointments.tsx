import { useState } from 'react';
import { ChevronRight, Calendar, History } from 'lucide-react';

const AppointmentMainContent = () => {
  const [date, setDate] = useState(new Date());

  const appointments = [
    { id: 1, date: new Date(2024, 8, 25, 10, 0), doctor: 'Dr. Krishantha', department: 'Cardiology' },
    { id: 2, date: new Date(2024, 8, 28, 14, 30), doctor: 'Dr. Smith', department: 'Neurology' },
    { id: 3, date: new Date(2024, 9, 5, 11, 15), doctor: 'Dr. Johnson', department: 'Orthopedics' },
  ];

  // const upcomingAppointments = appointments.filter(apt => apt.date > new Date());

  return (
    <div className="bg-teal-800 flex flex-col lg:flex-row gap-6 p-6">
      {/* Left section with upcoming appointments and appointment history */}
      <div className="lg:w-2/3 space-y-6">
        {/* Upcoming Appointments Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-700">Upcoming Appointments</h2>
            <p className="text-sm text-gray-500">Manage your scheduled appointments</p>
          </div>
          <div className="p-4">
            {appointments.length > 0 ? (
              appointments.map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-semibold text-gray-800">{apt.doctor}</p>
                    <p className="text-sm text-gray-500">{apt.department}</p>
                    <p className="text-sm text-gray-600">
                      {apt.date.toLocaleDateString()} at {apt.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              ))
            ) : (
              <p className="text-center py-4 text-gray-500">No upcoming appointments</p>
            )}
          </div>
          <div className="p-4 border-t">
            <button
              className="w-full py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors"
              onClick={() => window.location.href = '/patient/appointment/schedule/form'}
            >
              Schedule New Appointment
            </button>
          </div>
        </div>

        {/* Appointment History Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-2">
              <History className="text-gray-600" />
              <h2 className="text-2xl font-semibold text-gray-700">Appointment History</h2>
            </div>
            <p className="text-sm text-gray-500">View your past appointments</p>
          </div>
          <div className="p-4">
            <p className="text-center py-4 text-gray-500">No past appointments to display</p>
          </div>
        </div>
      </div>

      {/* Right section with appointment calendar */}
      <div className="lg:w-1/3 space-y-6">
        {/* Appointment Calendar */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-2">
              <Calendar className="text-gray-600" />
              <h2 className="text-2xl font-semibold text-gray-700">Appointment Calendar</h2>
            </div>
            <p className="text-sm text-gray-500">View your scheduled appointments</p>
          </div>
          <div className="p-4">
            {/* Add your calendar component or calendar display logic here */}
            <p className="text-center py-4 text-gray-500">Calendar feature coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentMainContent;
