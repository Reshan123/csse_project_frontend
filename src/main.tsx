import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import axios from 'axios';
import { MedicalRecordsProvider } from './contexts/MedicalRecordsContext.tsx'
import { AppointmentsProvider } from './contexts/AppointmentContext.tsx'

axios.defaults.baseURL = "http://localhost:8000/";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MedicalRecordsProvider>
        <AppointmentsProvider>
        <App />
        </AppointmentsProvider>
      </MedicalRecordsProvider>
    </ThemeProvider>
  </StrictMode>,
)
