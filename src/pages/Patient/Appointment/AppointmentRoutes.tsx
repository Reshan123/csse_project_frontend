import { Route, Routes } from "react-router-dom";
import SideBar from "./SideBar";
import ScheduledAppointments from "./ScheduledAppointments";
import AppointmentHome from "./AppointmentHome";
import CompletedAppointments from "./CompletedAppointments";
import ScheduleForm from "./ScheduleForm";

const AppointmentRoutes = () => {


  return (
    <>
        {/* <SideBar/> */}
        <div>
          <Routes>
              <Route path="/" element={<AppointmentHome/>}/>
              <Route path="/scheduled" element={<ScheduledAppointments/>}/>
              <Route path="/completed" element={<CompletedAppointments/>}/>
              <Route path="/schedule/form" element={<ScheduleForm/>}/>
          </Routes>
        </div>
    </>
  );
};

export default AppointmentRoutes;