import { useState } from "react";

import AddPatientModal from "./AddPatientModal";
import PatientSearch from "./PatientSearch";
import PatientTable from "./PatientTable";
import PatientProfile from "./PatientProfile";

import {
  Activity,
  Sparkles,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function Patients() {
  const [patients, setPatients] = useState([]);

  const [search, setSearch] = useState("");

  const [editingPatient, setEditingPatient] = useState(null);

  const [selectedPatient, setSelectedPatient] = useState(null);

  /* =========================================================
     SAVE PATIENT
  ========================================================= */

  const savePatient = (patient) => {
    if (editingPatient) {
      setPatients((prev) =>
        prev.map((p) =>
          p.id === patient.id ? patient : p
        )
      );

      setEditingPatient(null);
    } else {
      setPatients((prev) => [
        patient,
        ...prev,
      ]);
    }
  };

  /* =========================================================
     DELETE PATIENT
  ========================================================= */

  const deletePatient = (id) => {
    setPatients((prev) =>
      prev.filter(
        (patient) => patient.id !== id
      )
    );
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredPatients = patients.filter(
    (patient) => {
      const name = String(
        patient.name || ""
      ).toLowerCase();

      const phone = String(
        patient.phone || ""
      );

      const code = String(
        patient.patientCode || ""
      ).toLowerCase();

      const query =
        search.toLowerCase();

      return (
        name.includes(query) ||
        phone.includes(search) ||
        code.includes(query)
      );
    }
  );

  /* =========================================================
     PATIENT PROFILE
  ========================================================= */

  if (selectedPatient) {
    return (
      <PatientProfile
        patient={selectedPatient}
        onBack={() =>
          setSelectedPatient(null)
        }
      />
    );
  }

  /* =========================================================
     PATIENTS PAGE
  ========================================================= */

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020810] text-white">

      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        className="
          fixed
          inset-0
          z-0
          bg-cover
          bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage:
            "url('/images/dental-clinic-bg.png')",
        }}
      />

      {/* =====================================================
          DARK OVERLAY
      ===================================================== */}

      <div className="
        fixed
        inset-0
        z-0
        bg-[#020810]/85
      " />

      {/* =====================================================
          BLUE MEDICAL GRADIENT
      ===================================================== */}

      <div
        className="
          fixed
          inset-0
          z-0
          bg-gradient-to-r
          from-[#020810]
          via-[#031321]/95
          to-[#003b5d]/55
        "
      />

      {/* =====================================================
          CYAN LIGHT - RIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          right-[-180px]
          top-[5%]
          z-0
          h-[650px]
          w-[650px]
          rounded-full
          bg-cyan-400/[0.12]
          blur-[150px]
          animate-pulse
        "
        style={{
          animationDuration: "5s",
        }}
      />

      {/* =====================================================
          BLUE LIGHT - LEFT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          left-[-220px]
          top-[30%]
          z-0
          h-[550px]
          w-[550px]
          rounded-full
          bg-blue-600/[0.13]
          blur-[140px]
        "
      />

      {/* =====================================================
          BOTTOM LIGHT
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          bottom-[-250px]
          left-[35%]
          z-0
          h-[650px]
          w-[650px]
          rounded-full
          bg-cyan-500/[0.08]
          blur-[150px]
        "
      />

      {/* =====================================================
          GRID
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          opacity-[0.035]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(34,211,238,0.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(34,211,238,0.8) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "65px 65px",
        }}
      />

      {/* =====================================================
          FLOATING PARTICLES
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <span className="absolute left-[12%] top-[18%] h-1 w-1 animate-ping rounded-full bg-cyan-400" />

        <span
          className="absolute left-[25%] top-[65%] h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300"
          style={{
            animationDuration: "3s",
          }}
        />

        <span
          className="absolute right-[18%] top-[27%] h-1 w-1 animate-ping rounded-full bg-blue-400"
          style={{
            animationDuration: "4s",
          }}
        />

        <span
          className="absolute right-[32%] top-[72%] h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400"
          style={{
            animationDuration: "2.5s",
          }}
        />

        <span
          className="absolute left-[52%] top-[12%] h-1 w-1 animate-ping rounded-full bg-cyan-300"
          style={{
            animationDuration: "5s",
          }}
        />

      </div>

      {/* =====================================================
          DECORATIVE MEDICAL LIGHT
      ===================================================== */}

      <div className="
        pointer-events-none
        fixed
        right-[8%]
        top-[22%]
        z-0
        hidden
        h-[2px]
        w-[220px]
        rotate-[-25deg]
        bg-gradient-to-r
        from-transparent
        via-cyan-400/40
        to-transparent
        blur-[1px]
        lg:block
      " />

      <div className="
        pointer-events-none
        fixed
        right-[12%]
        top-[22%]
        z-0
        hidden
        h-[140px]
        w-[140px]
        rounded-full
        border
        border-cyan-400/[0.06]
        lg:block
      " />

      <div className="
        pointer-events-none
        fixed
        right-[13.5%]
        top-[25%]
        z-0
        hidden
        h-[110px]
        w-[110px]
        rounded-full
        border
        border-cyan-400/[0.04]
        lg:block
      " />

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 min-h-screen">

        {/* ===================================================
            TOP HEADER
        =================================================== */}

        <div className="
          sticky
          top-0
          z-30
          border-b
          border-white/[0.06]
          bg-[#020810]/70
          backdrop-blur-2xl
        ">

          <div className="
            mx-auto
            flex
            max-w-[1500px]
            items-center
            justify-between
            px-4
            py-4
            sm:px-6
            lg:px-8
          ">

            {/* LEFT */}

            <div className="flex items-center gap-3">

              <div className="
                relative
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/20
                bg-cyan-400/[0.08]
                shadow-[0_0_35px_rgba(0,210,255,0.12)]
              ">

                <Activity
                  size={23}
                  className="text-cyan-400"
                />

                <span className="
                  absolute
                  right-1
                  top-1
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-cyan-400
                  shadow-[0_0_10px_rgba(34,211,238,1)]
                " />

              </div>

              <div>

                <p className="
                  text-sm
                  font-bold
                  tracking-[0.12em]
                  text-white
                ">
                  DENTAL CARE
                </p>

                <p className="
                  mt-0.5
                  text-[9px]
                  font-medium
                  tracking-[0.25em]
                  text-cyan-400/70
                ">
                  PATIENT MANAGEMENT
                </p>

              </div>

            </div>

            {/* RIGHT */}

            <div className="
              hidden
              items-center
              gap-3
              md:flex
            ">

              <div className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                px-3
                py-2
              ">

                <ShieldCheck
                  size={15}
                  className="text-emerald-400"
                />

                <span className="
                  text-[11px]
                  text-slate-400
                ">
                  Secure System
                </span>

              </div>

              <div className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-cyan-400/10
                bg-cyan-400/[0.04]
                px-3
                py-2
              ">

                <Users
                  size={15}
                  className="text-cyan-400"
                />

                <span className="
                  text-[11px]
                  text-slate-400
                ">
                  {patients.length} Patients
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================
            PAGE CONTENT
        =================================================== */}

        <main className="
          mx-auto
          w-full
          max-w-[1500px]
          px-4
          py-7
          sm:px-6
          lg:px-8
        ">

          {/* =================================================
              PAGE TITLE
          ================================================= */}

          <div className="
            mb-6
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-end
            lg:justify-between
          ">

            <div>

              <div className="
                mb-2
                flex
                items-center
                gap-2
              ">

                <Sparkles
                  size={15}
                  className="text-cyan-400"
                />

                <span className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-cyan-400/80
                ">
                  Clinical Database
                </span>

              </div>

              <h1 className="
                text-3xl
                font-bold
                tracking-tight
                text-white
                sm:text-4xl
              ">
                Patients
              </h1>

              <p className="
                mt-2
                max-w-xl
                text-sm
                leading-6
                text-slate-500
              ">
                Manage patient profiles, medical history,
                appointments and clinical records.
              </p>

            </div>

            {/* SYSTEM STATUS */}

            <div className="
              flex
              w-fit
              items-center
              gap-3
              rounded-2xl
              border
              border-cyan-400/10
              bg-[#061421]/70
              px-4
              py-3
              shadow-[0_0_35px_rgba(0,210,255,0.05)]
              backdrop-blur-xl
            ">

              <div className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-emerald-400/[0.08]
              ">

                <Activity
                  size={17}
                  className="text-emerald-400"
                />

              </div>

              <div>

                <p className="
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-slate-600
                ">
                  System Status
                </p>

                <div className="
                  mt-1
                  flex
                  items-center
                  gap-2
                ">

                  <span className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_10px_rgba(52,211,153,0.9)]
                  " />

                  <span className="
                    text-xs
                    font-medium
                    text-emerald-300
                  ">
                    All Systems Operational
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              SEARCH
          ================================================= */}

          <div className="
            relative
            z-20
            mb-5
          ">

            <PatientSearch
              search={search}
              setSearch={setSearch}
            />

          </div>

          {/* =================================================
              ADD PATIENT
          ================================================= */}

          <div className="relative z-20">

            <AddPatientModal
              onAdd={savePatient}
              editingPatient={editingPatient}
            />

          </div>

          {/* =================================================
              PATIENT TABLE
          ================================================= */}

          <div className="
            relative
            z-20
            mt-5
          ">

            <PatientTable
              patients={filteredPatients}
              onDelete={deletePatient}
              onEdit={setEditingPatient}
              onView={setSelectedPatient}
            />

          </div>

          {/* =================================================
              FOOTER SPACE
          ================================================= */}

          <div className="h-16" />

        </main>

      </div>
    </div>
  );
}