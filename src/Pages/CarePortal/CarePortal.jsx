import { useEffect, useState } from "react";
import {
  Activity,
  ShieldCheck,
  Stethoscope,
  UserRound,
  AlertCircle,
} from "lucide-react";

import AdultPatientDashboard from "./AdultPatientDashboard";
import ChildPatientDashboard from "./ChildPatientDashboard";

/* =========================================================
   CARE PORTAL
========================================================= */

export default function CarePortal() {
  const [patient, setPatient] = useState(undefined);

  /* =======================================================
     LOAD PATIENT
  ======================================================= */

  useEffect(() => {
    try {
      const savedPatient = localStorage.getItem("patient");

      if (!savedPatient) {
        setPatient(null);
        return;
      }

      const parsedPatient = JSON.parse(savedPatient);

      if (!parsedPatient || typeof parsedPatient !== "object") {
        setPatient(null);
        return;
      }

      setPatient(parsedPatient);
    } catch (error) {
      console.error("Failed to load patient:", error);
      setPatient(null);
    }
  }, []);

  /* =======================================================
     LOADING
  ======================================================= */

  if (patient === undefined) {
    return (
      <div
        dir="rtl"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010711] text-white"
      >
        {/* BACKGROUND */}

        <div
          className="pointer-events-none fixed inset-0 bg-cover bg-center opacity-[0.12]"
          style={{
            backgroundImage:
              "url('/images/dental-clinic-bg.png')",
          }}
        />

        <div className="pointer-events-none fixed inset-0 bg-[#010711]/90" />

        {/* GLOWS */}

        <div className="pointer-events-none fixed right-[-150px] top-[-150px] h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]" />

        <div className="pointer-events-none fixed bottom-[-180px] left-[-120px] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />

        {/* GRID */}

        <div
          className="pointer-events-none fixed inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.8) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* LOADING CARD */}

        <div className="relative z-10 w-[90%] max-w-sm rounded-3xl border border-cyan-400/15 bg-[#061321]/80 p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,.5)] backdrop-blur-2xl">
          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
            <Stethoscope
              size={32}
              className="text-cyan-300"
            />

            <span className="absolute inset-[-8px] rounded-2xl border border-cyan-400/10 animate-pulse" />

            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#22d3ee]" />
          </div>

          <h1 className="text-lg font-black text-white">
            DENTAL
            <span className="text-cyan-400">
              CARE
            </span>
          </h1>

          <p className="mt-1 text-[9px] tracking-[0.3em] text-slate-600">
            PATIENT PORTAL
          </p>

          <div className="mx-auto mt-7 h-1.5 w-32 overflow-hidden rounded-full bg-white/5">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,.6)]" />
          </div>

          <p className="mt-4 text-xs text-slate-500">
            جاري تحميل الملف الطبي...
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     NO PATIENT
  ======================================================= */

  if (!patient) {
    return (
      <div
        dir="rtl"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010711] text-white"
      >
        {/* BACKGROUND IMAGE */}

        <div
          className="pointer-events-none fixed inset-0 bg-cover bg-center opacity-[0.12]"
          style={{
            backgroundImage:
              "url('/images/dental-clinic-bg.png')",
          }}
        />

        {/* DARK OVERLAY */}

        <div className="pointer-events-none fixed inset-0 bg-[#010711]/90" />

        {/* BLUE GLOW */}

        <div className="pointer-events-none fixed right-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="pointer-events-none fixed bottom-[-150px] left-[-100px] h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[130px]" />

        {/* GRID */}

        <div
          className="pointer-events-none fixed inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.7) 1px, transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />

        {/* CARD */}

        <div className="relative z-10 w-[90%] max-w-md overflow-hidden rounded-3xl border border-cyan-400/10 bg-[#061321]/85 p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,.6)] backdrop-blur-2xl">
          {/* CARD GLOW */}

          <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-400/10 blur-[70px]" />

          <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10">
            <AlertCircle
              size={32}
              className="text-red-300"
            />
          </div>

          <p className="text-[9px] font-bold tracking-[0.3em] text-cyan-400">
            DENTAL CARE SYSTEM
          </p>

          <h1 className="mt-3 text-xl font-black text-white">
            لا توجد بيانات للمريض
          </h1>

          <p className="mx-auto mt-3 max-w-xs text-xs leading-6 text-slate-500">
            لم يتم العثور على بيانات المريض الحالية.
            <br />
            من فضلك سجل الدخول مرة أخرى للوصول إلى
            ملفك الطبي.
          </p>

          {/* STATUS */}

          <div className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-yellow-400/15 bg-yellow-400/5 px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_10px_#facc15]" />

            <span className="text-[10px] font-semibold text-yellow-300">
              PATIENT SESSION NOT FOUND
            </span>
          </div>

          {/* SECURITY */}

          <div className="mt-7 flex items-center justify-center gap-2 text-[9px] text-slate-700">
            <ShieldCheck size={12} />

            <span>
              Secure Medical Patient Portal
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     PATIENT AGE
  ======================================================= */

  const age = Number(patient.age);

  /*
    لو السن رقم صحيح:
      أقل من 18  → Child
      18 أو أكثر → Adult
  */

  console.log("Patient:", patient);
  console.log("Patient Age:", age);

  /* =======================================================
     INVALID AGE
  ======================================================= */

  if (!Number.isFinite(age)) {
    return (
      <div
        dir="rtl"
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#010711] text-white"
      >
        {/* BACKGROUND */}

        <div
          className="pointer-events-none fixed inset-0 bg-cover bg-center opacity-[0.10]"
          style={{
            backgroundImage:
              "url('/images/dental-clinic-bg.png')",
          }}
        />

        <div className="pointer-events-none fixed inset-0 bg-[#010711]/90" />

        {/* GLOW */}

        <div className="pointer-events-none fixed left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-[130px]" />

        {/* CARD */}

        <div className="relative z-10 w-[90%] max-w-md rounded-3xl border border-yellow-400/10 bg-[#061321]/85 p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,.5)] backdrop-blur-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-yellow-400/20 bg-yellow-400/10">
            <UserRound
              size={28}
              className="text-yellow-300"
            />
          </div>

          <h1 className="mt-5 text-lg font-black text-white">
            بيانات المريض غير مكتملة
          </h1>

          <p className="mt-3 text-xs leading-6 text-slate-500">
            لم يتم تحديد عمر المريض بشكل صحيح،
            لذلك لا يمكن تحديد نوع لوحة المريض.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/15 bg-yellow-400/5 px-4 py-2">
            <Activity
              size={13}
              className="text-yellow-300"
            />

            <span className="text-[10px] text-yellow-300">
              PATIENT DATA INCOMPLETE
            </span>
          </div>
        </div>
      </div>
    );
  }

  /* =======================================================
     CHILD PATIENT
  ======================================================= */

  if (age < 18) {
    return (
      <ChildPatientDashboard
        patient={patient}
      />
    );
  }

  /* =======================================================
     ADULT PATIENT
  ======================================================= */

  return (
    <AdultPatientDashboard
      patient={patient}
    />
  );
}