import { Eye, Download, Trash2, Phone } from 'lucide-react';

const CompletedAppointments = () => {
  const appointments = [
    { id: '31426192', date: 'Aug 03 2024', doctorName: 'Dr.Manel Ramanayaka' },
    { id: '53672431', date: 'Aug 03 2024', doctorName: 'Dr.Manel Ramanayaka' },
    { id: '35367831', date: 'Aug 03 2024', doctorName: 'Dr.Manel Ramanayaka' },
    { id: '31426192', date: 'Aug 03 2024', doctorName: 'Dr.Manel Ramanayaka' },
    { id: '31426192', date: 'Aug 03 2024', doctorName: 'Dr.Manel Ramanayaka' },
    { id: '31426192', date: 'Aug 03 2024', doctorName: 'Dr.Manel Ramanayaka' },
    { id: '31426192', date: 'Aug 03 2024', doctorName: 'Dr.Manel Ramanayaka' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Completed Appointments</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-green-100 text-left">
              <th className="py-3 px-4 font-semibold">ID</th>
              <th className="py-3 px-4 font-semibold">Date</th>
              <th className="py-3 px-4 font-semibold">Doctor Name</th>
              <th className="py-3 px-4 font-semibold">Prescription</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-green-50' : 'bg-white'}>
                <td className="py-3 px-4">{appointment.id}</td>
                <td className="py-3 px-4">{appointment.date}</td>
                <td className="py-3 px-4">{appointment.doctorName}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="text-red-500 font-medium flex items-center">
                      PDF <Eye size={18} className="ml-1" />
                    </button>
                    <Download size={18} className="text-gray-600 cursor-pointer" />
                    <Trash2 size={18} className="text-gray-600 cursor-pointer" />
                    <Phone size={18} className="text-gray-600 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedAppointments;