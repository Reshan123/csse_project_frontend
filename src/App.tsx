import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom"
import PatientRoutes from "./views/PatientRoutes"
import StaffRoutes from "./views/StaffRoutes"
import DoctorRoutes from "./views/DoctorRoutes"
import Login from './components/Login'
import SignUp from './components/Signup'
import Home from "./pages/Patient/Appointment/AppointmentHome"
import { getAuthToken } from "./api/Register/LoginApi"
import { useEffect } from "react"
import StaffSideBar from "./components/StaffSideBar"
import StaffHome from "./pages/staff/StaffHome"


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAuthToken();
    console.log(token);
    if (token == null) {
      console.log("app true");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <StaffSideBar>
            <StaffHome></StaffHome>
          </StaffSideBar>
        }
      />
      <Route
        path="/patient/*"
        element={
          <StaffSideBar>
            <PatientRoutes />
          </StaffSideBar>
        }
      />
      <Route
        path="/staff/*"
        element={
          <StaffSideBar>
            <StaffRoutes />
          </StaffSideBar>
        }
      />
      <Route path="/doctor/*" element={<DoctorRoutes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
