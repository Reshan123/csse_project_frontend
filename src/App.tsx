import { Navigate, Route, Routes, useNavigate, Outlet } from "react-router-dom";
import PatientRoutes from "./views/PatientRoutes";
import StaffRoutes from "./views/StaffRoutes";
import DoctorRoutes from "./views/DoctorRoutes";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { getAuthToken } from "./api/Register/LoginApi";
import { useCallback, useEffect, useState } from "react";
import StaffSideBar from "./components/StaffSideBar";
import { useUserRole } from "./hooks/useUserRoleHook";
import PatientSideBar from "./components/PatientSideBar";
import Unauthorized from "./pages/Unauthorized";
import Loader from "./components/Loader/Loader";
import DoctorSideBar from "./components/DoctorSideBar";

function App() {
  const navigate = useNavigate();
  const { role, loading } = useUserRole();
  const [initialNavigationDone, setInitialNavigationDone] = useState(false);

  // const changeRouteOnRole = useCallback(() => {
  //   if (role === "ROLE_USER") {
  //     navigate("/patient/home/");
  //   } else if (role === "ROLE_ADMIN") {
  //     navigate("/staff/");
  //   } else if (role === "ROLE_MODERATOR") {
  //     navigate("/doctor/");
  //   }
  //   setInitialNavigationDone(true);
  // }, [role, navigate]);

  useEffect(() => {
    const token = getAuthToken();
    if (token == null) {
      navigate("/login");
    }
    // changeRouteOnRole();
  }, [navigate, initialNavigationDone]);

  if (loading) {
    return <Loader />;
  }

  return (

    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          role === "ROLE_USER" ? <Outlet /> : <Navigate to="/unauthorized" />
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
          role === "ROLE_ADMIN" ? <Outlet /> : <Navigate to="/unauthorized" />
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
          role === "ROLE_MODERATOR" ? (
            <Outlet />
          ) : (
            <Navigate to="/unauthorized" />
          )
        }
      >
        <Route
          path="/doctor/*"
          element={
            <DoctorSideBar>
              <DoctorRoutes />
            </DoctorSideBar>
          }
        />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
