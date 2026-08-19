
import { useState } from "react";

import AddPatientModal from "./AddPatientModal";
import PatientSearch from "./PatientSearch";
import PatientTable from "./PatientTable";
import PatientProfile from "./PatientProfile";
export default function Patients() {
  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const [editingPatient, setEditingPatient] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const savePatient = (patient) => {
    if (editingPatient) {
      setPatients((prev) =>
        prev.map((p) => (p.id === patient.id ? patient : p))
      );
      setEditingPatient(null);
    } else {
      setPatients((prev) => [patient, ...prev]);
    }
  };

  const deletePatient = (id) => {
    setPatients((prev) => prev.filter((patient) => patient.id !== id));
  };

  const filteredPatients = patients.filter((patient) => {
    return (
      patient.name.toLowerCase().includes(search.toLowerCase()) ||
      patient.phone.includes(search) ||
      patient.patientCode.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (selectedPatient) {
    return (
      <PatientProfile
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
<AddPatientModal
    onAdd={savePatient}
    editingPatient={editingPatient}
/>
      <PatientSearch
        search={search}
        setSearch={setSearch}
      />

      <PatientTable
        patients={filteredPatients}
        onDelete={deletePatient}
        onEdit={setEditingPatient}
        onView={setSelectedPatient}
      />
    </div>
  );
}