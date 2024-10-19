import { Route, Routes } from "react-router-dom";
import AppointmentRoutes from "../pages/Patient/Appointment/AppointmentRoutes";
import PatientHomePage from "../pages/Patient/Home/PatientHomePage";

const PatientRoutes = () => {
  return (
    <>
      {/* <NavBar/> */}
      <Routes>
        <Route path="/home/" element={<PatientHomePage />} />
        <Route path="/appointment/*" element={<AppointmentRoutes />} />
      </Routes>
    </>
  );
};

export default PatientRoutes;
