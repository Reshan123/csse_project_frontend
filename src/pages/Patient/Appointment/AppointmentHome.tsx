import { Calendar, Clock, Search, ChevronRight } from "lucide-react";
import { useAppointments } from "../../../hooks/useAppointmentHook";
import AppointmentDetails from "../../../components/Modal/AppointmentDetails";
import { useEffect, useState } from "react";
import UpcomingAppointments from "../../../components/Appointment/UpcomingAppointments";
import { Appointment } from "../../../types/Appointment";
import { getUserIdFromJwtCookie } from "../../../util/jwtDecode";
import { getAppointments } from "../../../api/User/GetAppointments";

const Home = () => {

  const [appointmentDetailsModalOpen, setAppointmentDetailsModalOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const openAppointmentDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setAppointmentDetailsModalOpen(true);
  };

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const id = getUserIdFromJwtCookie()?.id;
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async (userId: string) => {
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

        const appointments = await getAppointments(userId, token);
        setAppointments(appointments);
        setLoading(false);
        return true;
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  // Filter upcoming appointments
  // const upcomingAppointments = appointments.filter(
  //   (apt) => new Date(apt.appointmentDate) > new Date()
  // );

  return (
    <main>
      <AppointmentDetails
        title=""
        open={appointmentDetailsModalOpen}
        setOpen={setAppointmentDetailsModalOpen}
        appointment={selectedAppointment}
        onUpdate={() => {}}
      />
      <div className="bg-teal-800 min-h-screen p-4 sm:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-4 sm:mb-0">
            Appointment Portal
          </h1>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  className="flex flex-col items-center justify-center p-4 bg-teal-200 rounded-lg transition-colors hover:bg-teal-300"
                  onClick={() =>
                    (window.location.href = "/patient/appointment/schedule/form")
                  }
                >
                  <Calendar size={32} className="text-teal-600 mb-2" />
                  <span className="text-sm font-medium">
                    Schedule Appointment
                  </span>
                </button>
                <button
                  className="flex flex-col items-center justify-center p-4 bg-teal-100 rounded-lg transition-colors hover:bg-teal-200"
                  onClick={() =>
                    (window.location.href = "/patient/appointment/scheduled")
                  }
                >
                  <Clock size={32} className="text-teal-600 mb-2" />
                  <span className="text-sm font-medium">View Appointments</span>
                </button>
                {/* <button className="flex flex-col items-center justify-center p-4 bg-teal-200 rounded-lg transition-colors hover:bg-teal-300">
                  <Search size={32} className="text-teal-600 mb-2" />
                  <span className="text-sm font-medium">Find Doctor</span>
                </button> */}
              </div>
            </div>

            <UpcomingAppointments appointments={appointments} onAppointmentClick={openAppointmentDetails} />
          </div>

          <div className="space-y-8">
            {/* <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-semibold mb-4">Calendar</h2>
              <div className="bg-teal-100 h-64 rounded-lg flex items-center justify-center">
                <span className="text-teal-600">Calendar Component</span>
              </div>
            </div> */}

            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4 sm:p-6 rounded-xl shadow-md text-white">
              <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
              <p className="mb-4">
                Our support team is always ready to assist you with any questions
                or concerns.
              </p>
              <button className="bg-white text-teal-600 px-4 py-2 rounded-lg font-medium hover:bg-teal-50 transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
