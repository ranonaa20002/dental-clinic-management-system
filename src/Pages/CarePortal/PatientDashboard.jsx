import ChildPatientDashboard from "./ChildPatientDashboard";
import AdultPatientDashboard from "./AdultPatientDashboard";

export default function PatientDashboard() {
  // مؤقتًا بنجيب بيانات المريض من localStorage
  const patient = JSON.parse(
    localStorage.getItem("patient")
  );

  // لو مفيش بيانات
  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-800">
            لا توجد بيانات للمريض
          </h1>

          <p className="text-slate-500 mt-2">
            Please login again
          </p>
        </div>
      </div>
    );
  }

  const age = Number(patient.age);

  // طفل أقل من 18 سنة
  if (age < 18) {
    return <ChildPatientDashboard patient={patient} />;
  }

  // بالغ
  return <AdultPatientDashboard patient={patient} />;
}