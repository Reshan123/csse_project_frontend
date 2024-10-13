import { Calendar, Clock, User, Bell, Search, ChevronRight } from 'lucide-react';

const Home = () => {
  const upcomingAppointments = [
    { id: 1, date: '25 Sep', time: '10:00 AM', doctor: 'Dr. Smith', department: 'Cardiology' },
    { id: 2, date: '28 Sep', time: '2:30 PM', doctor: 'Dr. Johnson', department: 'Neurology' },
    { id: 3, date: '30 Sep', time: '11:15 AM', doctor: 'Dr. Williams', department: 'Orthopedics' },
  ];

  return (
    <div className="bg-teal-800 min-h-screen p-4 sm:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4 sm:mb-0">Appointment Portal</h1>
        {/* <div className="flex items-center space-x-4">
          <button className="p-2 bg-white rounded-full shadow-md">
            <Bell size={24} className="text-gray-600" />
          </button>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <User size={24} className="text-white" />
          </div>
        </div> */}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button className="flex flex-col items-center justify-center p-4 bg-teal-200 rounded-lg transition-colors hover:bg-teal-300">
                <Calendar size={32} className="text-teal-600 mb-2" />
                <span className="text-sm font-medium">Schedule Appointment</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-teal-100 rounded-lg transition-colors hover:bg-teal-200">
                <Clock size={32} className="text-teal-600 mb-2" />
                <span className="text-sm font-medium">View Upcoming</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-teal-200 rounded-lg transition-colors hover:bg-teal-300">
                <Search size={32} className="text-teal-600 mb-2" />
                <span className="text-sm font-medium">Find Doctor</span>
              </button>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-teal-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                    <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center">
                      <Calendar size={24} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-gray-600">{appointment.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between w-full sm:w-auto">
                    <div className="text-left sm:text-right">
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Calendar</h2>
            {/* Placeholder for calendar component */}
            <div className="bg-teal-100 h-64 rounded-lg flex items-center justify-center">
              <span className="text-teal-600">Calendar Component</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 sm:p-6 rounded-xl shadow-md text-white">
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <p className="mb-4">Our support team is always ready to assist you with any questions or concerns.</p>
            <button className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
