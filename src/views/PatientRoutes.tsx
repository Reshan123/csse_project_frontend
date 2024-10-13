import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import HomePage from "../pages/Patient/HomePage";

const PatientRoutes = () => {

    return (
       <>
       <NavBar/>
       <Routes>
            <Route path="/home" element={<HomePage/>}/>
       </Routes>
       </>
    );
}

export default PatientRoutes;