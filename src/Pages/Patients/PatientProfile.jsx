import {
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  CreditCard,
  Activity,
  ClipboardList,
  ArrowLeft,
  Clock3,
  CheckCircle2,
  CircleDollarSign,
  Pill,
  Image as ImageIcon,
} from "lucide-react";

export default function PatientProfile({ patient, onBack }) {
  if (!patient) return null;

  const appointments = Array.isArray(patient.appointments)
    ? patient.appointments
    : [];

  const payments = Array.isArray(patient.payments)
    ? patient.payments
    : [];

  const prescriptions = Array.isArray(patient.prescriptions)
    ? patient.prescriptions
    : [];

  const xrays = Array.isArray(patient.xrays)
    ? patient.xrays
    : [];

  const getStatusStyle = (status) => {
    const value = String(status || "").toLowerCase();

    if (
      value.includes("completed") ||
      value.includes("paid") ||
      value.includes("done") ||
      value.includes("success")
    ) {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-400/20";
    }

    if (
      value.includes("pending") ||
      value.includes("waiting") ||
      value.includes("scheduled")
    ) {
      return "bg-amber-500/10 text-amber-400 border-amber-400/20";
    }

    if (
      value.includes("cancel") ||
      value.includes("failed") ||
      value.includes("rejected")
    ) {
      return "bg-red-500/10 text-red-400 border-red-400/20";
    }

    return "bg-cyan-500/10 text-cyan-400 border-cyan-400/20";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020810] text-white">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/dental-clinic-bg.png')",
        }}
      />

      {/* Dark layer */}
      <div className="fixed inset-0 z-0 bg-[#020810]/88" />

      {/* Blue / Cyan atmosphere */}
      <div className="fixed inset-0 z-0 bg-gradient-to-r from-[#020810] via-[#031321]/95 to-[#003b5d]/50" />

      {/* Right glow */}
      <div className="fixed right-[-180px] top-[5%] z-0 h-[650px] w-[650px] rounded-full bg-cyan-400/10 blur-[150px]" />

      {/* Left glow */}
      <div className="fixed left-[-250px] top-[35%] z-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[150px]" />

      {/* Bottom glow */}
      <div className="fixed bottom-[-250px] left-[30%] z-0 h-[600px] w-[600px] rounded-full bg-cyan-500/[0.06] blur-[160px]" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <div className="relative z-10 min-h-screen">

        {/* =======================================================
            TOP BAR
        ======================================================= */}

        <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#020810]/75 backdrop-blur-2xl">

          <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

            {/* Logo */}

            <div className="flex items-center gap-3">

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/[0.08] shadow-[0_0_30px_rgba(0,210,255,0.12)]">

                <Activity
                  size={23}
                  strokeWidth={1.8}
                  className="text-cyan-400"
                />

                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />

              </div>

              <div>
                <h2 className="text-sm font-bold tracking-[0.08em] text-white">
                  DENTAL CARE
                </h2>

                <p className="mt-0.5 text-[9px] font-medium tracking-[0.22em] text-cyan-400/70">
                  MANAGEMENT SYSTEM
                </p>
              </div>

            </div>

            {/* Page title */}

            <div className="hidden text-right sm:block">

              <p className="text-sm font-medium text-slate-300">
                Patient Management
              </p>

              <p className="mt-0.5 text-[11px] text-slate-600">
                Patient Profile
              </p>

            </div>

          </div>

        </header>

        {/* =======================================================
            MAIN
        ======================================================= */}

        <main className="mx-auto w-full max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">

          {/* =====================================================
              BACK BUTTON
          ===================================================== */}

          <button
            type="button"
            onClick={onBack}
            className="
              group
              mb-6
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-cyan-400/15
              bg-white/[0.035]
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-300
              shadow-[0_10px_30px_rgba(0,0,0,0.18)]
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-cyan-400/30
              hover:bg-cyan-400/[0.08]
              hover:text-white
            "
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            Back to Patients
          </button>

          {/* =====================================================
              PATIENT HEADER
          ===================================================== */}

          <section
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-cyan-400/15
              bg-[#061421]/70
              p-5
              shadow-[0_25px_90px_rgba(0,0,0,0.45)]
              backdrop-blur-2xl
              sm:p-7
            "
          >

            {/* Glow */}

            <div className="pointer-events-none absolute right-[-120px] top-[-140px] h-[380px] w-[380px] rounded-full bg-cyan-400/[0.08] blur-[120px]" />

            <div className="pointer-events-none absolute bottom-[-160px] left-[25%] h-[300px] w-[300px] rounded-full bg-blue-600/[0.06] blur-[100px]" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Avatar */}

              <div
                className="
                  relative
                  flex
                  h-20
                  w-20
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  border
                  border-cyan-400/20
                  bg-gradient-to-br
                  from-cyan-400/20
                  via-blue-500/10
                  to-transparent
                  shadow-[0_0_45px_rgba(0,210,255,0.12)]
                "
              >

                <User
                  size={38}
                  strokeWidth={1.4}
                  className="text-cyan-400"
                />

                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

              </div>

              {/* Details */}

              <div className="min-w-0 flex-1">

                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-400">
                  Patient Profile
                </p>

                <h1 className="truncate text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {patient.name || "Unknown Patient"}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-3">

                  <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/[0.08] px-3 py-1.5 text-[11px] font-semibold text-cyan-300">
                    {patient.patientCode || "NO CODE"}
                  </span>

                  {patient.gender && (
                    <span className="text-xs text-slate-500">
                      {patient.gender}
                    </span>
                  )}

                  {patient.age && (
                    <span className="text-xs text-slate-500">
                      {patient.age} years old
                    </span>
                  )}

                </div>

              </div>

              {/* Status */}

              <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-2">

                <span className="relative flex h-2 w-2">

                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

                </span>

                <span className="text-xs font-medium text-emerald-300">
                  Active Patient
                </span>

              </div>

            </div>

          </section>

          {/* =====================================================
              PERSONAL + MEDICAL
          ===================================================== */}

          <div className="mt-5 grid gap-5 lg:grid-cols-2">

            {/* Personal Information */}

            <section className="rounded-3xl border border-white/[0.07] bg-[#071521]/75 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl">

              <SectionTitle
                icon={<User size={19} />}
                title="Personal Information"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                <InfoItem
                  icon={<User size={17} />}
                  label="Age"
                  value={patient.age || "-"}
                />

                <InfoItem
                  icon={<Phone size={17} />}
                  label="Phone"
                  value={patient.phone || "-"}
                />

                <InfoItem
                  icon={<MapPin size={17} />}
                  label="Address"
                  value={patient.address || "-"}
                />

                <InfoItem
                  icon={<User size={17} />}
                  label="Gender"
                  value={patient.gender || "-"}
                />

              </div>

            </section>

            {/* Medical History */}

            <section className="rounded-3xl border border-white/[0.07] bg-[#071521]/75 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl">

              <SectionTitle
                icon={<Activity size={19} />}
                title="Medical History"
              />

              <div className="mt-5 min-h-[125px] rounded-2xl border border-white/[0.06] bg-black/20 p-4">

                <p className="whitespace-pre-line text-sm leading-7 text-slate-300">
                  {patient.medicalHistory ||
                    "No medical history has been recorded for this patient."}
                </p>

              </div>

            </section>

          </div>

          {/* =====================================================
              DOCTOR NOTES
          ===================================================== */}

          <section className="mt-5 rounded-3xl border border-white/[0.07] bg-[#071521]/75 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl">

            <SectionTitle
              icon={<ClipboardList size={19} />}
              title="Doctor Notes"
            />

            <div className="mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.025] p-5">

              <p className="whitespace-pre-line text-sm leading-7 text-slate-300">
                {patient.doctorNotes ||
                  "No doctor notes have been added yet."}
              </p>

            </div>

          </section>

          {/* =====================================================
              APPOINTMENTS + PAYMENTS
          ===================================================== */}

          <div className="mt-5 grid gap-5 xl:grid-cols-2">

            {/* APPOINTMENTS */}

            <section className="rounded-3xl border border-white/[0.07] bg-[#071521]/75 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl">

              <SectionTitle
                icon={<Calendar size={19} />}
                title="Appointments"
                count={appointments.length}
              />

              {appointments.length === 0 ? (

                <EmptyState
                  icon={<Calendar size={24} />}
                  text="No appointments"
                />

              ) : (

                <div className="mt-5 space-y-3">

                  {appointments.map((item, index) => (

                    <div
                      key={item.id ?? index}
                      className="
                        rounded-2xl
                        border
                        border-white/[0.06]
                        bg-black/15
                        p-4
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        hover:border-cyan-400/20
                        hover:bg-cyan-400/[0.025]
                        hover:shadow-[0_10px_35px_rgba(0,210,255,0.04)]
                      "
                    >

                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <div className="grid flex-1 gap-4 sm:grid-cols-2">

                          <DataRow
                            icon={<Calendar size={16} />}
                            label="Date"
                            value={item.date || "-"}
                          />

                          <DataRow
                            icon={<Clock3 size={16} />}
                            label="Time"
                            value={item.time || "-"}
                          />

                        </div>

                        <span
                          className={`
                            inline-flex
                            w-fit
                            rounded-lg
                            border
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            ${getStatusStyle(item.status)}
                          `}
                        >
                          {item.status || "Unknown"}
                        </span>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </section>

            {/* PAYMENTS */}

            <section className="rounded-3xl border border-white/[0.07] bg-[#071521]/75 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl">

              <SectionTitle
                icon={<CreditCard size={19} />}
                title="Payments"
                count={payments.length}
              />

              {payments.length === 0 ? (

                <EmptyState
                  icon={<CreditCard size={24} />}
                  text="No payments"
                />

              ) : (

                <div className="mt-5 space-y-3">

                  {payments.map((pay, index) => (

                    <div
                      key={pay.id ?? index}
                      className="
                        flex
                        flex-col
                        gap-4
                        rounded-2xl
                        border
                        border-white/[0.06]
                        bg-black/15
                        p-4
                        transition-all
                        duration-300
                        hover:border-cyan-400/20
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                      "
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.07]">

                          <CircleDollarSign
                            size={19}
                            className="text-cyan-400"
                          />

                        </div>

                        <div>

                          <p className="text-[10px] uppercase tracking-wider text-slate-600">
                            Amount
                          </p>

                          <p className="mt-1 font-semibold text-white">
                            {pay.amount ?? "-"}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`
                          inline-flex
                          w-fit
                          items-center
                          gap-1.5
                          rounded-lg
                          border
                          px-3
                          py-1.5
                          text-xs
                          font-semibold
                          ${getStatusStyle(pay.status)}
                        `}
                      >

                        <CheckCircle2 size={13} />

                        {pay.status || "Unknown"}

                      </span>

                    </div>

                  ))}

                </div>

              )}

            </section>

          </div>

          {/* =====================================================
              PRESCRIPTIONS
          ===================================================== */}

          <section className="mt-5 rounded-3xl border border-white/[0.07] bg-[#071521]/75 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl">

            <SectionTitle
              icon={<FileText size={19} />}
              title="Prescriptions"
              count={prescriptions.length}
            />

            {prescriptions.length === 0 ? (

              <EmptyState
                icon={<Pill size={24} />}
                text="No prescriptions"
              />

            ) : (

              <div className="mt-5 grid gap-3 md:grid-cols-2">

                {prescriptions.map((pre, index) => (

                  <div
                    key={pre.id ?? index}
                    className="
                      flex
                      gap-4
                      rounded-2xl
                      border
                      border-white/[0.06]
                      bg-black/15
                      p-4
                      transition-all
                      duration-300
                      hover:border-cyan-400/20
                      hover:bg-cyan-400/[0.025]
                    "
                  >

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/10 bg-blue-500/10">

                      <Pill
                        size={18}
                        className="text-blue-400"
                      />

                    </div>

                    <p className="whitespace-pre-line text-sm leading-6 text-slate-300">
                      {pre.text || "No prescription details"}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </section>

          {/* =====================================================
              X-RAYS
          ===================================================== */}

          <section className="mt-5 rounded-3xl border border-white/[0.07] bg-[#071521]/75 p-5 shadow-[0_15px_50px_rgba(0,0,0,0.2)] backdrop-blur-2xl">

            <SectionTitle
              icon={<ImageIcon size={19} />}
              title="X-Ray Images"
              count={xrays.length}
            />

            {xrays.length === 0 ? (

              <EmptyState
                icon={<Activity size={24} />}
                text="No X-Ray images"
              />

            ) : (

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                {xrays.map((img, index) => (

                  <div
                    key={img.id ?? index}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-black/30
                      shadow-[0_10px_35px_rgba(0,0,0,0.25)]
                    "
                  >

                    {img.url ? (

                      <img
                        src={img.url}
                        alt={`Patient X-Ray ${index + 1}`}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling.style.display =
                            "flex";
                        }}
                        className="
                          h-56
                          w-full
                          object-cover
                          opacity-90
                          transition
                          duration-500
                          group-hover:scale-105
                          group-hover:opacity-100
                        "
                      />

                    ) : null}

                    {/* Image fallback */}

                    <div
                      className={`${img.url ? "hidden" : "flex"} h-56 w-full flex-col items-center justify-center gap-3 bg-[#050d15]`}
                    >

                      <ImageIcon
                        size={30}
                        className="text-slate-700"
                      />

                      <span className="text-xs text-slate-600">
                        X-Ray unavailable
                      </span>

                    </div>

                    {/* Gradient */}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020810]/90 via-transparent to-transparent" />

                    {/* Label */}

                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/55 px-3 py-1.5 backdrop-blur-md">

                      <ImageIcon
                        size={13}
                        className="text-cyan-400"
                      />

                      <span className="text-xs font-medium text-white">
                        X-Ray {index + 1}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </section>

          <div className="h-12" />

        </main>

      </div>
    </div>
  );
}

/* =============================================================
   SECTION TITLE
============================================================= */

function SectionTitle({ icon, title, count }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.08] text-cyan-400">
          {icon}
        </div>

        <h2 className="text-base font-semibold text-white">
          {title}
        </h2>

      </div>

      {typeof count === "number" && (
        <span className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-slate-500">
          {count}
        </span>
      )}

    </div>
  );
}

/* =============================================================
   INFO ITEM
============================================================= */

function InfoItem({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-black/15 p-4 transition-all duration-300 hover:border-cyan-400/15 hover:bg-cyan-400/[0.02]">

      <div className="mb-2 flex items-center gap-2 text-slate-500">

        <span className="text-cyan-400/80">
          {icon}
        </span>

        <span className="text-[10px] uppercase tracking-[0.14em]">
          {label}
        </span>

      </div>

      <p className="break-words text-sm font-medium text-slate-200">
        {value}
      </p>

    </div>
  );
}

/* =============================================================
   DATA ROW
============================================================= */

function DataRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3">

      <div className="text-cyan-400/70">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[10px] uppercase tracking-wider text-slate-600">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm text-slate-300">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =============================================================
   EMPTY STATE
============================================================= */

function EmptyState({ icon, text }) {
  return (
    <div className="mt-5 flex min-h-[130px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-black/10">

      <div className="mb-3 text-slate-600">
        {icon}
      </div>

      <p className="text-sm text-slate-500">
        {text}
      </p>

    </div>
  );
}