import {
  Users,
  CalendarDays,
  DollarSign,
  Clock3,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

export default function Dashboard() {
  const appointments = [
    {
      initials: "AM",
      name: "Ahmed Mohamed",
      type: "Root Canal Treatment",
      time: "09:30 AM",
      status: "Completed",
      room: "Room 1",
    },
    {
      initials: "SK",
      name: "Sara Khaled",
      type: "Orthodontic Follow-up",
      time: "10:00 AM",
      status: "In Progress",
      room: "Room 2",
    },
    {
      initials: "MH",
      name: "Mahmoud Hassan",
      type: "Dental Checkup",
      time: "10:30 AM",
      status: "Waiting",
      room: "Room 1",
    },
    {
      initials: "FE",
      name: "Fatma Ebrahim",
      type: "Crown Placement",
      time: "02:00 PM",
      status: "Waiting",
      room: "Room 2",
    },
  ];

  const upcoming = [
    {
      initials: "OA",
      name: "Omar Ali",
      type: "Teeth Whitening",
      date: "23 Jul 2026",
      time: "10:00 AM",
    },
    {
      initials: "NH",
      name: "Noor Hassan",
      type: "Dental Implant",
      date: "23 Jul 2026",
      time: "01:00 PM",
    },
    {
      initials: "YA",
      name: "Youssef Ahmed",
      type: "Scaling & Polishing",
      date: "24 Jul 2026",
      time: "11:30 AM",
    },
  ];

  return (
    <div className="dashboard-page min-h-full px-5 py-5 lg:px-7 lg:py-6">
      <style>{`
        /* =====================================================
           DASHBOARD ANIMATIONS
        ===================================================== */

        @keyframes dashboardToothFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }

          50% {
            transform: translateY(-10px) scale(1.012);
          }
        }

        @keyframes dashboardToothGlow {
          0%,
          100% {
            filter:
              drop-shadow(0 0 7px rgba(80, 225, 255, 0.65))
              drop-shadow(0 0 24px rgba(0, 145, 255, 0.35));
          }

          50% {
            filter:
              drop-shadow(0 0 14px rgba(150, 245, 255, 0.95))
              drop-shadow(0 0 42px rgba(0, 160, 255, 0.7));
          }
        }

        @keyframes dashboardOrbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes dashboardOrbitReverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }

          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        @keyframes dashboardPlatform {
          0%,
          100% {
            transform: translateX(-50%) scaleX(0.96);
            opacity: 0.45;
          }

          50% {
            transform: translateX(-50%) scaleX(1.1);
            opacity: 0.9;
          }
        }

        @keyframes dashboardBeam {
          0%,
          100% {
            transform: translateX(-50%) scaleY(0.75);
            opacity: 0.25;
          }

          50% {
            transform: translateX(-50%) scaleY(1.1);
            opacity: 0.7;
          }
        }

        @keyframes dashboardParticle {
          0% {
            transform: translate(0, 12px) scale(0.4);
            opacity: 0;
          }

          20% {
            opacity: 1;
          }

          70% {
            opacity: 0.8;
          }

          100% {
            transform: translate(0, -75px) scale(1);
            opacity: 0;
          }
        }

        @keyframes dashboardParticleLeft {
          0% {
            transform: translate(0, 15px) scale(0.4);
            opacity: 0;
          }

          25% {
            opacity: 1;
          }

          100% {
            transform: translate(-35px, -80px) scale(1);
            opacity: 0;
          }
        }

        @keyframes dashboardParticleRight {
          0% {
            transform: translate(0, 15px) scale(0.4);
            opacity: 0;
          }

          25% {
            opacity: 1;
          }

          100% {
            transform: translate(38px, -85px) scale(1);
            opacity: 0;
          }
        }

        @keyframes dashboardSpark {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(0.7);
          }

          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        @keyframes dashboardWave {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-3px);
          }
        }

        .dashboard-tooth {
          animation:
            dashboardToothFloat 4.5s ease-in-out infinite,
            dashboardToothGlow 3.2s ease-in-out infinite;
          transform-origin: center center;
        }

        .dashboard-orbit-1 {
          animation: dashboardOrbit 10s linear infinite;
        }

        .dashboard-orbit-2 {
          animation: dashboardOrbitReverse 13s linear infinite;
        }

        .dashboard-orbit-3 {
          animation: dashboardOrbit 8s linear infinite;
        }

        .dashboard-platform {
          animation: dashboardPlatform 3s ease-in-out infinite;
        }

        .dashboard-beam {
          animation: dashboardBeam 2.8s ease-in-out infinite;
        }

        .dashboard-particle {
          animation: dashboardParticle 3.8s ease-out infinite;
        }

        .dashboard-particle-left {
          animation: dashboardParticleLeft 4.2s ease-out infinite;
        }

        .dashboard-particle-right {
          animation: dashboardParticleRight 4s ease-out infinite;
        }

        .dashboard-spark {
          animation: dashboardSpark 2.4s ease-in-out infinite;
        }

        .dashboard-wave {
          animation: dashboardWave 2.5s ease-in-out infinite;
        }

        .dashboard-scroll::-webkit-scrollbar {
          width: 5px;
        }

        .dashboard-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .dashboard-scroll::-webkit-scrollbar-thumb {
          background: rgba(40, 210, 240, 0.15);
          border-radius: 999px;
        }
      `}</style>

      {/* =====================================================
          WELCOME
      ===================================================== */}

      <div className="mb-4">
        <h1 className="text-[19px] lg:text-[21px] font-semibold tracking-tight text-white">
          Welcome back, Dr. Ahmed 👋
        </h1>

        <p className="text-[8px] lg:text-[9px] text-white/35 mt-1">
          Here's what's happening in your clinic today.
        </p>
      </div>

      {/* =====================================================
          MAIN TOP AREA
      ===================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_315px] gap-4 mb-4">
        {/* ===================================================
            LEFT
        =================================================== */}

        <div className="min-w-0">
          {/* STAT CARDS */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <StatCard
              icon={<Users size={17} />}
              title="Today's Patients"
              value="24"
              change="+12%"
              positive
              iconClass="text-blue-400"
              bg="bg-blue-500/10"
            />

            <StatCard
              icon={<CalendarDays size={17} />}
              title="Appointments"
              value="18"
              change="+8%"
              positive
              iconClass="text-cyan-400"
              bg="bg-cyan-500/10"
            />

            <StatCard
              icon={<DollarSign size={17} />}
              title="Today's Revenue"
              value="$1,450"
              change="+19%"
              positive
              iconClass="text-violet-400"
              bg="bg-violet-500/10"
            />

            <StatCard
              icon={<Clock3 size={17} />}
              title="Waiting List"
              value="3"
              change="-2%"
              positive={false}
              iconClass="text-amber-400"
              bg="bg-amber-500/10"
            />
          </div>

          {/* APPOINTMENTS */}

          <div
            className="
              rounded-xl
              border
              border-[#103448]
              bg-[#04131e]
              overflow-hidden
              shadow-[0_10px_35px_rgba(0,0,0,.18)]
            "
          >
            <div
              className="
                px-4
                py-3
                flex
                items-center
                justify-between
                border-b
                border-white/[0.045]
              "
            >
              <div>
                <h2 className="text-[10px] font-semibold text-white">
                  Today's Appointments
                </h2>

                <p className="text-[6px] text-white/25 mt-1">
                  Your clinic schedule
                </p>
              </div>

              <button
                className="
                  text-[7px]
                  text-cyan-300
                  px-2.5
                  py-1
                  rounded-md
                  border
                  border-cyan-400/20
                  bg-cyan-400/[0.04]
                  hover:bg-cyan-400/[0.09]
                  transition
                "
              >
                View All
              </button>
            </div>

            {/* HEADER */}

            <div
              className="
                grid
                grid-cols-[1.2fr_1.35fr_.65fr_.75fr_.55fr]
                gap-2
                px-4
                py-2
                text-[7px]
                text-white/25
                border-b
                border-white/[0.035]
              "
            >
              <span>Patient</span>
              <span>Type</span>
              <span>Time</span>
              <span>Status</span>
              <span>Room</span>
            </div>

            {/* ROWS */}

            {appointments.map((item) => (
              <div
                key={item.name}
                className="
                  grid
                  grid-cols-[1.2fr_1.35fr_.65fr_.75fr_.55fr]
                  gap-2
                  items-center
                  px-4
                  py-2.5
                  border-b
                  border-white/[0.025]
                  last:border-0
                  hover:bg-cyan-400/[0.015]
                  transition
                "
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className="
                      w-6
                      h-6
                      rounded-full
                      bg-[#10334a]
                      border
                      border-cyan-300/10
                      flex
                      items-center
                      justify-center
                      text-[6px]
                      text-cyan-100
                      shrink-0
                    "
                  >
                    {item.initials}
                  </div>

                  <span className="text-[7px] text-white/75 truncate">
                    {item.name}
                  </span>
                </div>

                <span className="text-[7px] text-white/40 truncate">
                  {item.type}
                </span>

                <span className="text-[7px] text-white/55">
                  {item.time}
                </span>

                <Status status={item.status} />

                <span className="text-[7px] text-white/45">
                  {item.room}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            TOOTH VISUAL
        =================================================== */}

        <div
          className="
            relative
            hidden
            xl:flex
            min-h-[330px]
            rounded-xl
            overflow-hidden
            border
            border-[#0b3449]
            bg-[#020f1b]
            items-center
            justify-center
            shadow-[inset_0_0_50px_rgba(0,100,150,.08)]
          "
        >
          {/* BACKGROUND */}

          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_50%_45%,rgba(0,190,255,.11),transparent_38%)]
            "
          />

          <div
            className="
              absolute
              top-[-100px]
              left-1/2
              -translate-x-1/2
              w-[330px]
              h-[260px]
              rounded-full
              bg-cyan-400/[0.05]
              blur-[85px]
            "
          />

          {/* GRID */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.07]
              bg-[linear-gradient(rgba(45,200,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(45,200,255,.15)_1px,transparent_1px)]
              bg-[size:35px_35px]
            "
          />

          {/* STATUS */}

          <div
            className="
              absolute
              top-3
              end-3
              w-[92px]
              rounded-lg
              border
              border-white/[0.06]
              bg-[#061722]/75
              backdrop-blur-md
              p-2.5
              z-40
            "
          >
            <p className="text-[6px] text-white/30">
              Clinic Status
            </p>

            <div className="flex items-center gap-1 mt-1.5">
              <span
                className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_8px_#34d399]
                "
              />

              <span className="text-[8px] text-emerald-400 font-semibold">
                Active
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <MiniStatus
                label="Operations"
                value="4/4"
              />

              <MiniStatus
                label="Staff On Duty"
                value="6"
              />

              <MiniStatus
                label="AI Analysis"
                value="98%"
              />
            </div>
          </div>

          {/* TOOTH */}

          <DentalTooth />
        </div>
      </div>

      {/* =====================================================
          LOWER CARDS
      ===================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* REVENUE */}

        <div
          className="
            rounded-xl
            border
            border-[#103448]
            bg-[#04131e]
            p-4
            min-h-[190px]
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[10px] font-semibold text-white">
                Revenue Overview
              </h2>

              <p className="text-[7px] text-white/25 mt-1">
                Weekly performance
              </p>
            </div>

            <button
              className="
                text-[7px]
                text-white/45
                px-2
                py-1
                rounded-md
                border
                border-white/[0.06]
              "
            >
              This Week⌄
            </button>
          </div>

          <div className="relative h-[105px] mt-4">
            <div className="absolute inset-0 flex flex-col justify-between">
              {[1, 2, 3, 4].map((x) => (
                <div
                  key={x}
                  className="border-t border-white/[0.035]"
                />
              ))}
            </div>

            <svg
              viewBox="0 0 500 120"
              className="
                absolute
                inset-0
                w-full
                h-full
                overflow-visible
              "
            >
              <defs>
                <linearGradient
                  id="revenueFillDashboard"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#16d8ff"
                    stopOpacity=".20"
                  />

                  <stop
                    offset="100%"
                    stopColor="#16d8ff"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                d="
                  M0 92
                  C25 72 38 88 65 80
                  C90 72 105 93 132 73
                  C157 55 174 69 201 61
                  C230 52 243 75 269 45
                  C296 16 317 32 341 63
                  C365 91 385 77 410 51
                  C435 27 461 48 500 44
                  L500 120
                  L0 120
                  Z
                "
                fill="url(#revenueFillDashboard)"
              />

              <path
                d="
                  M0 92
                  C25 72 38 88 65 80
                  C90 72 105 93 132 73
                  C157 55 174 69 201 61
                  C230 52 243 75 269 45
                  C296 16 317 32 341 63
                  C365 91 385 77 410 51
                  C435 27 461 48 500 44
                "
                fill="none"
                stroke="#28dfff"
                strokeWidth="2"
              />

              <circle
                cx="269"
                cy="45"
                r="3.5"
                fill="#28dfff"
              />
            </svg>

            <div
              className="
                absolute
                top-0
                left-[53%]
                -translate-x-1/2
                px-2
                py-1
                rounded-md
                bg-[#07554f]
                text-[7px]
                text-[#42ffd8]
              "
            >
              $3,450
            </div>
          </div>

          <div className="flex justify-between text-[6px] text-white/25 mt-1">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* TREATMENT */}

        <div
          className="
            rounded-xl
            border
            border-[#103448]
            bg-[#04131e]
            p-4
            min-h-[190px]
          "
        >
          <h2 className="text-[10px] font-semibold">
            Treatment Distribution
          </h2>

          <div className="flex items-center justify-center gap-5 mt-5">
            <div className="relative">
              <div
                className="
                  w-[112px]
                  h-[112px]
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
                style={{
                  background:
                    "conic-gradient(#19dfff 0 42%, #28b8cf 42% 72%, #7955e8 72% 88%, #a873ff 88% 95%, #e4a72d 95% 100%)",
                }}
              >
                <div
                  className="
                    w-[72px]
                    h-[72px]
                    rounded-full
                    bg-[#061722]
                    flex
                    flex-col
                    items-center
                    justify-center
                  "
                >
                  <span className="text-[17px] font-bold">
                    128
                  </span>

                  <span className="text-[6px] text-white/30">
                    Total
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Legend
                color="bg-cyan-400"
                label="General Dentistry"
                value="42%"
              />

              <Legend
                color="bg-cyan-500"
                label="Orthodontics"
                value="35%"
              />

              <Legend
                color="bg-violet-500"
                label="Cosmetic"
                value="22%"
              />

              <Legend
                color="bg-purple-400"
                label="Oral Surgery"
                value="17%"
              />

              <Legend
                color="bg-amber-400"
                label="Other"
                value="5%"
              />
            </div>
          </div>
        </div>

        {/* UPCOMING */}

        <div
          className="
            rounded-xl
            border
            border-[#103448]
            bg-[#04131e]
            p-4
            min-h-[190px]
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-semibold">
              Upcoming Appointments
            </h2>

            <button className="text-[7px] text-cyan-300">
              View All
            </button>
          </div>

          <div className="mt-3 space-y-2.5">
            {upcoming.map((item) => (
              <div
                key={item.name}
                className="
                  flex
                  items-center
                  gap-2.5
                  pb-2.5
                  border-b
                  border-white/[0.035]
                  last:border-0
                "
              >
                <div
                  className="
                    w-7
                    h-7
                    rounded-full
                    bg-[#123044]
                    border
                    border-cyan-300/10
                    flex
                    items-center
                    justify-center
                    text-[6px]
                    text-cyan-100
                  "
                >
                  {item.initials}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[7px] font-semibold text-white/75">
                    {item.name}
                  </p>

                  <p className="text-[6px] text-white/30 mt-0.5">
                    {item.type}
                  </p>
                </div>

                <div className="text-end">
                  <p className="text-[6px] text-white/45">
                    {item.date}
                  </p>

                  <p className="text-[6px] text-cyan-300/55 mt-0.5">
                    {item.time}
                  </p>
                </div>

                <CalendarDays
                  size={12}
                  className="text-white/25"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =====================================================
          AI ASSISTANT
      ===================================================== */}

      <div
        className="
          mt-4
          min-h-[65px]
          rounded-xl
          border
          border-cyan-400/15
          bg-gradient-to-r
          from-[#061a27]
          via-[#06202b]
          to-[#061321]
          overflow-hidden
          relative
          flex
          items-center
          px-4
        "
      >
        <div
          className="
            absolute
            end-[-30px]
            top-[-80px]
            w-[230px]
            h-[160px]
            rounded-full
            bg-cyan-400/10
            blur-[55px]
          "
        />

        <div
          className="
            w-9
            h-9
            rounded-full
            border
            border-cyan-300/30
            bg-cyan-400/[0.06]
            flex
            items-center
            justify-center
            text-cyan-300
            me-3
            shrink-0
          "
        >
          <Sparkles size={16} />
        </div>

        <div className="min-w-[150px]">
          <p className="text-[9px] font-semibold">
            AI Assistant
          </p>

          <p className="text-[6px] text-white/30 mt-1">
            Powered by Dental AI
          </p>
        </div>

        <div className="hidden sm:block ms-8">
          <p className="text-[8px] font-semibold text-white/70">
            Ready to assist you
          </p>

          <p className="text-[6px] text-white/30 mt-1">
            Ask me anything about diagnoses,
            treatments, or patient care...
          </p>
        </div>

        <div className="ms-auto flex items-center gap-4">
          <svg
            width="150"
            height="38"
            viewBox="0 0 150 38"
            className="hidden md:block dashboard-wave"
          >
            <path
              d="
                M0 20
                C10 20 10 18 20 18
                C27 18 27 26 35 26
                C44 26 45 8 54 8
                C63 8 63 30 72 30
                C82 30 82 17 92 17
                C102 17 102 23 112 23
                C123 23 123 11 134 11
                C141 11 142 20 150 20
              "
              fill="none"
              stroke="#22dfff"
              strokeWidth="1.5"
              opacity=".7"
            />
          </svg>

          <button
            className="
              w-8
              h-8
              rounded-full
              bg-cyan-400/10
              border
              border-cyan-300/20
              text-cyan-300
              flex
              items-center
              justify-center
            "
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  title,
  value,
  change,
  positive,
  iconClass,
  bg,
}) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#103448]
        bg-[#04131e]
        p-3.5
        min-h-[104px]
        relative
        overflow-hidden
        hover:border-cyan-300/15
        transition
      "
    >
      <div
        className={`
          w-8
          h-8
          rounded-lg
          ${bg}
          ${iconClass}
          flex
          items-center
          justify-center
          mb-3
        `}
      >
        {icon}
      </div>

      <p className="text-[7px] text-white/35">
        {title}
      </p>

      <p className="text-[20px] leading-none font-semibold mt-1.5">
        {value}
      </p>

      <div
        className={`
          flex
          items-center
          gap-1
          text-[6px]
          mt-2
          ${
            positive
              ? "text-emerald-400"
              : "text-red-400"
          }
        `}
      >
        {positive ? (
          <ArrowUpRight size={9} />
        ) : (
          <ArrowDownRight size={9} />
        )}

        <span>{change}</span>

        <span className="text-white/20">
          vs yesterday
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   STATUS
============================================================ */

function Status({ status }) {
  const styles = {
    Completed:
      "bg-emerald-400/10 text-emerald-400 border-emerald-400/10",

    "In Progress":
      "bg-cyan-400/10 text-cyan-400 border-cyan-400/10",

    Waiting:
      "bg-amber-400/10 text-amber-400 border-amber-400/10",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        w-fit
        px-2
        py-1
        rounded-full
        border
        text-[6px]
        whitespace-nowrap
        ${styles[status] || ""}
      `}
    >
      {status}
    </span>
  );
}

/* ============================================================
   MINI STATUS
============================================================ */

function MiniStatus({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[6px] text-white/30">
        {label}
      </span>

      <span className="text-[7px] text-cyan-300">
        {value}
      </span>
    </div>
  );
}

/* ============================================================
   LEGEND
============================================================ */

function Legend({ color, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`
          w-1.5
          h-1.5
          rounded-full
          ${color}
        `}
      />

      <span className="text-[6px] text-white/40 w-[72px]">
        {label}
      </span>

      <span className="text-[6px] text-white/55">
        {value}
      </span>
    </div>
  );
}

/* ============================================================
   ANIMATED DENTAL TOOTH
============================================================ */

function DentalTooth() {
  return (
    <div
      className="
        relative
        w-[300px]
        h-[315px]
        flex
        items-center
        justify-center
      "
    >
      {/* ====================================================
          BIG BACK GLOW
      ==================================================== */}

      <div
        className="
          absolute
          w-[230px]
          h-[230px]
          rounded-full
          bg-cyan-400/[0.08]
          blur-[70px]
        "
      />

      <div
        className="
          absolute
          w-[150px]
          h-[180px]
          rounded-full
          bg-blue-500/[0.10]
          blur-[65px]
          translate-x-6
        "
      />

      {/* ====================================================
          ORBIT 1
      ==================================================== */}

      <div
        className="
          dashboard-orbit-1
          absolute
          left-1/2
          top-[52%]
          -translate-x-1/2
          -translate-y-1/2
          w-[275px]
          h-[76px]
          rounded-[50%]
          border
          border-cyan-400/35
          shadow-[0_0_12px_rgba(0,210,255,.15)]
        "
      >
        <span
          className="
            absolute
            top-[5px]
            left-[55px]
            w-[4px]
            h-[4px]
            rounded-full
            bg-cyan-200
            shadow-[0_0_7px_#22d3ee]
          "
        />

        <span
          className="
            absolute
            right-[32px]
            bottom-[7px]
            w-[3px]
            h-[3px]
            rounded-full
            bg-blue-300
            shadow-[0_0_8px_#60a5fa]
          "
        />
      </div>

      {/* ====================================================
          ORBIT 2
      ==================================================== */}

      <div
        className="
          dashboard-orbit-2
          absolute
          left-1/2
          top-[52%]
          -translate-x-1/2
          -translate-y-1/2
          w-[245px]
          h-[61px]
          rounded-[50%]
          border
          border-blue-400/25
          rotate-[18deg]
        "
      >
        <span
          className="
            absolute
            left-[24px]
            bottom-[12px]
            w-[3px]
            h-[3px]
            rounded-full
            bg-cyan-300
            shadow-[0_0_8px_#22d3ee]
          "
        />
      </div>

      {/* ====================================================
          ORBIT 3
      ==================================================== */}

      <div
        className="
          dashboard-orbit-3
          absolute
          left-1/2
          top-[52%]
          -translate-x-1/2
          -translate-y-1/2
          w-[205px]
          h-[43px]
          rounded-[50%]
          border
          border-cyan-300/20
          rotate-[-10deg]
        "
      />

      {/* ====================================================
          LIGHT BEAM
      ==================================================== */}

      <div
        className="
          dashboard-beam
          absolute
          bottom-[35px]
          left-1/2
          -translate-x-1/2
          w-[48px]
          h-[105px]
          bg-gradient-to-t
          from-cyan-400/45
          via-blue-400/15
          to-transparent
          blur-[13px]
        "
      />

      {/* ====================================================
          TOOTH
      ==================================================== */}

      <div
        className="
          dashboard-tooth
          relative
          z-20
          w-[205px]
          h-[270px]
        "
      >
        <svg
          viewBox="0 0 300 390"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* MAIN BODY */}

            <linearGradient
              id="dashboardToothMain"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#ffffff"
              />

              <stop
                offset="17%"
                stopColor="#e6fbff"
              />

              <stop
                offset="36%"
                stopColor="#a3e6ff"
              />

              <stop
                offset="55%"
                stopColor="#397fa7"
              />

              <stop
                offset="72%"
                stopColor="#b8f0ff"
              />

              <stop
                offset="100%"
                stopColor="#2b7197"
              />
            </linearGradient>

            {/* INNER */}

            <linearGradient
              id="dashboardToothInner"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#efffff"
                stopOpacity=".8"
              />

              <stop
                offset="38%"
                stopColor="#53bce8"
                stopOpacity=".65"
              />

              <stop
                offset="75%"
                stopColor="#07517a"
                stopOpacity=".6"
              />

              <stop
                offset="100%"
                stopColor="#032d4c"
                stopOpacity=".9"
              />
            </linearGradient>

            {/* INTERNAL LIGHT */}

            <radialGradient
              id="dashboardToothLight"
              cx="30%"
              cy="20%"
              r="75%"
            >
              <stop
                offset="0%"
                stopColor="#ffffff"
                stopOpacity=".9"
              />

              <stop
                offset="30%"
                stopColor="#a9efff"
                stopOpacity=".45"
              />

              <stop
                offset="70%"
                stopColor="#008ed0"
                stopOpacity=".16"
              />

              <stop
                offset="100%"
                stopColor="#001e38"
                stopOpacity=".2"
              />
            </radialGradient>

            {/* GLOW */}

            <filter
              id="dashboardToothGlow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                stdDeviation="6"
                result="blur"
              />

              <feColorMatrix
                in="blur"
                type="matrix"
                values="
                  0 0 0 0 0
                  0 0 0 0 0.85
                  0 0 0 0 1
                  0 0 0 1 0
                "
              />
            </filter>

            {/* SHINE */}

            <linearGradient
              id="dashboardToothShine"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#ffffff"
                stopOpacity=".95"
              />

              <stop
                offset="45%"
                stopColor="#dfffff"
                stopOpacity=".35"
              />

              <stop
                offset="100%"
                stopColor="#ffffff"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* ==================================================
              OUTER GLOW
          ================================================== */}

          <path
            d="
              M69 138
              C50 108 49 70 67 44
              C85 18 116 10 141 24
              C149 28 154 34 159 42
              C164 34 169 28 177 24
              C202 10 233 18 251 44
              C269 70 268 108 249 138
              C234 161 227 180 229 207
              C231 236 242 263 233 286
              C226 304 211 316 201 330
              C190 346 189 371 180 388
              C174 398 164 398 159 388
              C149 371 148 346 137 330
              C127 316 112 304 105 286
              C96 263 107 236 109 207
              C111 180 104 161 69 138
              Z
            "
            fill="none"
            stroke="#12ddff"
            strokeWidth="14"
            opacity=".55"
            filter="url(#dashboardToothGlow)"
          />

          {/* ==================================================
              MAIN TOOTH
          ================================================== */}

          <path
            d="
              M69 138
              C50 108 49 70 67 44
              C85 18 116 10 141 24
              C149 28 154 34 159 42
              C164 34 169 28 177 24
              C202 10 233 18 251 44
              C269 70 268 108 249 138
              C234 161 227 180 229 207
              C231 236 242 263 233 286
              C226 304 211 316 201 330
              C190 346 189 371 180 388
              C174 398 164 398 159 388
              C149 371 148 346 137 330
              C127 316 112 304 105 286
              C96 263 107 236 109 207
              C111 180 104 161 69 138
              Z
            "
            fill="url(#dashboardToothMain)"
            stroke="#efffff"
            strokeWidth="2.2"
          />

          {/* ==================================================
              INNER DEPTH
          ================================================== */}

          <path
            d="
              M159 45
              C173 23 201 20 224 36
              C248 53 257 83 250 111
              C245 133 232 150 226 169
              C218 196 224 222 229 248
              C233 271 226 290 209 307
              C190 326 185 350 178 382
              C173 394 167 394 162 382
              C155 350 150 326 131 307
              C114 290 107 271 111 248
              C116 222 122 196 114 169
              C108 150 95 133 90 111
              C83 83 92 53 116 36
              C139 20 147 23 159 45
              Z
            "
            fill="url(#dashboardToothInner)"
            opacity=".6"
          />

          {/* ==================================================
              SOFT INTERNAL LIGHT
          ================================================== */}

          <path
            d="
              M159 70
              C150 105 148 136 151 166
              C154 191 153 216 157 239
              C159 254 160 273 159 292
              C158 315 158 340 164 380
            "
            fill="none"
            stroke="#dfffff"
            strokeWidth="7"
            opacity=".14"
            filter="url(#dashboardToothGlow)"
          />

          {/* ==================================================
              ROOT CENTER
          ================================================== */}

          <path
            d="
              M159 188
              C142 214 136 240 140 266
              C144 294 153 315 157 338
              C159 352 160 369 164 382
            "
            fill="none"
            stroke="#66ddff"
            strokeWidth="5"
            opacity=".5"
          />

          <path
            d="
              M159 188
              C176 214 182 240 178 266
              C174 294 165 315 161 338
              C159 352 158 369 154 382
            "
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            opacity=".38"
          />

          {/* ==================================================
              TOP RIDGES
          ================================================== */}

          <path
            d="
              M72 80
              C98 53 130 53 159 72
              C188 53 220 53 246 80
            "
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            opacity=".38"
          />

          <path
            d="
              M64 112
              C94 90 127 94 159 114
              C191 94 224 90 254 112
            "
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            opacity=".28"
          />

          {/* ==================================================
              LEFT SHINE
          ================================================== */}

          <path
            d="
              M94 47
              C73 72 72 108 90 136
            "
            fill="none"
            stroke="url(#dashboardToothShine)"
            strokeWidth="10"
            strokeLinecap="round"
            opacity=".75"
          />

          {/* ==================================================
              TOP SHINE
          ================================================== */}

          <path
            d="
              M91 38
              C112 20 137 22 153 37
            "
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity=".65"
          />

          {/* ==================================================
              INTERNAL PARTICLES
          ================================================== */}

          <circle
            cx="104"
            cy="75"
            r="2"
            fill="#ffffff"
            opacity=".8"
          />

          <circle
            cx="119"
            cy="58"
            r="1.5"
            fill="#ffffff"
            opacity=".7"
          />

          <circle
            cx="202"
            cy="68"
            r="1.5"
            fill="#ffffff"
            opacity=".55"
          />

          <circle
            cx="219"
            cy="96"
            r="2"
            fill="#bff7ff"
            opacity=".7"
          />

          <circle
            cx="92"
            cy="103"
            r="1.3"
            fill="#ffffff"
            opacity=".7"
          />

          <circle
            cx="226"
            cy="127"
            r="1.4"
            fill="#ffffff"
            opacity=".55"
          />
        </svg>
      </div>

      {/* ====================================================
          BOTTOM GLOW
      ==================================================== */}

      <div
        className="
          absolute
          bottom-[8px]
          left-1/2
          -translate-x-1/2
          w-[210px]
          h-[65px]
          rounded-full
          bg-cyan-400/[0.13]
          blur-[30px]
        "
      />

      {/* ====================================================
          PLATFORM
      ==================================================== */}

      <div
        className="
          dashboard-platform
          absolute
          bottom-[15px]
          left-1/2
          -translate-x-1/2
          w-[165px]
          h-[34px]
          rounded-[50%]
          border
          border-cyan-400/45
          bg-[radial-gradient(ellipse,rgba(0,225,255,.32),rgba(0,90,150,.08)_45%,transparent_70%)]
          shadow-[0_0_15px_rgba(0,210,255,.3),0_0_40px_rgba(0,140,255,.2)]
        "
      >
        <div
          className="
            absolute
            inset-[6px_15px]
            rounded-[50%]
            border
            border-cyan-300/35
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-6
            h-6
            rounded-full
            bg-cyan-300
            blur-[12px]
          "
        />
      </div>

      {/* ====================================================
          PARTICLES
      ==================================================== */}

      <span
        className="
          dashboard-particle
          absolute
          left-[65px]
          bottom-[65px]
          w-[3px]
          h-[3px]
          rounded-full
          bg-cyan-300
          shadow-[0_0_8px_#22d3ee]
        "
      />

      <span
        className="
          dashboard-particle-left
          absolute
          left-[88px]
          bottom-[82px]
          w-[3px]
          h-[3px]
          rounded-full
          bg-blue-300
          shadow-[0_0_8px_#60a5fa]
        "
      />

      <span
        className="
          dashboard-particle-right
          absolute
          right-[63px]
          bottom-[72px]
          w-[3px]
          h-[3px]
          rounded-full
          bg-cyan-300
          shadow-[0_0_8px_#22d3ee]
        "
      />

      <span
        className="
          dashboard-particle
          absolute
          right-[45px]
          bottom-[110px]
          w-[2px]
          h-[2px]
          rounded-full
          bg-cyan-200
          shadow-[0_0_8px_#22d3ee]
        "
        style={{ animationDelay: "1.2s" }}
      />

      <span
        className="
          dashboard-particle-left
          absolute
          left-[115px]
          bottom-[105px]
          w-[2px]
          h-[2px]
          rounded-full
          bg-violet-300
          shadow-[0_0_8px_#8b5cf6]
        "
        style={{ animationDelay: "1.8s" }}
      />

      {/* ====================================================
          FIXED SPARKS
      ==================================================== */}

      <span
        className="
          dashboard-spark
          absolute
          top-[28px]
          right-[58px]
          w-[4px]
          h-[4px]
          rounded-full
          bg-cyan-200
          shadow-[0_0_10px_#22d3ee]
        "
      />

      <span
        className="
          dashboard-spark
          absolute
          top-[58px]
          left-[42px]
          w-[3px]
          h-[3px]
          rounded-full
          bg-blue-300
          shadow-[0_0_9px_#60a5fa]
        "
        style={{ animationDelay: ".7s" }}
      />

      <span
        className="
          dashboard-spark
          absolute
          top-[105px]
          right-[25px]
          w-[3px]
          h-[3px]
          rounded-full
          bg-cyan-300
          shadow-[0_0_9px_#22d3ee]
        "
        style={{ animationDelay: "1.2s" }}
      />

      <span
        className="
          dashboard-spark
          absolute
          top-[85px]
          left-[20px]
          w-[2px]
          h-[2px]
          rounded-full
          bg-violet-300
          shadow-[0_0_8px_#8b5cf6]
        "
        style={{ animationDelay: "1.7s" }}
      />
    </div>
  );
}