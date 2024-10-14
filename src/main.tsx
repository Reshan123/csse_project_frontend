import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react'
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>
  </StrictMode>,
)
