import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import axios from "axios";
import { MedicalRecordsProvider } from "./contexts/MedicalRecordsContext.tsx";
import { AppointmentsProvider } from "./contexts/AppointmentContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserRoleProvider } from "./contexts/UserRole.tsx";

axios.defaults.baseURL = "http://localhost:8000/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MedicalRecordsProvider>
          <AppointmentsProvider>
            <UserRoleProvider>
              <App />
            </UserRoleProvider>
          </AppointmentsProvider>
        </MedicalRecordsProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
