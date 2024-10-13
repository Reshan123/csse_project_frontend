import { Route, Routes } from "react-router-dom";
import MedicalRecordForm from "../pages/staff/AddMedicalRecord";
import DashBoard from "../pages/staff/DashBoard";

const StaffRoutes = () => {

    return (
       <>
       <Routes>
        <Route path="/" element={<DashBoard/>}/>
        <Route path="/addRecord" element={<MedicalRecordForm/>}/>
       </Routes>
       </>
    );
}

export default StaffRoutes;