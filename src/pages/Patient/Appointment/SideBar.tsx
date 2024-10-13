import { Calendar, CheckCircle } from 'lucide-react';

const SideBar = () => {
  return (
    <div className="w-1/4 h-screen p-8 bg-green-200 shadow-md flex flex-col justify-center items-center">
      <h2 className="text-xl font-bold mb-4">Appointment Dashboard</h2>
      
      <button className="flex items-center mb-2 p-4 hover:bg-white rounded-xl transition-colors"
        onClick={() => window.location.href = '/patient/appointment/scheduled'}
      >
        <Calendar className="mr-2" size={20} />
        <span>Scheduled Appointments</span>
      </button>
      
      <button className="flex items-center mb-2 p-4 hover:bg-white rounded-xl transition-colors">
        <CheckCircle className="mr-2" size={20} />
        <span>Completed Appointments</span>
      </button>
      
      <div className="flex-grow"></div>
    </div>
  );
};

export default SideBar;
