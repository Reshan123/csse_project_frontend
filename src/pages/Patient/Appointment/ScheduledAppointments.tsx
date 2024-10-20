import { ChevronRight, Calendar, History } from "lucide-react";
import { useAppointments } from "../../../hooks/useAppointmentHook";
import { useEffect, useState } from "react";
import AppointmentDetails from "../../../components/Modal/AppointmentDetails";
import { Calendar as AntdCalendar, ConfigProvider, theme } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { getAppointments } from "../../../api/User/GetAppointments";
import { getUserIdFromJwtCookie } from "../../../util/jwtDecode";
import { Appointment } from "../../../types/Appointment";

const AppointmentMainContent = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentDetailsModalOpen, setAppointmentDetailsModalOpen] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null); // State to track selected appointment
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
  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.appointmentDate) > new Date()
  );
  // Filter past appointments
  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.appointmentDate) <= new Date()
  );

  const openAppointmentDetails = (appointment: any) => {
    setSelectedAppointment(appointment);
    setAppointmentDetailsModalOpen(true);
  };

  const getAppointmentDates = () => {
    return appointments.map(apt => dayjs(apt.appointmentDate));
  };

  const dateCellRender = (value: Dayjs) => {
    const appointmentDates = getAppointmentDates();
    const hasAppointment = appointmentDates.some(date => date.isSame(value, 'day'));
    
    return hasAppointment ? (
      <div className="bg-teal-600 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs">
        {appointmentDates.filter(date => date.isSame(value, 'day')).length}
      </div>
    ) : null;
  };

  return (
    <main>
      <AppointmentDetails
        title=""
        open={appointmentDetailsModalOpen}
        setOpen={setAppointmentDetailsModalOpen}
        appointment={selectedAppointment}
        onUpdate={() => {}}
      />
      <div className="bg-teal-800 flex flex-col lg:flex-row gap-6 p-6 h-full min-h-screen">
        {/* Left section with upcoming appointments and appointment history */}
        <div className="lg:w-2/3 space-y-6">
          {/* Upcoming Appointments Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-700">
                Upcoming Appointments
              </h2>
              <p className="text-sm text-gray-500">
                Manage your scheduled appointments
              </p>
            </div>
            <div className="p-4">
              {loading ? (
                <p className="text-center py-4 text-gray-500">
                  Loading appointments...
                </p>
              ) : upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((apt) => (
                  <div
                    key={apt.aptNo}
                    className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openAppointmentDetails(apt)} // Handle click to open modal with details
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{apt.docName}</p>
                      <p className="text-sm text-gray-500">{apt.department}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(apt.appointmentDate).toLocaleDateString()} at{" "}
                        {new Date(apt.appointmentDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">
                  No upcoming appointments
                </p>
              )}
            </div>
            <div className="p-4 border-t">
              <button
                className="w-full py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors"
                onClick={() =>
                  (window.location.href = "/patient/appointment/schedule/form")
                }
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
                <h2 className="text-2xl font-semibold text-gray-700">
                  Appointment History
                </h2>
              </div>
              <p className="text-sm text-gray-500">View your past appointments</p>
            </div>
            <div className="p-4">
              {loading ? (
                <p className="text-center py-4 text-gray-500">
                  Loading appointments...
                </p>
              ) : pastAppointments.length > 0 ? (
                pastAppointments.map((apt) => (
                  <div
                    key={apt.aptNo}
                    className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => openAppointmentDetails(apt)} // Handle click to open modal with details
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{apt.docName}</p>
                      <p className="text-sm text-gray-500">{apt.department}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(apt.appointmentDate).toLocaleDateString()} at{" "}
                        {new Date(apt.appointmentDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-500">
                  No past appointments to display
                </p>
              )}
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
                <h2 className="text-2xl font-semibold text-gray-700">
                  Appointment Calendar
                </h2>
              </div>
              <p className="text-sm text-gray-500">
                View your number of scheduled appointments
              </p>
            </div>
            <div className="p-4">
            <ConfigProvider
                theme={{
                  algorithm: theme.defaultAlgorithm,
                  token: {
                    colorPrimary: '#0d9488', // teal-600
                    borderRadius: 8,
                  },
                }}
              >
                <AntdCalendar
                  fullscreen={false}
                  dateCellRender={dateCellRender}
                />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AppointmentMainContent;
