import {
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
// import Home from "./pages/Patient/Appointment/AppointmentHome";
import { getAuthToken } from "./api/Register/LoginApi";
import { useEffect } from "react";
import StaffSideBar from "./components/StaffSideBar";
// import StaffHome from "./pages/staff/StaffHome";
import { useUserRole } from "./hooks/useUserRoleHook";
import PatientSideBar from "./components/PatientSideBar";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const navigate = useNavigate();
  const { role, loading } = useUserRole();

  useEffect(() => {
    const token = getAuthToken();
    if (token == null) {
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* <Route element={role == "ROLE_USER" ? <Outlet /> : null}>
        <Route
          path="/"
          element={
            <StaffSideBar>
              <StaffHome></StaffHome>
            </StaffSideBar>
          }
        />
      </Route> */}

      <Route
        element={
          role == "ROLE_USER" ? <Outlet /> : <Navigate to="/unauthorized" />
        }
      >
        <Route
          path="/patient/*"
          element={
            <PatientSideBar>
              <PatientRoutes />
            </PatientSideBar>
          }
        />
      </Route>

      <Route
        element={
          role == "ROLE_ADMIN" ? <Outlet /> : <Navigate to="/unauthorized" />
        }
      >
        <Route
          path="/staff/*"
          element={
            <StaffSideBar>
              <StaffRoutes />
            </StaffSideBar>
          }
        />
      </Route>

      <Route
        element={
          role == "ROLE_MODERATOR" ? (
            <Outlet />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      >
        <Route path="/doctor/*" element={<DoctorRoutes />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
