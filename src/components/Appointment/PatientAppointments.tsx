import { Calendar, ChevronRight } from "lucide-react";
import { Appointment } from "../../types/Appointment";

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
}

const PatientAppointments = ({
  appointments,
  onAppointmentClick,
}: UpcomingAppointmentsProps) => {
  
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Patient Appointments</h2>
      <div className="space-y-4">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-teal-50 p-4 rounded-lg hover:cursor-pointer"
              onClick={() => onAppointmentClick(appointment)}
            >
              <div className="flex items-center space-x-4 mb-2 sm:mb-0">
                <div className="w-12 h-12 bg-teal-200 rounded-full flex items-center justify-center">
                  <Calendar size={24} className="text-teal-600" />
                </div>
                <div>
                  <p className="font-medium">Dr. {appointment.docName}</p>
                  <p className="text-sm text-gray-600">
                    {appointment.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full sm:w-auto">
                <div className="text-left sm:text-right">
                  <p className="font-medium">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(appointment.appointmentDate).toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>
                <ChevronRight size={20} className="text-gray-400 ml-4" />
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center bg-teal-50 p-4 rounded-lg">
            <p className="text-teal-600 font-medium">No Upcoming Appointments</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientAppointments;