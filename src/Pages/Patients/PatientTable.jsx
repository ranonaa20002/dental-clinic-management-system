import { Eye, Pencil, Trash2 } from "lucide-react";

export default function PatientTable({
  patients,
  onDelete,
  onEdit,
  onView,
}) {
  if (patients.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
        No Patients Found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-4">Code</th>
            <th className="p-4">Name</th>
            <th className="p-4">Age</th>
            <th className="p-4">Phone</th>
            <th className="p-4">Address</th>
            <th className="p-4">Gender</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-4 font-semibold text-blue-600">
                {patient.patientCode}
              </td>

              <td>{patient.name}</td>

              <td>{patient.age}</td>

              <td>{patient.phone}</td>

              <td>{patient.address}</td>

              <td>{patient.gender}</td>

              <td>
                <div className="flex justify-center gap-2">

                  <button
                    onClick={() => onView(patient)}
                    className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200"
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() => onEdit(patient)}
                    className="bg-yellow-100 text-yellow-700 p-2 rounded-lg hover:bg-yellow-200"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(patient.id)}
                    className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}