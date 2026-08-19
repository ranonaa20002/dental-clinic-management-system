import { useState } from "react";
import {
  Plus,
  Search,
  Pill,
  User,
  CalendarDays,
  FileText,
  Trash2,
  X,
  CheckCircle2,
  Clock3,
  Stethoscope,
  MoreHorizontal,
  Eye,
  Printer,
} from "lucide-react";

export default function Prescriptions() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      patient: "Ahmed Mohamed",
      medicine: "Augmentin 625mg",
      dosage: "1 tablet",
      frequency: "3 times daily",
      duration: "5 days",
      date: "17 Aug 2026",
      status: "Active",
      notes: "Take after meals",
    },
    {
      id: 2,
      patient: "Sara Khaled",
      medicine: "Brufen 400mg",
      dosage: "1 tablet",
      frequency: "2 times daily",
      duration: "3 days",
      date: "16 Aug 2026",
      status: "Active",
      notes: "Take after meals",
    },
    {
      id: 3,
      patient: "Mahmoud Hassan",
      medicine: "Amoxicillin 500mg",
      dosage: "1 capsule",
      frequency: "3 times daily",
      duration: "7 days",
      date: "14 Aug 2026",
      status: "Completed",
      notes: "Complete full course",
    },
  ]);

  const [formData, setFormData] = useState({
    patient: "",
    medicine: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPrescription = (e) => {
    e.preventDefault();

    if (
      !formData.patient ||
      !formData.medicine ||
      !formData.dosage ||
      !formData.frequency ||
      !formData.duration
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newPrescription = {
      id: Date.now(),
      ...formData,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Active",
    };

    setPrescriptions((prev) => [newPrescription, ...prev]);

    setFormData({
      patient: "",
      medicine: "",
      dosage: "",
      frequency: "",
      duration: "",
      notes: "",
    });

    setShowModal(false);
  };

  const deletePrescription = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this prescription?"
    );

    if (!confirmDelete) return;

    setPrescriptions((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const filteredPrescriptions = prescriptions.filter(
    (item) =>
      item.patient
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.medicine
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const activeCount = prescriptions.filter(
    (item) => item.status === "Active"
  ).length;

  const completedCount = prescriptions.filter(
    (item) => item.status === "Completed"
  ).length;

  return (
    <div className="min-h-full space-y-7">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Pill size={28} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Dental Clinic
              </span>

              <span className="w-1 h-1 rounded-full bg-slate-300" />

              <span className="text-xs text-slate-400">
                Medical Management
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Prescriptions
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Create and manage patient prescriptions
            </p>
          </div>

        </div>

        <button
          onClick={() => setShowModal(true)}
          className="
            flex items-center justify-center gap-2
            bg-blue-600 hover:bg-blue-700
            text-white
            px-5 py-3.5
            rounded-2xl
            font-semibold
            shadow-lg shadow-blue-500/20
            transition-all
            hover:-translate-y-0.5
          "
        >
          <Plus size={19} />
          New Prescription
        </button>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Total */}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Total Prescriptions
              </p>

              <h2 className="text-2xl font-bold text-slate-800 mt-2">
                {prescriptions.length}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                All prescriptions
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText size={21} />
            </div>

          </div>

        </div>

        {/* Active */}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Active
              </p>

              <h2 className="text-2xl font-bold text-emerald-600 mt-2">
                {activeCount}
              </h2>

              <p className="text-xs text-emerald-500 mt-1">
                Currently active
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={21} />
            </div>

          </div>

        </div>

        {/* Completed */}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Completed
              </p>

              <h2 className="text-2xl font-bold text-slate-700 mt-2">
                {completedCount}
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Completed treatments
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
              <Clock3 size={21} />
            </div>

          </div>

        </div>

        {/* Medicines */}

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-xs font-medium text-slate-400">
                Medicines
              </p>

              <h2 className="text-2xl font-bold text-purple-600 mt-2">
                {prescriptions.length}
              </h2>

              <p className="text-xs text-purple-400 mt-1">
                Prescribed medicines
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Pill size={21} />
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          SEARCH BAR
      ===================================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">

        <div className="flex flex-col md:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by patient or medicine..."
              className="
                w-full
                pl-11 pr-4
                py-3
                rounded-xl
                bg-slate-50
                border border-slate-200
                text-sm
                outline-none
                focus:bg-white
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-100
                transition
              "
            />

          </div>

          <div className="hidden md:flex items-center gap-2 px-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-500">
            <FileText size={16} />
            {filteredPrescriptions.length} results
          </div>

        </div>

      </div>

      {/* =====================================================
          PRESCRIPTIONS
      ===================================================== */}

      <div>

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Recent Prescriptions
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              Patient medication records
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

          {filteredPrescriptions.map((item) => (

            <div
              key={item.id}
              className="
                bg-white
                rounded-2xl
                border border-slate-200
                shadow-sm
                hover:shadow-lg
                transition-all
                overflow-hidden
              "
            >

              {/* Top line */}

              <div
                className={`h-1 ${
                  item.status === "Active"
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                }`}
              />

              <div className="p-5">

                {/* Patient */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3">

                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                      <User size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        {item.patient}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                        <Stethoscope size={13} />
                        Patient
                      </div>
                    </div>

                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold ${
                      item.status === "Active"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.status === "Active" ? (
                      <CheckCircle2 size={12} />
                    ) : (
                      <Clock3 size={12} />
                    )}

                    {item.status}
                  </span>

                </div>

                {/* Medicine */}

                <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-100">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-blue-600 flex items-center justify-center">
                      <Pill size={19} />
                    </div>

                    <div className="flex-1">

                      <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                        Medicine
                      </p>

                      <h4 className="font-bold text-slate-800 mt-0.5">
                        {item.medicine}
                      </h4>

                    </div>

                    <button
                      onClick={() =>
                        setSelectedPrescription(item)
                      }
                      className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition"
                      title="View"
                    >
                      <Eye size={17} />
                    </button>

                  </div>

                </div>

                {/* Details */}

                <div className="grid grid-cols-3 gap-2 mt-3">

                  <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3">

                    <p className="text-[10px] text-slate-400">
                      Dosage
                    </p>

                    <p className="text-xs font-bold text-slate-700 mt-1">
                      {item.dosage}
                    </p>

                  </div>

                  <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-3">

                    <p className="text-[10px] text-slate-400">
                      Frequency
                    </p>

                    <p className="text-xs font-bold text-slate-700 mt-1">
                      {item.frequency}
                    </p>

                  </div>

                  <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-3">

                    <p className="text-[10px] text-slate-400">
                      Duration
                    </p>

                    <p className="text-xs font-bold text-slate-700 mt-1">
                      {item.duration}
                    </p>

                  </div>

                </div>

                {/* Notes */}

                {item.notes && (
                  <div className="mt-3 px-3 py-2.5 rounded-xl bg-slate-50">

                    <p className="text-[10px] text-slate-400">
                      Doctor Notes
                    </p>

                    <p className="text-xs text-slate-600 mt-1">
                      {item.notes}
                    </p>

                  </div>
                )}

                {/* Footer */}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">

                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={14} />
                    {item.date}
                  </div>

                  <div className="flex items-center gap-1">

                    <button
                      onClick={() =>
                        setSelectedPrescription(item)
                      }
                      className="w-9 h-9 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition flex items-center justify-center"
                      title="View prescription"
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      className="w-9 h-9 rounded-lg text-slate-500 hover:bg-slate-100 transition flex items-center justify-center"
                      title="More"
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    <button
                      onClick={() =>
                        deletePrescription(item.id)
                      }
                      className="w-9 h-9 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {filteredPrescriptions.length === 0 && (

        <div className="bg-white rounded-2xl border border-slate-200 p-14 text-center">

          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">

            <Pill size={28} />

          </div>

          <h3 className="text-lg font-bold text-slate-700 mt-4">
            No prescriptions found
          </h3>

          <p className="text-sm text-slate-400 mt-2">
            Try searching for another patient or medicine.
          </p>

        </div>

      )}

      {/* =====================================================
          ADD PRESCRIPTION MODAL
      ===================================================== */}

      {showModal && (

        <div className="fixed inset-0 z-[100] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

            {/* Modal Header */}

            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Pill size={21} />
                </div>

                <div>

                  <h2 className="text-lg font-bold text-slate-800">
                    New Prescription
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    Create a medication prescription
                  </p>

                </div>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition"
              >
                <X size={18} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleAddPrescription}
              className="p-6 space-y-5"
            >

              <div className="grid md:grid-cols-2 gap-4">

                {/* Patient */}

                <div>

                  <label className="text-xs font-bold text-slate-600">
                    Patient Name *
                  </label>

                  <div className="relative mt-2">

                    <User
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="patient"
                      value={formData.patient}
                      onChange={handleChange}
                      placeholder="Enter patient name"
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>

                {/* Medicine */}

                <div>

                  <label className="text-xs font-bold text-slate-600">
                    Medicine *
                  </label>

                  <div className="relative mt-2">

                    <Pill
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      name="medicine"
                      value={formData.medicine}
                      onChange={handleChange}
                      placeholder="e.g. Augmentin 625mg"
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />

                  </div>

                </div>

                {/* Dosage */}

                <div>

                  <label className="text-xs font-bold text-slate-600">
                    Dosage *
                  </label>

                  <input
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    placeholder="e.g. 1 tablet"
                    className="w-full mt-2 px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Frequency */}

                <div>

                  <label className="text-xs font-bold text-slate-600">
                    Frequency *
                  </label>

                  <input
                    name="frequency"
                    value={formData.frequency}
                    onChange={handleChange}
                    placeholder="e.g. 3 times daily"
                    className="w-full mt-2 px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Duration */}

                <div>

                  <label className="text-xs font-bold text-slate-600">
                    Duration *
                  </label>

                  <input
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 5 days"
                    className="w-full mt-2 px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

                {/* Notes */}

                <div>

                  <label className="text-xs font-bold text-slate-600">
                    Doctor Notes
                  </label>

                  <input
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Optional notes"
                    className="w-full mt-2 px-3 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />

                </div>

              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-3 rounded-xl bg-slate-100 text-slate-600 text-sm font-semibold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition flex items-center gap-2"
                >
                  <Plus size={17} />
                  Add Prescription
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          VIEW PRESCRIPTION MODAL
      ===================================================== */}

      {selectedPrescription && (

        <div className="fixed inset-0 z-[110] bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-blue-100 text-xs">
                    Dental Clinic
                  </p>

                  <h2 className="text-xl font-bold mt-1">
                    Prescription Details
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setSelectedPrescription(null)
                  }
                  className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center"
                >
                  <X size={18} />
                </button>

              </div>

            </div>

            <div className="p-6">

              <div className="flex items-center gap-3 pb-5 border-b border-slate-100">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <User size={22} />
                </div>

                <div>

                  <p className="text-xs text-slate-400">
                    Patient
                  </p>

                  <h3 className="font-bold text-slate-800">
                    {selectedPrescription.patient}
                  </h3>

                </div>

              </div>

              <div className="mt-5 p-4 rounded-2xl bg-slate-50">

                <p className="text-xs text-slate-400">
                  Medicine
                </p>

                <div className="flex items-center gap-2 mt-2">

                  <Pill
                    size={18}
                    className="text-blue-600"
                  />

                  <h3 className="font-bold text-slate-800">
                    {selectedPrescription.medicine}
                  </h3>

                </div>

              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">

                <div className="p-3 rounded-xl bg-blue-50">

                  <p className="text-[10px] text-slate-400">
                    Dosage
                  </p>

                  <p className="text-xs font-bold mt-1">
                    {selectedPrescription.dosage}
                  </p>

                </div>

                <div className="p-3 rounded-xl bg-purple-50">

                  <p className="text-[10px] text-slate-400">
                    Frequency
                  </p>

                  <p className="text-xs font-bold mt-1">
                    {selectedPrescription.frequency}
                  </p>

                </div>

                <div className="p-3 rounded-xl bg-amber-50">

                  <p className="text-[10px] text-slate-400">
                    Duration
                  </p>

                  <p className="text-xs font-bold mt-1">
                    {selectedPrescription.duration}
                  </p>

                </div>

              </div>

              {selectedPrescription.notes && (

                <div className="mt-4 p-4 rounded-xl bg-slate-50">

                  <p className="text-xs text-slate-400">
                    Doctor Notes
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    {selectedPrescription.notes}
                  </p>

                </div>

              )}

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CalendarDays size={14} />
                  {selectedPrescription.date}
                </div>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition"
                >
                  <Printer size={15} />
                  Print
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}