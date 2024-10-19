import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
  Outlet,
} from "react-router-dom";
import PatientRoutes from "./views/PatientRoutes";
import StaffRoutes from "./views/StaffRoutes";
import DoctorRoutes from "./views/DoctorRoutes";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Home from "./pages/Patient/Appointment/AppointmentHome";
import { getAuthToken, getRole } from "./api/Register/LoginApi";
import { useEffect, useState } from "react";
import StaffSideBar from "./components/StaffSideBar";
import StaffHome from "./pages/staff/StaffHome";
import { useUserRole } from "./hooks/useUserRoleHook";

function App() {
  const navigate = useNavigate();
  const { role } = useUserRole();

  useEffect(() => {
    const token = getAuthToken();
    if (token == null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route element={role == "ROLE_USER" ? <Outlet /> : null}>
        <Route
          path="/"
          element={
            <StaffSideBar>
              <StaffHome></StaffHome>
            </StaffSideBar>
          }
        />
      </Route>
      {/* <Route element={role == "" ? <Outlet /> : null}>
        <Route
          path="/patient/*"
          element={
            <StaffSideBar>
              <PatientRoutes />
            </StaffSideBar>
          }
        />
      </Route> */}

      <Route element={role == "ROLE_ADMIN" ? <Outlet /> : null}>
        <Route
          path="/staff/*"
          element={
            <StaffSideBar>
              <StaffRoutes />
            </StaffSideBar>
          }
        />
      </Route>

      <Route element={role == "ROLE_MODERATOR" ? <Outlet /> : <Outlet />}>
        <Route path="/doctor/*" element={<DoctorRoutes />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
