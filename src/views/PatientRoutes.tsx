import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import Home from "../pages/Patient/StaffHome";
import AppointmentRoutes from "../pages/Patient/Appointment/AppointmentRoutes";
import PatientHome from "../pages/Patient/PatientHome";

const PatientRoutes = () => {

    return (
       <>
       {/* <NavBar/> */}
       <Routes>
            <Route path="/home/:id" element={<PatientHome/>}/>
            <Route path="/appointment/*" element={<AppointmentRoutes/>}/>
       </Routes>
       </>
    );
}

export default PatientRoutes;