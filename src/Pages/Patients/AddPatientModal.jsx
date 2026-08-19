import { useState, useEffect } from "react";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Stethoscope,
  Save,
  UserPlus,
} from "lucide-react";

export default function AddPatientModal({
  onAdd,
  editingPatient,
}) {
  const initialState = {
    name: "",
    age: "",
    phone: "",
    address: "",
    gender: "",
    medicalHistory: "",
    doctorNotes: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingPatient) {
      setFormData({
        name: editingPatient.name || "",
        age: editingPatient.age || "",
        phone: editingPatient.phone || "",
        address: editingPatient.address || "",
        gender: editingPatient.gender || "",
        medicalHistory: editingPatient.medicalHistory || "",
        doctorNotes: editingPatient.doctorNotes || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editingPatient]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Patient name and phone are required.");
      return;
    }

    const patient = editingPatient
      ? {
          ...editingPatient,
          ...formData,
        }
      : {
          id: Date.now(),
          patientCode: `PAT-${Date.now()}`,
          ...formData,
          visits: [],
          appointments: [],
          payments: [],
          prescriptions: [],
          xrays: [],
        };

    onAdd(patient);
    setFormData(initialState);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">
              {editingPatient ? (
                <User className="w-7 h-7 text-blue-600" />
              ) : (
                <UserPlus className="w-7 h-7 text-blue-600" />
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                {editingPatient
                  ? "Edit Patient"
                  : "Add New Patient"}
              </h1>

              <p className="text-slate-500 mt-1">
                {editingPatient
                  ? "Update patient information"
                  : "Create a new patient profile"}
              </p>
            </div>

          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

          {/* Card Header */}
          <div className="px-7 py-5 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>

              <div>
                <h2 className="font-bold text-slate-800">
                  Patient Information
                </h2>

                <p className="text-sm text-slate-500">
                  Enter the patient's personal details
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-7">

            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Patient Name
                </label>

                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter patient name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Age
                </label>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    name="phone"
                    placeholder="01XXXXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl py-3 px-4 outline-none bg-white transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Address
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />

                  <input
                    type="text"
                    name="address"
                    placeholder="Enter patient address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-slate-100" />

            {/* Medical Information */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-5">

                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-emerald-600" />
                </div>

                <div>
                  <h2 className="font-bold text-slate-800">
                    Medical Information
                  </h2>

                  <p className="text-sm text-slate-500">
                    Add medical history and doctor's notes
                  </p>
                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Medical History */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Medical History
                  </label>

                  <textarea
                    name="medicalHistory"
                    placeholder="Blood pressure, diabetes, allergies..."
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    rows="6"
                    className="w-full border border-slate-200 rounded-xl p-4 resize-none outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                {/* Doctor Notes */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Doctor Notes
                  </label>

                  <textarea
                    name="doctorNotes"
                    placeholder="Write doctor's notes..."
                    value={formData.doctorNotes}
                    onChange={handleChange}
                    rows="6"
                    className="w-full border border-slate-200 rounded-xl p-4 resize-none outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">

              <button
                type="button"
                onClick={() => setFormData(initialState)}
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
              >
                Clear
              </button>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm transition"
              >
                <Save className="w-5 h-5" />

                {editingPatient
                  ? "Update Patient"
                  : "Save Patient"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}