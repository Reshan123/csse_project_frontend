import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PatientRoutes from "./views/PatientRoutes"
import StaffRoutes from "./views/StaffRoutes"
import DoctorRoutes from "./views/DoctorRoutes"
import Login from './components/Login'
import SignUp from './components/Signup'

function App() {
 
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Navigate to="/patient/home"/>}/>
        <Route path='/patient/*' element={<PatientRoutes/>}/>
        <Route path='/staff/*' element={<StaffRoutes/>}/>
        <Route path='/doctor/*' element={<DoctorRoutes/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
