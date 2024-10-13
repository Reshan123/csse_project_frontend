import { Route, Routes } from "react-router-dom";
import MedicalRecordForm from "../pages/staff/AddMedicalRecord";

const StaffRoutes = () => {

    return (
       <>
       <Routes>
        <Route path="/addRecord" element={<MedicalRecordForm/>}/>
       </Routes>
       </>
    );
}

export default StaffRoutes;