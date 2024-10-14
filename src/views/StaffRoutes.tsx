import { Route, Routes } from "react-router-dom";
import MedicalRecordForm from "../pages/staff/AddMedicalRecord";
import RecordsTable from "../pages/staff/RecordsTable";



const StaffRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/addRecord" element={<MedicalRecordForm />} />
                <Route path="/viewRecords" element={<RecordsTable />} />
            </Routes>
        </>
    );
}

export default StaffRoutes;
