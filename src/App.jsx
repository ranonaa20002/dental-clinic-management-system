import { Routes, Route, Navigate } from "react-router-dom";

// Doctor
import Dashboard from "./Pages/Dashboard/Dashboard";
import DoctorLayout from "./Layout/DoctorLayout";
import Patients from "./Pages/Patients/Patients";
import Appointment from "./Pages/Appointment/Appointment";
import MedicalRecords from "./Pages/MedicalRecords/MedicalRecords";
import Payments from "./Pages/Payments/Payments";
import Settings from "./Pages/Settings/Settings";
import AIAssistant from "./Pages/AIAssistant/AIAssistant";
import DentalClinicalHub from "./Pages/DentalClinicalHub";
import Reports from "./Pages/Reports/Reports";
import Prescription from "./Pages/Prescription/Prescription";

// Auth
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";

// Patient
import CarePortal from "./Pages/CarePortal/CarePortal";
import JoinDoctor from "./Pages/CarePortal/JoinDoctor";

export default function App() {
  return (
    <Routes>

      {/* ================= AUTH ================= */}

      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ================= DOCTOR ================= */}

      <Route
        path="/dashboard"
        element={<DoctorLayout />}
      >

        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="patients"
          element={<Patients />}
        />

        <Route
          path="appointments"
          element={<Appointment />}
        />

        <Route
          path="records"
          element={<MedicalRecords />}
        />

        <Route
          path="payments"
          element={<Payments />}
        />

        <Route
          path="prescription"
          element={<Prescription />}
        />

        <Route
          path="reports"
          element={<Reports />}
        />

        <Route
          path="clinical-hub"
          element={<DentalClinicalHub />}
        />

        <Route
          path="ai-assistant"
          element={<AIAssistant />}
        />

        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>

      {/* ================= PATIENT ================= */}

      <Route
        path="/care"
        element={<CarePortal />}
      />

      <Route
        path="/care/join-doctor"
        element={<JoinDoctor />}
      />

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}