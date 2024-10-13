import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PatientRoutes from "./views/PatientRoutes"
import StaffRoutes from "./views/StaffRoutes"
import DoctorRoutes from "./views/DoctorRoutes"


function App() { 
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Navigate to="/patient/home"/>}/>
        <Route path='/patient/*' element={<PatientRoutes/>}/>
        <Route path='/staff/*' element={<StaffRoutes/>}/>
        <Route path='/doctor/*' element={<DoctorRoutes/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
