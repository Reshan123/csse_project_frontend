import { Route, Routes } from "react-router-dom";
import MedicalRecordForm from "../components/Staff/AddMedicalRecord";
import RecordsTable from "../components/Staff/RecordsTable";
import PatientHome from "../pages/staff/PatientHome";
import ReportScreen from "../pages/Report/ReportScreen";
import StaffHome from "../pages/staff/StaffHome";

const StaffRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StaffHome />} />
      <Route path="/home/:id" element={<PatientHome />} />
      <Route
        path="/addRecord"
        element={
          <div className="min-h-screen bg-[#0b4541] flex items-center justify-center">
            <MedicalRecordForm />
          </div>
        }
      />
      <Route
        path="/viewRecords"
        element={
          <div className="min-h-screen bg-[#0b4541] items-center justify-center mt-10 ">
            <RecordsTable />
          </div>
        }
      />
      <Route path="/report" element={<ReportScreen />} />
    </Routes>
  );
};

export default StaffRoutes;