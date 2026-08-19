import AdultPatientDashboard from "./AdultPatientDashboard";
import ChildPatientDashboard from "./ChildPatientDashboard";

export default function CarePortal() {
  const patient = JSON.parse(
    localStorage.getItem("patient") || "null"
  );

  // مفيش بيانات
  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-5xl mb-4">🦷</div>

          <h1 className="text-2xl font-bold text-slate-800">
            لا توجد بيانات للمريض
          </h1>

          <p className="text-slate-500 mt-2">
            من فضلك سجل الدخول مرة أخرى
          </p>
        </div>
      </div>
    );
  }

  const age = Number(patient.age);

  console.log("Patient:", patient);
  console.log("Patient Age:", age);

  // طفل أقل من 18
  if (age < 18) {
    return <ChildPatientDashboard patient={patient} />;
  }

  // بالغ 18 أو أكثر
  return <AdultPatientDashboard patient={patient} />;
}