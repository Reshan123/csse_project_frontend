import { Route, Routes } from "react-router-dom";
import MedicalRecordForm from "../components/Staff/AddMedicalRecord";
import RecordsTable from "../components/Staff/RecordsTable";
import PatientHome from "../pages/staff/PatientHome";
import ReportScreen from "../pages/Report/ReportScreen";

const StaffRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home/:id" element={<PatientHome />} />
        <Route path="/addRecord" element={<MedicalRecordForm />} />
        <Route path="/viewRecords" element={<RecordsTable />} />
        <Route path="/report" element={<ReportScreen />} />
      </Routes>
    </>
  );
};

export default StaffRoutes;
