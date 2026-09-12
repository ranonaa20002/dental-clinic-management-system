import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Bell,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
  Phone,
  ShieldCheck,
  Activity,
  CreditCard,
  FileText,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Stethoscope,
  Sparkles,
  ArrowUpRight,
  MessageCircle,
  Zap,
  ScanLine,
  LockKeyhole,
  Bot,
  Search,
  CircleDollarSign,
} from "lucide-react";

/* =========================================================
   PARTICLES
========================================================= */

const particles = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: Math.random() * 2.5 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 5 + 5,
}));

/* =========================================================
   GLOW DOT
========================================================= */

function GlowDot({ className = "" }) {
  return (
    <span
      className={`
        absolute rounded-full
        bg-cyan-300
        shadow-[0_0_12px_#22d3ee,0_0_30px_#06b6d4]
        ${className}
      `}
    />
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ children, type = "success" }) {
  const styles = {
    success:
      "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    warning:
      "border-yellow-400/25 bg-yellow-400/10 text-yellow-300",
    danger:
      "border-red-400/25 bg-red-400/10 text-red-300",
    cyan:
      "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full border
        px-2.5 py-1
        text-[9px] font-bold
        ${styles[type]}
      `}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
      {children}
    </span>
  );
}

/* =========================================================
   GLASS CARD
========================================================= */

function GlassCard({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -3,
              borderColor: "rgba(34,211,238,.25)",
            }
          : undefined
      }
      transition={{ duration: 0.25 }}
      className={`
        relative overflow-hidden
        rounded-2xl
        border border-cyan-400/[0.12]
        bg-[#031426]/85
        backdrop-blur-2xl
        shadow-[0_20px_70px_rgba(0,0,0,.4)]
        ${className}
      `}
    >
      {/* TOP LIGHT */}
      <div
        className="
          pointer-events-none
          absolute inset-x-0 top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-400/50
          to-transparent
        "
      />

      {/* RADIAL LIGHT */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-cyan-400/[0.06]
          blur-3xl
        "
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-xl
            border border-cyan-400/20
            bg-gradient-to-br
            from-cyan-400/15
            to-blue-500/10
            text-cyan-300
            shadow-[0_0_25px_rgba(34,211,238,.08)]
          "
        >
          <Icon size={18} />
        </div>

        <div>
          <h3 className="text-sm font-black text-white">
            {title}
          </h3>

          {subtitle && (
            <p className="mt-0.5 text-[9px] text-slate-500">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <button
        type="button"
        className="
          flex h-8 w-8
          items-center justify-center
          rounded-lg
          border border-white/[0.06]
          text-slate-600
          transition
          hover:border-cyan-400/20
          hover:text-cyan-300
        "
      >
        <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  type = "cyan",
}) {
  const iconStyles = {
    cyan:
      "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    blue:
      "border-blue-400/20 bg-blue-500/10 text-blue-300",
    purple:
      "border-purple-400/20 bg-purple-500/10 text-purple-300",
    green:
      "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
  };

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      transition={{ duration: 0.2 }}
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-cyan-400/10
        bg-[#04162a]/85
        p-4
        backdrop-blur-xl
      "
    >
      {/* glow */}
      <div
        className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-cyan-400/[0.06]
          blur-3xl
          transition
          group-hover:bg-cyan-400/[0.12]
        "
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[9px] font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-2 text-xl font-black text-white">
            {value}
          </p>

          <p className="mt-1 text-[9px] text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`
            flex h-11 w-11
            items-center justify-center
            rounded-xl border
            ${iconStyles[type]}
          `}
        >
          <Icon size={19} />
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================
   HOLOGRAPHIC TOOTH
========================================================= */

function HologramTooth() {
  return (
    <div
      className="
        relative
        flex
        h-[470px]
        w-full
        items-center
        justify-center
      "
    >
      {/* =====================================================
          BIG GLOW
      ===================================================== */}

      <div
        className="
          absolute
          h-[340px]
          w-[340px]
          rounded-full
          bg-cyan-400/[0.12]
          blur-[100px]
        "
      />

      <div
        className="
          absolute
          h-[240px]
          w-[240px]
          rounded-full
          bg-blue-500/[0.15]
          blur-[80px]
        "
      />

      {/* =====================================================
          ORBIT RINGS
      ===================================================== */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[390px]
          w-[390px]
          rounded-full
          border
          border-cyan-400/[0.13]
        "
        style={{
          transform: "rotateX(70deg)",
        }}
      >
        <GlowDot className="left-2 top-1/2 h-2 w-2" />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 21,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[330px]
          w-[330px]
          rounded-full
          border
          border-cyan-300/[0.18]
        "
        style={{
          transform: "rotateX(68deg) rotateY(15deg)",
        }}
      >
        <GlowDot className="right-3 top-10 h-1.5 w-1.5" />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          h-[430px]
          w-[430px]
          rounded-full
          border
          border-blue-400/[0.07]
        "
        style={{
          transform: "rotateX(74deg) rotateY(-15deg)",
        }}
      />

      {/* =====================================================
          FLOATING DOTS
      ===================================================== */}

      <motion.div
        animate={{
          y: [-12, 12, -12],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="
          absolute
          left-[16%]
          top-[26%]
          h-2
          w-2
          rounded-full
          bg-cyan-300
          shadow-[0_0_15px_#22d3ee]
        "
      />

      <motion.div
        animate={{
          y: [10, -10, 10],
          opacity: [0.2, 1, 0.2],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className="
          absolute
          right-[12%]
          top-[22%]
          h-1.5
          w-1.5
          rounded-full
          bg-blue-300
          shadow-[0_0_12px_#60a5fa]
        "
      />

      <motion.div
        animate={{
          y: [-15, 15, -15],
          opacity: [0.1, 0.8, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          absolute
          right-[18%]
          bottom-[30%]
          h-1
          w-1
          rounded-full
          bg-cyan-300
          shadow-[0_0_10px_#22d3ee]
        "
      />

      {/* =====================================================
          TOOTH
      ===================================================== */}

      <motion.div
        animate={{
          y: [-9, 9, -9],
          scale: [1, 1.025, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          z-20
          flex
          items-center
          justify-center
        "
      >
        {/* tooth glow */}

        <div
          className="
            absolute
            h-[310px]
            w-[270px]
            rounded-full
            bg-cyan-400/20
            blur-[70px]
          "
        />

        {/* image */}

        <img
          src="/images/holographic-tooth.png"
          alt="Holographic Tooth"
          className="
            relative
            h-[390px]
            w-[360px]
            object-contain
            mix-blend-screen
            opacity-95
            drop-shadow-[0_0_18px_rgba(34,211,238,.95)]
            drop-shadow-[0_0_50px_rgba(14,165,233,.65)]
            drop-shadow-[0_0_100px_rgba(34,211,238,.25)]
          "
        />

        {/* scanning line */}

        <motion.div
          animate={{
            top: ["22%", "76%", "22%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            z-30
            h-[2px]
            w-[260px]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-cyan-300
            to-transparent
            shadow-[0_0_15px_#22d3ee,0_0_35px_#06b6d4]
          "
        />
      </motion.div>

      {/* =====================================================
          HOLOGRAM PLATFORM
      ===================================================== */}

      <div
        className="
          absolute
          bottom-[22px]
          left-1/2
          h-[45px]
          w-[270px]
          -translate-x-1/2
          rounded-[50%]
          border
          border-cyan-400/30
          bg-cyan-400/[0.04]
          shadow-[0_0_45px_rgba(34,211,238,.25)]
        "
      />

      <motion.div
        animate={{
          scale: [0.75, 1.2, 0.75],
          opacity: [0.3, 0.85, 0.3],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-[39px]
          left-1/2
          h-3
          w-[120px]
          -translate-x-1/2
          rounded-full
          bg-cyan-300
          blur-md
        "
      />

      <div
        className="
          absolute
          bottom-[25px]
          left-1/2
          h-[75px]
          w-[320px]
          -translate-x-1/2
          rounded-[50%]
          border
          border-blue-400/[0.08]
        "
      />

      {/* =====================================================
          AI LABEL
      ===================================================== */}

      <motion.div
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="
          absolute
          left-[2%]
          top-[55px]
          z-40
          rounded-2xl
          border
          border-cyan-400/25
          bg-[#031426]/90
          px-4
          py-3
          shadow-[0_0_30px_rgba(34,211,238,.12)]
          backdrop-blur-xl
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              border
              border-cyan-400/20
              bg-cyan-400/10
            "
          >
            <ScanLine size={17} className="text-cyan-300" />
          </div>

          <div>
            <p className="text-[10px] font-black text-white">
              AI SCAN ACTIVE
            </p>

            <p className="mt-1 text-[8px] text-slate-500">
              Real-time dental analysis
            </p>
          </div>
        </div>
      </motion.div>

      {/* =====================================================
          STATUS
      ===================================================== */}

      <motion.div
        animate={{
          y: [5, -5, 5],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-[75px]
          right-[0%]
          z-40
          rounded-2xl
          border
          border-cyan-400/25
          bg-[#031426]/90
          px-4
          py-3
          shadow-[0_0_30px_rgba(34,211,238,.12)]
          backdrop-blur-xl
        "
      >
        <div className="flex items-center gap-3">
          <div
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              border
              border-cyan-400/20
              bg-cyan-400/10
            "
          >
            <Activity size={17} className="text-cyan-300" />
          </div>

          <div>
            <p className="text-[9px] font-bold text-slate-400">
              DENTAL STATUS
            </p>

            <div className="mt-1 flex items-center gap-2">
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_12px_#34d399]
                "
              />

              <span className="text-[10px] font-black text-emerald-300">
                HEALTHY
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* =========================================================
   APPOINTMENT CARD
========================================================= */

function AppointmentCard() {
  const [status, setStatus] = useState("pending");
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");

  return (
    <GlassCard className="p-5">
      <SectionHeader
        icon={CalendarDays}
        title="موعدك القادم"
        subtitle="Your next appointment"
      />

      <div
        className="
          relative overflow-hidden
          rounded-2xl
          border border-cyan-400/10
          bg-[#020b15]/75
          p-4
        "
      >
        <div
          className="
            absolute
            -right-10
            -top-10
            h-32
            w-32
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div className="relative flex flex-col gap-5">
          <div className="flex items-center gap-4">
            {/* DATE */}

            <div
              className="
                flex h-16 w-16
                shrink-0
                flex-col
                items-center
                justify-center
                rounded-2xl
                border border-cyan-400/25
                bg-gradient-to-b
                from-cyan-400/15
                to-blue-500/5
                shadow-[0_0_25px_rgba(34,211,238,.08)]
              "
            >
              <span className="text-[8px] font-black text-cyan-300">
                AUG
              </span>

              <span className="text-2xl font-black text-white">
                23
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-black text-white">
                  د. أحمد محمد
                </h4>

                {status === "confirmed" ? (
                  <StatusBadge type="success">
                    Confirmed
                  </StatusBadge>
                ) : status === "rejected" ? (
                  <StatusBadge type="danger">
                    Rejected
                  </StatusBadge>
                ) : (
                  <StatusBadge type="cyan">
                    Pending
                  </StatusBadge>
                )}
              </div>

              <p className="mt-1 text-[10px] text-slate-500">
                متابعة وتنظيف الأسنان
              </p>

              <div className="mt-2 flex flex-wrap gap-4">
                <span className="flex items-center gap-1.5 text-[9px] text-slate-500">
                  <Clock3
                    size={12}
                    className="text-cyan-400"
                  />
                  10:30 AM
                </span>

                <span className="flex items-center gap-1.5 text-[9px] text-slate-500">
                  <MapPin
                    size={12}
                    className="text-cyan-400"
                  />
                  Nasr City Branch
                </span>
              </div>
            </div>
          </div>

          {/* ACTIONS */}

          {status === "pending" && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setStatus("confirmed")}
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-xl
                  border border-emerald-400/25
                  bg-emerald-400/10
                  py-2.5
                  text-[10px]
                  font-black
                  text-emerald-300
                  transition
                  hover:bg-emerald-400/20
                "
              >
                <CheckCircle2 size={14} />
                تأكيد
              </button>

              <button
                type="button"
                onClick={() => setShowReason(true)}
                className="
                  flex items-center
                  justify-center gap-2
                  rounded-xl
                  border border-red-400/20
                  bg-red-400/10
                  py-2.5
                  text-[10px]
                  font-black
                  text-red-300
                  transition
                  hover:bg-red-400/20
                "
              >
                <XCircle size={14} />
                رفض
              </button>
            </div>
          )}

          {status === "confirmed" && (
            <div
              className="
                flex items-center
                justify-center
                gap-2
                rounded-xl
                border border-emerald-400/15
                bg-emerald-400/[0.06]
                py-2.5
              "
            >
              <CheckCircle2
                size={14}
                className="text-emerald-400"
              />

              <span className="text-[10px] font-bold text-emerald-300">
                تم تأكيد الموعد
              </span>
            </div>
          )}

          {status === "rejected" && (
            <div
              className="
                rounded-xl
                border border-red-400/15
                bg-red-400/[0.05]
                p-3
              "
            >
              <p className="text-[9px] text-red-300">
                تم رفض الموعد
              </p>

              {reason && (
                <p className="mt-1 text-[9px] text-slate-500">
                  {reason}
                </p>
              )}
            </div>
          )}
        </div>

        {/* REASON */}

        <AnimatePresence>
          {showReason && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="mt-4 overflow-hidden border-t border-white/[0.06] pt-4"
            >
              <textarea
                value={reason}
                onChange={(e) =>
                  setReason(e.target.value)
                }
                placeholder="اكتبي سبب رفض الموعد..."
                className="
                  h-20
                  w-full
                  resize-none
                  rounded-xl
                  border border-white/10
                  bg-black/30
                  p-3
                  text-[10px]
                  text-white
                  outline-none
                  placeholder:text-slate-700
                  focus:border-cyan-400/30
                "
              />

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReason(false)}
                  className="rounded-lg px-3 py-2 text-[9px] text-slate-500 hover:text-white"
                >
                  إلغاء
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowReason(false);
                    setStatus("rejected");
                  }}
                  className="
                    rounded-lg
                    border border-red-400/20
                    bg-red-500/10
                    px-4 py-2
                    text-[9px]
                    font-bold
                    text-red-300
                  "
                >
                  إرسال
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}

/* =========================================================
   QUICK ACTION
========================================================= */

function QuickAction({
  icon: Icon,
  title,
  description,
}) {
  return (
    <motion.button
      type="button"
      whileHover={{
        y: -3,
        scale: 1.01,
      }}
      className="
        group
        flex items-center gap-3
        rounded-xl
        border border-white/[0.06]
        bg-white/[0.02]
        p-3
        text-right
        transition
        hover:border-cyan-400/20
        hover:bg-cyan-400/[0.04]
      "
    >
      <div
        className="
          flex h-10 w-10
          shrink-0
          items-center justify-center
          rounded-xl
          border border-cyan-400/15
          bg-cyan-400/10
          text-cyan-300
        "
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-black text-white">
          {title}
        </p>

        <p className="mt-1 truncate text-[8px] text-slate-600">
          {description}
        </p>
      </div>

      <ChevronRight
        size={14}
        className="
          text-slate-700
          transition
          group-hover:text-cyan-400
        "
      />
    </motion.button>
  );
}

/* =========================================================
   NOTIFICATION
========================================================= */

function NotificationItem({
  icon: Icon,
  title,
  text,
  type = "cyan",
}) {
  return (
    <motion.div
      whileHover={{ x: -3 }}
      className="
        flex gap-3
        rounded-xl
        border border-white/[0.05]
        bg-black/10
        p-3
      "
    >
      <div
        className={`
          flex h-9 w-9
          shrink-0
          items-center justify-center
          rounded-lg
          ${
            type === "warning"
              ? "bg-yellow-400/10 text-yellow-300"
              : "bg-cyan-400/10 text-cyan-300"
          }
        `}
      >
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-200">
          {title}
        </p>

        <p className="mt-1 text-[8px] leading-5 text-slate-600">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function AdultPatientDashboard({
  patient = {
    name: "Rana Hassan",
    phone: "01000000000",
  },
}) {
  return (
    <div
      dir="rtl"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#010814]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ===================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          bg-cover
          bg-center
          opacity-[0.16]
        "
        style={{
          backgroundImage:
            "url('/images/dental-clinic-bg.png')",
        }}
      />

      {/* DARK OVERLAY */}

      <div
        className="
          pointer-events-none
          fixed inset-0
          bg-[#010814]/90
        "
      />

      {/* BLUE LIGHT RIGHT */}

      <div
        className="
          pointer-events-none
          fixed
          -right-40
          top-0
          h-[650px]
          w-[650px]
          rounded-full
          bg-cyan-500/[0.08]
          blur-[170px]
        "
      />

      {/* BLUE LIGHT LEFT */}

      <div
        className="
          pointer-events-none
          fixed
          -left-40
          bottom-0
          h-[600px]
          w-[600px]
          rounded-full
          bg-blue-600/[0.08]
          blur-[170px]
        "
      />

      {/* CENTER LIGHT */}

      <div
        className="
          pointer-events-none
          fixed
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-cyan-400/[0.025]
          blur-[130px]
        "
      />

      {/* GRID */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          opacity-[0.035]
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.7) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* =====================================================
          PARTICLES
      ===================================================== */}

      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="
            pointer-events-none
            fixed
            rounded-full
            bg-cyan-300
          "
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            boxShadow:
              "0 0 10px rgba(34,211,238,.9)",
          }}
          animate={{
            opacity: [0, 0.7, 0],
            y: [0, -25, -50],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          sticky top-0 z-50
          border-b border-cyan-400/[0.08]
          bg-[#020b18]/85
          backdrop-blur-2xl
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-[1500px]
            items-center
            justify-between
            gap-5
            px-5
            py-3
          "
        >
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div
              className="
                relative
                flex h-11 w-11
                items-center justify-center
                rounded-xl
                border border-cyan-400/30
                bg-gradient-to-br
                from-cyan-400/20
                to-blue-600/10
                shadow-[0_0_30px_rgba(34,211,238,.12)]
              "
            >
              <div
                className="
                  absolute inset-1
                  rounded-lg
                  border border-cyan-300/10
                "
              />

              <span className="text-xl">🦷</span>

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-cyan-300
                  shadow-[0_0_12px_#22d3ee]
                "
              />
            </div>

            <div>
              <p className="text-[17px] font-black tracking-wide text-white">
                DENTAL<span className="text-cyan-400">CARE</span>
              </p>

              <p className="text-[8px] tracking-[0.28em] text-slate-600">
                PATIENT PORTAL
              </p>
            </div>
          </div>

          {/* SEARCH */}

          <div
            className="
              hidden
              h-10
              max-w-[390px]
              flex-1
              items-center
              gap-3
              rounded-full
              border border-cyan-400/10
              bg-[#041326]/80
              px-4
              md:flex
            "
          >
            <Search
              size={17}
              className="text-cyan-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="
                w-full
                bg-transparent
                text-xs
                text-white
                outline-none
                placeholder:text-slate-600
              "
            />
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2">
            <div
              className="
                hidden
                items-center gap-2
                rounded-full
                border border-emerald-400/15
                bg-emerald-400/[0.05]
                px-3 py-2
                md:flex
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_12px_#34d399]
                "
              />

              <span className="text-[9px] font-bold text-emerald-300">
                SYSTEM ONLINE
              </span>
            </div>

            <button
              type="button"
              className="
                relative
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                border border-white/[0.07]
                bg-white/[0.025]
                text-slate-400
                transition
                hover:border-cyan-400/20
                hover:text-cyan-300
              "
            >
              <Bell size={18} />

              <span
                className="
                  absolute
                  right-2
                  top-2
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-pink-400
                  shadow-[0_0_10px_#f472b6]
                "
              />
            </button>

            <div className="hidden h-8 w-px bg-white/[0.08] sm:block" />

            <div className="hidden text-right sm:block">
              <p className="text-[10px] font-black text-white">
                {patient?.name || "Patient"}
              </p>

              <p className="mt-0.5 text-[8px] text-slate-600">
                Patient ID • PT-2048
              </p>
            </div>

            <div
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border border-cyan-400/30
                bg-gradient-to-br
                from-blue-500/20
                to-cyan-400/10
                text-cyan-300
                shadow-[0_0_20px_rgba(34,211,238,.08)]
              "
            >
              <UserRound size={18} />
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className="
          relative z-10
          mx-auto
          max-w-[1500px]
          px-4
          pb-12
          pt-6
          md:px-6
        "
      >
        {/* PAGE TITLE */}

        <div className="mb-5">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles
              size={13}
              className="text-cyan-400"
            />

            <span className="text-[8px] font-black tracking-[0.25em] text-cyan-400">
              SMART DENTAL SYSTEM
            </span>
          </div>

          <h1 className="text-2xl font-black text-white md:text-3xl">
            أهلاً بك،
            <span className="mr-2 bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              {patient?.name || "Patient"}
            </span>
          </h1>

          <p className="mt-1.5 text-[10px] text-slate-600">
            كل معلوماتك الطبية ومواعيدك وخطة علاجك في مكان واحد.
          </p>
        </div>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section
          className="
            relative
            mb-6
            overflow-hidden
            rounded-[26px]
            border border-cyan-400/20
            bg-[#021122]/85
            shadow-[0_30px_120px_rgba(0,0,0,.5)]
            backdrop-blur-2xl
          "
        >
          {/* HERO BORDER LIGHT */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[26px]
              bg-[radial-gradient(circle_at_72%_50%,rgba(34,211,238,.10),transparent_35%)]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              left-0
              top-0
              h-full
              w-1/2
              bg-[radial-gradient(circle_at_left,rgba(0,140,255,.10),transparent_55%)]
            "
          />

          <div className="relative grid min-h-[500px] lg:grid-cols-[0.85fr_1.15fr]">
            {/* =================================================
                TEXT
            ================================================= */}

            <div
              className="
                relative
                z-30
                flex
                flex-col
                justify-center
                p-7
                md:p-10
                lg:order-1
              "
            >
              {/* SECURITY */}

              <div
                className="
                  mb-5
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border border-cyan-400/20
                  bg-cyan-400/[0.05]
                  px-3
                  py-2
                "
              >
                <ShieldCheck
                  size={16}
                  className="text-cyan-300"
                />

                <span className="text-[9px] font-bold text-cyan-200">
                  ملفك الطبي آمن ومشفر
                </span>

                <LockKeyhole
                  size={12}
                  className="text-cyan-400"
                />
              </div>

              {/* TITLE */}

              <h2
                className="
                  text-4xl
                  font-black
                  leading-[1.15]
                  text-white
                  md:text-5xl
                "
              >
                ابتسامتك...
                <br />

                <span
                  className="
                    bg-gradient-to-r
                    from-cyan-300
                    via-cyan-400
                    to-blue-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  تحت رعاية ذكية
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-md
                  text-sm
                  leading-7
                  text-slate-400
                "
              >
                تابع تطور حالتك، مواعيدك، المدفوعات وخطة العلاج
                بسهولة من لوحة واحدة.
              </p>

              {/* MINI CARDS */}

              <div className="mt-6 grid max-w-[440px] grid-cols-2 gap-3">
                <div
                  className="
                    rounded-2xl
                    border border-cyan-400/15
                    bg-cyan-400/[0.035]
                    p-3
                  "
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-xl
                        bg-cyan-400/10
                        text-cyan-300
                      "
                    >
                      <CalendarDays size={17} />
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-600">
                        آخر زيارة
                      </p>

                      <p className="mt-1 text-xs font-black text-white">
                        12 Aug 2026
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    rounded-2xl
                    border border-cyan-400/15
                    bg-cyan-400/[0.035]
                    p-3
                  "
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        flex h-9 w-9
                        items-center justify-center
                        rounded-xl
                        bg-emerald-400/10
                        text-emerald-300
                      "
                    >
                      <Activity size={17} />
                    </div>

                    <div>
                      <p className="text-[8px] text-slate-600">
                        حالة العلاج
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">
                        <span
                          className="
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-emerald-400
                            shadow-[0_0_10px_#34d399]
                          "
                        />

                        <p className="text-xs font-black text-emerald-300">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BUTTONS */}

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-cyan-300
                    to-blue-400
                    px-6
                    py-3
                    text-[10px]
                    font-black
                    text-[#001018]
                    shadow-[0_0_35px_rgba(34,211,238,.2)]
                    transition
                    hover:scale-[1.02]
                  "
                >
                  <CalendarDays size={15} />
                  حجز موعد
                </button>

                <button
                  type="button"
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    border border-cyan-400/25
                    bg-white/[0.025]
                    px-6
                    py-3
                    text-[10px]
                    font-black
                    text-white
                    transition
                    hover:border-cyan-400/50
                    hover:bg-cyan-400/[0.05]
                  "
                >
                  <FileText size={15} />
                  الملف الطبي
                </button>
              </div>
            </div>

            {/* =================================================
                TOOTH
            ================================================= */}

            <div
              className="
                relative
                flex
                min-h-[500px]
                items-center
                justify-center
                lg:order-2
              "
            >
              <HologramTooth />
            </div>
          </div>
        </section>

        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            icon={CalendarDays}
            label="الموعد القادم"
            value="23 Aug"
            description="10:30 AM • د. أحمد"
            type="cyan"
          />

          <StatCard
            icon={Activity}
            label="خطة العلاج"
            value="65%"
            description="Progress completed"
            type="blue"
          />

          <StatCard
            icon={CircleDollarSign}
            label="الرصيد المستحق"
            value="850 EGP"
            description="Payment pending"
            type="purple"
          />

          <StatCard
            icon={FileText}
            label="الملف الطبي"
            value="12"
            description="Medical records"
            type="green"
          />
        </section>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}

        <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr_0.85fr]">
          {/* ===================================================
              APPOINTMENT
          =================================================== */}

          <AppointmentCard />

          {/* ===================================================
              TREATMENT
          =================================================== */}

          <GlassCard className="p-5">
            <SectionHeader
              icon={Activity}
              title="خطة العلاج"
              subtitle="Treatment progress"
            />

            <div
              className="
                rounded-2xl
                border border-cyan-400/10
                bg-black/10
                p-5
              "
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-black text-white">
                    Dental Care Plan
                  </p>

                  <p className="mt-1 text-[9px] text-slate-600">
                    خطة العلاج الحالية
                  </p>
                </div>

                <span className="text-2xl font-black text-cyan-300">
                  65%
                </span>
              </div>

              {/* PROGRESS */}

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  transition={{
                    duration: 1.5,
                    ease: "easeOut",
                  }}
                  className="
                    relative
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    to-blue-500
                    shadow-[0_0_20px_rgba(34,211,238,.5)]
                  "
                >
                  <div
                    className="
                      absolute
                      right-0
                      top-1/2
                      h-4
                      w-4
                      -translate-y-1/2
                      rounded-full
                      bg-white
                      shadow-[0_0_15px_#22d3ee]
                    "
                  />
                </motion.div>
              </div>

              {/* STEPS */}

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div
                  className="
                    border-l border-white/[0.05]
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-emerald-400/15
                      text-emerald-300
                    "
                  >
                    <CheckCircle2 size={17} />
                  </div>

                  <p className="mt-2 text-[8px] text-slate-500">
                    Initial Exam
                  </p>
                </div>

                <div
                  className="
                    border-l border-white/[0.05]
                    text-center
                  "
                >
                  <div
                    className="
                      mx-auto
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-cyan-400/15
                      text-cyan-300
                      shadow-[0_0_20px_rgba(34,211,238,.1)]
                    "
                  >
                    <Activity size={17} />
                  </div>

                  <p className="mt-2 text-[8px] text-cyan-300">
                    Current Phase
                  </p>
                </div>

                <div className="text-center">
                  <div
                    className="
                      mx-auto
                      flex h-9 w-9
                      items-center justify-center
                      rounded-full
                      bg-blue-400/10
                      text-blue-300
                    "
                  >
                    <Clock3 size={17} />
                  </div>

                  <p className="mt-2 text-[8px] text-slate-500">
                    Upcoming
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* ===================================================
              PROFILE
          =================================================== */}

          <GlassCard className="p-5">
            <SectionHeader
              icon={UserRound}
              title="ملفي الشخصي"
              subtitle="Personal information"
            />

            <div
              className="
                rounded-2xl
                border border-cyan-400/10
                bg-cyan-400/[0.025]
                p-4
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    relative
                    flex h-14 w-14
                    shrink-0
                    items-center justify-center
                    rounded-full
                    border border-cyan-400/40
                    bg-gradient-to-br
                    from-blue-500/20
                    to-cyan-400/10
                    text-cyan-300
                  "
                >
                  <UserRound size={23} />

                  <span
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-3
                      w-3
                      rounded-full
                      border-2
                      border-[#031426]
                      bg-emerald-400
                    "
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-black text-white">
                    {patient?.name || "Patient"}
                  </p>

                  <p className="mt-1 text-[8px] text-slate-600">
                    Patient ID • PT-2048
                  </p>

                  <StatusBadge type="success">
                    Online
                  </StatusBadge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div
                  className="
                    flex items-center gap-3
                    border-t border-white/[0.06]
                    pt-3
                  "
                >
                  <Phone
                    size={14}
                    className="text-cyan-400"
                  />

                  <span className="text-[9px] text-slate-400">
                    {patient?.phone || "01000000000"}
                  </span>
                </div>

                <div
                  className="
                    flex items-center gap-3
                    border-t border-white/[0.06]
                    pt-3
                  "
                >
                  <ShieldCheck
                    size={14}
                    className="text-emerald-400"
                  />

                  <span className="text-[9px] text-slate-500">
                    Medical data secured
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* =====================================================
            LOWER GRID
        ===================================================== */}

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {/* PAYMENTS */}

          <GlassCard className="p-5">
            <SectionHeader
              icon={CreditCard}
              title="المدفوعات"
              subtitle="Payment history"
            />

            <div
              className="
                overflow-hidden
                rounded-xl
                border border-white/[0.06]
              "
            >
              <div
                className="
                  grid
                  grid-cols-4
                  border-b border-white/[0.06]
                  bg-white/[0.02]
                  px-4
                  py-3
                  text-[8px]
                  font-bold
                  text-slate-600
                "
              >
                <span>التاريخ</span>
                <span>الخدمة</span>
                <span>المبلغ</span>
                <span>الحالة</span>
              </div>

              {[
                ["12 Aug", "Cleaning", "450 EGP", "Paid"],
                ["28 Jul", "Dental X-Ray", "250 EGP", "Paid"],
                ["14 Jul", "Consultation", "300 EGP", "Paid"],
              ].map((row, index) => (
                <div
                  key={index}
                  className="
                    grid
                    grid-cols-4
                    border-b
                    border-white/[0.04]
                    px-4
                    py-3.5
                    text-[9px]
                    last:border-0
                  "
                >
                  <span className="text-slate-500">
                    {row[0]}
                  </span>

                  <span className="font-semibold text-slate-300">
                    {row[1]}
                  </span>

                  <span className="font-black text-white">
                    {row[2]}
                  </span>

                  <span className="font-bold text-emerald-300">
                    {row[3]}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* NOTIFICATIONS */}

          <GlassCard className="p-5">
            <SectionHeader
              icon={Bell}
              title="الإشعارات"
              subtitle="Latest notifications"
            />

            <div className="space-y-2">
              <NotificationItem
                icon={CalendarDays}
                title="موعد قادم"
                text="لديك موعد يوم الأحد 23 أغسطس الساعة 10:30 صباحاً."
              />

              <NotificationItem
                icon={AlertCircle}
                title="دفعة مستحقة"
                text="يوجد مبلغ 850 جنيه مستحق على حسابك."
                type="warning"
              />

              <NotificationItem
                icon={MessageCircle}
                title="رسالة من الطبيب"
                text="د. أحمد أرسل لك ملاحظة جديدة."
              />
            </div>
          </GlassCard>
        </div>

        {/* =====================================================
            DOCTOR MESSAGE
        ===================================================== */}

        <GlassCard className="mt-5 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3">
              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  border border-blue-400/20
                  bg-blue-400/10
                  text-blue-300
                "
              >
                <MessageCircle size={19} />
              </div>

              <div>
                <p className="text-xs font-black text-white">
                  رسالة الطبيب
                </p>

                <p className="mt-1 text-[8px] text-slate-600">
                  Dr. Ahmed Mohamed
                </p>
              </div>
            </div>

            <div
              className="
                flex-1
                rounded-xl
                border border-blue-400/10
                bg-blue-400/[0.025]
                p-4
              "
            >
              <p className="text-[10px] leading-6 text-slate-400">
                برجاء الالتزام بالتعليمات الخاصة بالعناية
                بالأسنان قبل الزيارة القادمة.
              </p>
            </div>

            <button
              type="button"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border border-cyan-400/15
                bg-cyan-400/[0.04]
                px-5
                py-3
                text-[9px]
                font-bold
                text-cyan-300
                transition
                hover:bg-cyan-400/10
              "
            >
              فتح المحادثة
              <ChevronRight size={13} />
            </button>
          </div>
        </GlassCard>

        {/* =====================================================
            QUICK SERVICES
        ===================================================== */}

        <section className="mt-5">
          <GlassCard className="p-5">
            <SectionHeader
              icon={Zap}
              title="خدمات سريعة"
              subtitle="Quick services"
            />

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <QuickAction
                icon={CalendarDays}
                title="حجز موعد"
                description="Book a new appointment"
              />

              <QuickAction
                icon={FileText}
                title="الملف الطبي"
                description="View medical records"
              />

              <QuickAction
                icon={ScanLine}
                title="الأشعة"
                description="View your X-Rays"
              />

              <QuickAction
                icon={CreditCard}
                title="المدفوعات"
                description="View payment history"
              />
            </div>
          </GlassCard>
        </section>

        {/* =====================================================
            AI ASSISTANT
        ===================================================== */}

        <motion.div
          whileHover={{ y: -3 }}
          className="
            relative
            mt-5
            overflow-hidden
            rounded-2xl
            border border-cyan-400/15
            bg-gradient-to-r
            from-cyan-400/[0.07]
            via-blue-500/[0.04]
            to-transparent
            p-5
          "
        >
          <div
            className="
              absolute
              -right-10
              -top-10
              h-36
              w-36
              rounded-full
              bg-cyan-400/10
              blur-3xl
            "
          />

          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-2xl
                  border border-cyan-400/20
                  bg-cyan-400/10
                  text-cyan-300
                  shadow-[0_0_30px_rgba(34,211,238,.12)]
                "
              >
                <Bot size={23} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-white">
                    Dental AI Assistant
                  </h3>

                  <span
                    className="
                      rounded-full
                      border border-cyan-400/20
                      bg-cyan-400/10
                      px-2
                      py-0.5
                      text-[7px]
                      font-black
                      text-cyan-300
                    "
                  >
                    AI
                  </span>
                </div>

                <p className="mt-1 text-[9px] text-slate-600">
                  اسأل عن مواعيدك، خطة العلاج أو أي معلومة
                  في ملفك الطبي.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-cyan-300
                to-blue-400
                px-5
                py-3
                text-[9px]
                font-black
                text-[#001018]
                shadow-[0_0_30px_rgba(34,211,238,.2)]
              "
            >
              <MessageCircle size={14} />
              تحدث مع المساعد
            </button>
          </div>
        </motion.div>

        {/* =====================================================
            SECURITY
        ===================================================== */}

        <div className="mt-5 flex items-center justify-center gap-2 text-[8px] text-slate-700">
          <LockKeyhole size={11} />

          <span>
            Your medical information is protected and encrypted
          </span>
        </div>
      </main>
    </div>
  );
}