import { Route, Routes } from "react-router-dom";
import AppointmentRoutes from "../pages/Patient/Appointment/AppointmentRoutes";
import PatientHome from "../pages/staff/PatientHome";

const PatientRoutes = () => {
  return (
    <>
      {/* <NavBar/> */}
      <Routes>
        <Route path="/home/:id" element={<PatientHome />} />
        <Route path="/appointment/*" element={<AppointmentRoutes />} />
      </Routes>
    </>
  );
};

export default PatientRoutes;
