import {
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CreditCard,
  Activity,
  ClipboardList,
} from "lucide-react";

export default function PatientProfile({
  patient,
  onBack,
}) {
  if (!patient) return null;

  const appointments = patient.appointments || [];
  const payments = patient.payments || [];
  const prescriptions = patient.prescriptions || [];
  const xrays = patient.xrays || [];

  return (
    <div className="space-y-6">

      {/* Back Button */}

      <button
        type="button"
        onClick={onBack}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
      >
        ← Back
      </button>

      {/* =========================
          Patient Header
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {patient.name}
        </h1>

        <p className="text-blue-600 font-semibold">
          {patient.patientCode || "No Patient Code"}
        </p>

      </div>

      {/* =========================
          Patient Information
      ========================= */}

      <div className="grid md:grid-cols-2 gap-5">

        {/* Personal Information */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

          <h2 className="font-bold text-xl text-gray-800 mb-4">
            Personal Information
          </h2>

          <div className="space-y-3 text-gray-600">

            <p className="flex items-center gap-2">
              <User
                size={18}
                className="text-gray-400"
              />

              Age: {patient.age || "-"}
            </p>

            <p className="flex items-center gap-2">
              <Phone
                size={18}
                className="text-gray-400"
              />

              {patient.phone || "-"}
            </p>

            <p className="flex items-center gap-2">
              <MapPin
                size={18}
                className="text-gray-400"
              />

              {patient.address || "-"}
            </p>

            <p>
              Gender: {patient.gender || "-"}
            </p>

          </div>

        </div>

        {/* Medical History */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

          <h2 className="font-bold text-xl text-gray-800 mb-4">
            Medical History
          </h2>

          <p className="text-gray-600">
            {patient.medicalHistory ||
              "No Medical History"}
          </p>

        </div>

      </div>

      {/* =========================
          Doctor Notes
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

        <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2 mb-4">

          <ClipboardList
            size={22}
            className="text-blue-600"
          />

          Doctor Notes

        </h2>

        <p className="text-gray-600">
          {patient.doctorNotes || "No Notes"}
        </p>

      </div>

      {/* =========================
          Appointments
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

        <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2 mb-4">

          <Calendar
            size={22}
            className="text-blue-600"
          />

          Appointments

        </h2>

        {appointments.length === 0 ? (

          <p className="text-gray-400">
            No Appointments
          </p>

        ) : (

          <div className="space-y-3">

            {appointments.map((item) => (

              <div
                key={item.id}
                className="border border-gray-100 rounded-xl p-4"
              >

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Date:
                  </span>{" "}
                  {item.date || "-"}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Time:
                  </span>{" "}
                  {item.time || "-"}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  {item.status || "-"}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* =========================
          Payments
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

        <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2 mb-4">

          <CreditCard
            size={22}
            className="text-blue-600"
          />

          Payments

        </h2>

        {payments.length === 0 ? (

          <p className="text-gray-400">
            No Payments
          </p>

        ) : (

          <div className="space-y-3">

            {payments.map((pay) => (

              <div
                key={pay.id}
                className="border border-gray-100 rounded-xl p-4"
              >

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Amount:
                  </span>{" "}
                  {pay.amount}
                </p>

                <p className="text-gray-700">
                  <span className="font-semibold">
                    Status:
                  </span>{" "}
                  {pay.status}
                </p>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* =========================
          Prescriptions
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

        <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2 mb-4">

          <FileText
            size={22}
            className="text-blue-600"
          />

          Prescriptions

        </h2>

        {prescriptions.length === 0 ? (

          <p className="text-gray-400">
            No Prescription
          </p>

        ) : (

          <div className="space-y-3">

            {prescriptions.map((pre) => (

              <div
                key={pre.id}
                className="border border-gray-100 rounded-xl p-4"
              >
                {pre.text}
              </div>

            ))}

          </div>

        )}

      </div>

      {/* =========================
          X-Ray Images
      ========================= */}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

        <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2 mb-4">

          <Activity
            size={22}
            className="text-blue-600"
          />

          X-Ray Images

        </h2>

        {xrays.length === 0 ? (

          <p className="text-gray-400">
            No Images
          </p>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {xrays.map((img) => (

              <img
                key={img.id}
                src={img.url}
                alt="Patient X-Ray"
                className="w-full h-48 object-cover rounded-xl border"
              />

            ))}

          </div>

        )}

      </div>

    </div>
  );
}