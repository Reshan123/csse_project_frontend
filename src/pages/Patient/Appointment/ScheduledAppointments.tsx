import { ChevronRight } from 'lucide-react';

const AppointmentMainContent = () => {
  const appointments = [
    { date: '25 Sep 2024', doctor: 'Dr.Krishantha' },
    { date: '25 Sep 2024', doctor: 'Dr.Krishantha' },
    { date: '25 Sep 2024', doctor: 'Dr.Krishantha' },
  ];

  return (
    <div className='flex-1 p-5'>
      <div className="flex space-x-4 mb-4">
        {appointments.map((apt, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-md flex-1">
            <p>My next appointment</p>
            <p className="font-bold">{apt.date}</p>
            <p>{apt.doctor}</p>
            <ChevronRight className="mt-2" />
          </div>
        ))}
      </div>

      <button className="w-full py-2 bg-green-300 rounded-lg mb-4 hover:bg-green-400 transition-colors">
        Schedule new Appointment
      </button>
    </div>
  );
};

export default AppointmentMainContent;