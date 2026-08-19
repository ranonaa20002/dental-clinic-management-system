import { useState } from "react";
import {
  Search,
  FileText,
  User,
  CalendarDays,
  Eye,
  Plus,
  X,
  Stethoscope,
  Activity,
} from "lucide-react";

export default function MedicalRecords() {
  const language = localStorage.getItem("language") || "ar";

  const t = {
    en: {
      title: "Medical Records",
      subTitle: "View and manage patients medical history",
      addRecord: "New Record",
      totalRecords: "Total Records",
      patients: "Patients",
      thisMonth: "This Month",
      viewedToday: "Viewed Today",
      searchPlaceholder: "Search patient, diagnosis, treatment...",
      thPatient: "Patient",
      thDiagnosis: "Diagnosis",
      thTreatment: "Treatment",
      thDate: "Date",
      thDoctor: "Doctor",
      thAction: "Action",
      view: "View",
      dr: "Dr.",
      noRecords: "No medical records found",
      // Modal Details
      recordDetails: "Medical Record Details",
      patientName: "Patient Name",
      diagnosisLabel: "Diagnosis",
      treatmentLabel: "Treatment Plan",
      dateLabel: "Visit Date",
      doctorLabel: "Attending Doctor",
      closeBtn: "Close",
      // Modal Add
      addRecordTitle: "Add New Medical Record",
      saveBtn: "Save Record",
      cancelBtn: "Cancel",
    },
    ar: {
      title: "السجلات الطبية",
      subTitle: "عرض وإدارة التاريخ الطبي للمرضى",
      addRecord: "سجل جديد",
      totalRecords: "إجمالي السجلات",
      patients: "المرضى الفريدين",
      thisMonth: "هذا الشهر",
      viewedToday: "تم استعراضها اليوم",
      searchPlaceholder: "بحث باسم المريض، التشخيص، أو العلاج...",
      thPatient: "المريض",
      thDiagnosis: "التشخيص",
      thTreatment: "العلاج",
      thDate: "التاريخ",
      thDoctor: "الطبيب",
      thAction: "الإجراء",
      view: "عرض",
      dr: "د.",
      noRecords: "لا توجد سجلات طبية مطابقة للبحث",
      // Modal Details
      recordDetails: "تفاصيل السجل الطبي",
      patientName: "اسم المريض",
      diagnosisLabel: "التشخيص الطبي",
      treatmentLabel: "خطة العلاج",
      dateLabel: "تاريخ الزيارة",
      doctorLabel: "الطبيب المعالج",
      closeBtn: "إغلاق",
      // Modal Add
      addRecordTitle: "إضافة سجل طبي جديد",
      saveBtn: "حفظ السجل",
      cancelBtn: "إلغاء",
    },
  };

  const currentLang = t[language] || t.ar;

  // 1. حالة السجلات الطبية Initial State
  const [records, setRecords] = useState([
    {
      id: 1,
      patient: language === "ar" ? "رنا حسن" : "Rana Hassan",
      diagnosis: language === "ar" ? "تسوس أسنان" : "Dental Caries",
      treatment: language === "ar" ? "حشو تجميلي" : "Composite Filling",
      date: language === "ar" ? "20 يوليو 2026" : "20 Jul 2026",
      doctor: `${currentLang.dr} ${language === "ar" ? "أحمد" : "Ahmed"}`,
    },
    {
      id: 2,
      patient: language === "ar" ? "أحمد علي" : "Ahmed Ali",
      diagnosis: language === "ar" ? "التهاب اللثة" : "Gingivitis",
      treatment: language === "ar" ? "تنظيف وتلميع" : "Scaling & Polishing",
      date: language === "ar" ? "18 يوليو 2026" : "18 Jul 2026",
      doctor: `${currentLang.dr} ${language === "ar" ? "أحمد" : "Ahmed"}`,
    },
    {
      id: 3,
      patient: language === "ar" ? "سارة محمد" : "Sara Mohamed",
      diagnosis: language === "ar" ? "علاج عصب" : "Root Canal",
      treatment: language === "ar" ? "حشو عصب" : "RCT",
      date: language === "ar" ? "15 يوليو 2026" : "15 Jul 2026",
      doctor: `${currentLang.dr} ${language === "ar" ? "أحمد" : "Ahmed"}`,
    },
    {
      id: 4,
      patient: language === "ar" ? "عمر حسن" : "Omar Hassan",
      diagnosis: language === "ar" ? "خلع سن" : "Tooth Extraction",
      treatment: language === "ar" ? "خلع" : "Extraction",
      date: language === "ar" ? "12 يوليو 2026" : "12 Jul 2026",
      doctor: `${currentLang.dr} ${language === "ar" ? "أحمد" : "Ahmed"}`,
    },
  ]);

  // States للتحكم بالبحث والنوافذ المنبثقة
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null); // لعرض تفاصيل السجل
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // لإضافة سجل جديد
  const [viewCount, setViewCount] = useState(42); // عداد ديناميكي للمشاهدات اليوم

  // Form State
  const [formData, setFormData] = useState({
    patient: "",
    diagnosis: "",
    treatment: "",
    doctor: `${currentLang.dr} ${language === "ar" ? "أحمد" : "Ahmed"}`,
  });

  // 2. حساب الإحصائيات ديناميكياً
  const totalRecordsCount = records.length;
  // عدد المرضى الفريدين
  const uniquePatientsCount = new Set(records.map((r) => r.patient)).size;

  // فتح نافذة المعاينة
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setViewCount((prev) => prev + 1); // زيادة عداد الاستعراض اليوم
  };

  // إضافة سجل جديد
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.patient || !formData.diagnosis) return;

    const newEntry = {
      id: Date.now(),
      patient: formData.patient,
      diagnosis: formData.diagnosis,
      treatment: formData.treatment || (language === "ar" ? "كشف عام" : "Checkup"),
      date: language === "ar" ? "20 يوليو 2026" : "20 Jul 2026",
      doctor: formData.doctor,
    };

    setRecords([newEntry, ...records]);
    setIsAddModalOpen(false);
    setFormData({
      patient: "",
      diagnosis: "",
      treatment: "",
      doctor: `${currentLang.dr} ${language === "ar" ? "أحمد" : "Ahmed"}`,
    });
  };

  // فلترة السجلات بناءً على البحث
  const filteredRecords = records.filter(
    (item) =>
      item.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.treatment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            {currentLang.title}
          </h1>
          <p className="text-gray-500 mt-2">{currentLang.subTitle}</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700 transition active:scale-95"
        >
          <Plus size={20} />
          {currentLang.addRecord}
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
          <FileText className="text-blue-600" size={32} />
          <h2 className="text-3xl font-bold mt-4">{totalRecordsCount}</h2>
          <p className="text-gray-500">{currentLang.totalRecords}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
          <User className="text-green-600" size={32} />
          <h2 className="text-3xl font-bold mt-4">{uniquePatientsCount}</h2>
          <p className="text-gray-500">{currentLang.patients}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
          <CalendarDays className="text-purple-600" size={32} />
          <h2 className="text-3xl font-bold mt-4">{totalRecordsCount}</h2>
          <p className="text-gray-500">{currentLang.thisMonth}</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
          <Eye className="text-red-600" size={32} />
          <h2 className="text-3xl font-bold mt-4">{viewCount}</h2>
          <p className="text-gray-500">{currentLang.viewedToday}</p>
        </div>
      </div>

      {/* Records Table */}
      <div className="bg-white rounded-3xl shadow p-6">
        <div className="relative mb-6">
          <Search
            size={20}
            className={`absolute ${
              language === "ar" ? "right-3" : "left-3"
            } top-3.5 text-gray-400`}
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={currentLang.searchPlaceholder}
            className={`
            ${language === "ar" ? "pr-10 pl-5" : "pl-10 pr-5"}
            py-3
            border
            rounded-xl
            w-80 md:w-96
            outline-none
            focus:ring-2
            focus:ring-blue-500
            `}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-gray-500">
                <th className={`p-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                  {currentLang.thPatient}
                </th>
                <th className={`p-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                  {currentLang.thDiagnosis}
                </th>
                <th className={`p-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                  {currentLang.thTreatment}
                </th>
                <th className={`p-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                  {currentLang.thDate}
                </th>
                <th className={`p-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                  {currentLang.thDoctor}
                </th>
                <th className={`p-4 ${language === "ar" ? "text-right" : "text-left"}`}>
                  {currentLang.thAction}
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredRecords.length > 0 ? (
                filteredRecords.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-blue-50 transition"
                  >
                    <td className="p-4 font-semibold">{item.patient}</td>
                    <td className="p-4">{item.diagnosis}</td>
                    <td className="p-4">{item.treatment}</td>
                    <td className="p-4">{item.date}</td>
                    <td className="p-4">{item.doctor}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewRecord(item)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition active:scale-95"
                      >
                        {currentLang.view}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500 font-medium">
                    {currentLang.noRecords}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal 1: View Medical Record Details - عرض تفاصيل السجل */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-5 left-5 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6 border-b pb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                <Stethoscope size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {currentLang.recordDetails}
                </h2>
                <p className="text-sm text-gray-500">{selectedRecord.date}</p>
              </div>
            </div>

            <div className="space-y-4 text-gray-700">
              <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-3">
                <User className="text-blue-600" size={20} />
                <div>
                  <p className="text-xs text-gray-400">{currentLang.patientName}</p>
                  <p className="font-bold text-lg">{selectedRecord.patient}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">{currentLang.diagnosisLabel}</p>
                  <p className="font-semibold text-gray-800">{selectedRecord.diagnosis}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <p className="text-xs text-gray-400 mb-1">{currentLang.treatmentLabel}</p>
                  <p className="font-semibold text-blue-600">{selectedRecord.treatment}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">{currentLang.doctorLabel}</p>
                  <p className="font-semibold">{selectedRecord.doctor}</p>
                </div>
                <Activity className="text-green-500" size={20} />
              </div>
            </div>

            <button
              onClick={() => setSelectedRecord(null)}
              className="w-full mt-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition"
            >
              {currentLang.closeBtn}
            </button>
          </div>
        </div>
      )}

      {/* Modal 2: Add New Medical Record - إضافة سجل جديد */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-5 left-5 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentLang.addRecordTitle}
            </h2>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLang.patientName}
                </label>
                <input
                  type="text"
                  required
                  value={formData.patient}
                  onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLang.diagnosisLabel}
                </label>
                <input
                  type="text"
                  required
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {currentLang.treatmentLabel}
                </label>
                <input
                  type="text"
                  value={formData.treatment}
                  onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                  className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
                >
                  {currentLang.saveBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  {currentLang.cancelBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}