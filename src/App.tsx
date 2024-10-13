import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PatientRoutes from "./views/PatientRoutes"
import StaffRoutes from "./views/StaffRoutes"
import DoctorRoutes from "./views/DoctorRoutes"
import Login from './components/Login'
import SignUp from './components/Signup'
import StaffSideBar from "./components/StaffSideBar"
import Home from "./pages/Patient/Appointment/AppointmentHome"
import StaffHome from "./pages/Patient/StaffHome"
import QrReader from "./components/QRreader"


function App() {
 
  return (
    <BrowserRouter>
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
        <Route path="/staff/*" element={
          <StaffSideBar>
          <StaffRoutes />
          </StaffSideBar>} />
        <Route path="/doctor/*" element={<DoctorRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/qr" element={<QrReader/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
