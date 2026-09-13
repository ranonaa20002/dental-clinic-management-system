import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  Stethoscope,
  UserRoundPlus,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Sparkles,
  Activity,
  LockKeyhole,
  ScanLine,
  CircleDot,
} from "lucide-react";

export default function JoinDoctor() {
  const [doctorId, setDoctorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleJoinRequest = async () => {
    setMessage("");
    setMessageType("");

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("من فضلك سجل الدخول أولاً.");
      setMessageType("error");
      return;
    }

    if (!doctorId.trim()) {
      setMessage("من فضلك اكتب ID الدكتور.");
      setMessageType("error");
      return;
    }

    const doctorIdNumber = Number(doctorId);

    if (!Number.isInteger(doctorIdNumber) || doctorIdNumber <= 0) {
      setMessage("ID الدكتور غير صحيح.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const meResponse = await api.get("/users/me");

      const patient = meResponse?.data;

      console.log("CURRENT USER:", patient);
      console.log("PATIENT ID:", patient?.id);
      console.log("DOCTOR ID:", doctorIdNumber);
      console.log("ACCOUNT TYPE:", patient?.AccountType);

      if (!patient?.id) {
        setMessage("لم يتم العثور على بيانات المستخدم.");
        setMessageType("error");
        return;
      }

      if (Number(patient.id) === doctorIdNumber) {
        setMessage("لا يمكن إرسال طلب لنفس حسابك.");
        setMessageType("error");
        return;
      }

      const response = await api.post("/join-requests", {
        data: {
          patient: patient.id,
          doctor: doctorIdNumber,
          status: "pending",
        },
      });

      console.log("JOIN REQUEST CREATED:", response.data);

      setMessage("تم إرسال طلب الانضمام للطبيب بنجاح.");
      setMessageType("success");
      setDoctorId("");
    } catch (error) {
      console.error("JOIN REQUEST ERROR:", error);
      console.error("STATUS:", error?.response?.status);
      console.error(
        "SERVER ERROR:",
        JSON.stringify(error?.response?.data, null, 2)
      );

      const status = error?.response?.status;

      const serverMessage =
        error?.response?.data?.error?.message;

      if (status === 401) {
        setMessage(
          "جلسة الدخول انتهت. سجل الدخول مرة أخرى."
        );

        setMessageType("error");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("patient");

        return;
      }

      if (status === 403) {
        setMessage(
          "ليس لديك صلاحية إنشاء طلب انضمام. فعّلي Create في صلاحيات Authenticated داخل Strapi."
        );

        setMessageType("error");

        return;
      }

      if (status === 400) {
        setMessage(
          serverMessage ||
            "بيانات طلب الانضمام غير صحيحة. تأكدي من أسماء الحقول في Strapi."
        );

        setMessageType("error");

        return;
      }

      setMessage(
        serverMessage ||
          "حدث خطأ أثناء إرسال الطلب."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#020b16]
        text-white
      "
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <div
        className="
          fixed
          inset-0
          bg-cover
          bg-center
          bg-no-repeat
          opacity-30
        "
        style={{
          backgroundImage:
            "url('/images/dental-clinic-bg.png')",
        }}
      />

      {/* Dark overlay */}
      <div
        className="
          fixed
          inset-0
          bg-gradient-to-br
          from-[#020817]/95
          via-[#031525]/90
          to-[#00111f]/95
        "
      />

      {/* Cyan glow right */}
      <div
        className="
          fixed
          -right-40
          top-10
          w-[500px]
          h-[500px]
          rounded-full
          bg-cyan-500/10
          blur-[120px]
          pointer-events-none
        "
      />

      {/* Blue glow left */}
      <div
        className="
          fixed
          -left-40
          bottom-0
          w-[500px]
          h-[500px]
          rounded-full
          bg-blue-600/10
          blur-[120px]
          pointer-events-none
        "
      />

      {/* Grid */}
      <div
        className="
          fixed
          inset-0
          pointer-events-none
          opacity-[0.08]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,.35) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* =====================================================
          FLOATING PARTICLES
      ====================================================== */}

      <FloatingParticle
        className="top-[18%] right-[12%]"
        delay={0}
      />

      <FloatingParticle
        className="top-[32%] right-[42%]"
        delay={0.8}
      />

      <FloatingParticle
        className="top-[68%] right-[18%]"
        delay={1.3}
      />

      <FloatingParticle
        className="top-[74%] left-[12%]"
        delay={1.8}
      />

      <FloatingParticle
        className="top-[20%] left-[25%]"
        delay={2.2}
      />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main
        className="
          relative
          z-10
          min-h-screen
          flex
          items-center
          justify-center
          px-4
          py-10
        "
      >
        <div
          className="
            w-full
            max-w-6xl
            grid
            grid-cols-1
            lg:grid-cols-[1.05fr_.95fr]
            gap-8
            items-center
          "
        >
          {/* =================================================
              LEFT VISUAL SIDE
          ================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              relative
              min-h-[570px]
              hidden
              lg:flex
              items-center
              justify-center
            "
          >
            {/* Orbit rings */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                w-[440px]
                h-[440px]
                rounded-full
                border
                border-cyan-400/15
              "
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                w-[350px]
                h-[350px]
                rounded-full
                border
                border-blue-400/20
              "
            />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "linear",
              }}
              className="
                absolute
                w-[275px]
                h-[275px]
                rounded-full
                border
                border-cyan-300/10
              "
            />

            {/* Main image */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.9,
                delay: 0.2,
              }}
              className="
                relative
                z-10
                w-[330px]
                h-[430px]
                rounded-[2.5rem]
                overflow-hidden
                border
                border-cyan-400/25
                shadow-[0_0_80px_rgba(34,211,238,.18)]
              "
            >
              <img
                src="/images/dental-clinic-bg.png"
                alt="Dental Clinic"
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#020b16]
                  via-transparent
                  to-cyan-500/10
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-cyan-500/5
                  mix-blend-screen
                "
              />

              {/* Scan line */}

              <motion.div
                animate={{
                  y: ["-100%", "500%"],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  left-0
                  right-0
                  h-20
                  bg-gradient-to-b
                  from-transparent
                  via-cyan-400/15
                  to-transparent
                  pointer-events-none
                "
              />
            </motion.div>

            {/* AI scan card */}

            <motion.div
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.7,
              }}
              className="
                absolute
                z-20
                top-[12%]
                left-[2%]
                w-56
                rounded-3xl
                border
                border-cyan-400/25
                bg-[#061522]/85
                backdrop-blur-xl
                p-4
                shadow-[0_0_40px_rgba(34,211,238,.08)]
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-white">
                    AI SCAN ACTIVE
                  </p>

                  <p className="text-[10px] text-slate-500 mt-1">
                    Real-time dental analysis
                  </p>
                </div>

                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-cyan-400/10
                    border
                    border-cyan-400/20
                    text-cyan-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ScanLine size={21} />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <span
                  className="
                    w-2
                    h-2
                    rounded-full
                    bg-cyan-300
                    shadow-[0_0_12px_rgba(34,211,238,1)]
                  "
                />

                <span className="text-[10px] text-cyan-300">
                  System online
                </span>
              </div>
            </motion.div>

            {/* Dental status */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                z-20
                bottom-[10%]
                right-[0%]
                w-56
                rounded-3xl
                border
                border-cyan-400/25
                bg-[#061522]/90
                backdrop-blur-xl
                p-4
                shadow-[0_0_45px_rgba(34,211,238,.1)]
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    w-11
                    h-11
                    rounded-2xl
                    bg-cyan-400/10
                    border
                    border-cyan-400/20
                    text-cyan-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Activity size={20} />
                </div>

                <div>
                  <p className="text-[10px] text-slate-500">
                    DENTAL STATUS
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-black text-emerald-300">
                      HEALTHY
                    </span>

                    <span
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-emerald-400
                        shadow-[0_0_10px_rgba(52,211,153,1)]
                      "
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating dots */}

            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
              className="
                absolute
                top-[18%]
                right-[8%]
                text-cyan-300
              "
            >
              <CircleDot size={12} />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="
                absolute
                bottom-[24%]
                left-[8%]
                text-blue-300
              "
            >
              <CircleDot size={9} />
            </motion.div>
          </motion.section>

          {/* =================================================
              RIGHT FORM
          ================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              x: 40,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              relative
              rounded-[2.5rem]
              border
              border-cyan-400/15
              bg-[#061522]/80
              backdrop-blur-2xl
              overflow-hidden
              shadow-[0_0_80px_rgba(0,0,0,.35)]
            "
          >
            {/* Top glow */}

            <div
              className="
                absolute
                top-0
                left-0
                right-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-cyan-400
                to-transparent
              "
            />

            {/* Inner glow */}

            <div
              className="
                absolute
                -top-32
                -right-32
                w-64
                h-64
                rounded-full
                bg-cyan-400/10
                blur-[90px]
                pointer-events-none
              "
            />

            <div className="relative z-10 p-7 md:p-9">
              {/* Header */}

              <div className="flex items-center justify-between gap-4">
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-2.5
                    rounded-full
                    border
                    border-cyan-400/20
                    bg-cyan-400/5
                  "
                >
                  <LockKeyhole
                    size={15}
                    className="text-cyan-300"
                  />

                  <span className="text-xs text-cyan-200 font-bold">
                    بيانات آمنة ومشفرة
                  </span>

                  <ShieldCheck
                    size={16}
                    className="text-cyan-300"
                  />
                </div>

                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-400
                    to-blue-500
                    flex
                    items-center
                    justify-center
                    shadow-[0_0_30px_rgba(34,211,238,.25)]
                  "
                >
                  <Stethoscope
                    size={23}
                    className="text-white"
                  />
                </motion.div>
              </div>

              {/* Title */}

              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <Sparkles
                    size={17}
                    className="text-cyan-300"
                  />

                  <span className="text-xs font-bold text-cyan-300">
                    PATIENT CARE PORTAL
                  </span>
                </div>

                <h1
                  className="
                    text-3xl
                    md:text-4xl
                    font-black
                    text-white
                    mt-3
                    leading-tight
                  "
                >
                  الانضمام إلى
                  <span
                    className="
                      block
                      bg-gradient-to-r
                      from-cyan-300
                      via-sky-400
                      to-blue-500
                      bg-clip-text
                      text-transparent
                    "
                  >
                    عيادة الدكتور
                  </span>
                </h1>

                <p
                  className="
                    text-sm
                    text-slate-400
                    mt-4
                    leading-7
                    max-w-lg
                  "
                >
                  أدخل ID الدكتور لإرسال طلب انضمام
                  ومتابعة ملفك الطبي ومواعيدك من مكان واحد.
                </p>
              </div>

              {/* Divider */}

              <div
                className="
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-400/15
                  to-transparent
                  my-7
                "
              />

              {/* Doctor ID */}

              <div>
                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-black
                    text-slate-200
                    mb-3
                  "
                >
                  <UserRoundPlus
                    size={17}
                    className="text-cyan-300"
                  />

                  ID الدكتور
                </label>

                <div className="relative">
                  <div
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      w-10
                      h-10
                      rounded-xl
                      bg-cyan-400/10
                      border
                      border-cyan-400/15
                      flex
                      items-center
                      justify-center
                      text-cyan-300
                    "
                  >
                    <Search size={18} />
                  </div>

                  <input
                    type="number"
                    min="1"
                    value={doctorId}
                    onChange={(e) => {
                      setDoctorId(e.target.value);
                      setMessage("");
                      setMessageType("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleJoinRequest();
                      }
                    }}
                    placeholder="مثال: 14"
                    className="
                      w-full
                      h-16
                      pr-16
                      pl-5
                      rounded-2xl
                      border
                      border-cyan-400/15
                      bg-[#020d19]/80
                      text-white
                      placeholder:text-slate-600
                      outline-none
                      transition-all
                      duration-300
                      focus:border-cyan-400/50
                      focus:bg-[#031321]
                      focus:shadow-[0_0_30px_rgba(34,211,238,.08)]
                    "
                  />

                  {/* Input active line */}

                  <div
                    className="
                      absolute
                      bottom-0
                      right-6
                      left-6
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-cyan-400
                      to-transparent
                      opacity-0
                      focus-within:opacity-100
                      transition-opacity
                    "
                  />
                </div>

                <div className="flex items-center gap-2 mt-3">
                  <CircleDot
                    size={11}
                    className="text-slate-600"
                  />

                  <span className="text-[11px] text-slate-500">
                    يمكنك الحصول على ID الدكتور من العيادة.
                  </span>
                </div>
              </div>

              {/* Button */}

              <motion.button
                type="button"
                onClick={handleJoinRequest}
                disabled={loading}
                whileHover={
                  !loading
                    ? {
                        scale: 1.01,
                        y: -2,
                      }
                    : {}
                }
                whileTap={
                  !loading
                    ? {
                        scale: 0.98,
                      }
                    : {}
                }
                className="
                  relative
                  overflow-hidden
                  w-full
                  h-16
                  mt-7
                  rounded-2xl
                  bg-gradient-to-r
                  from-cyan-400
                  via-sky-500
                  to-blue-600
                  text-white
                  font-black
                  shadow-[0_0_35px_rgba(34,211,238,.18)]
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {/* Button shine */}

                {!loading && (
                  <motion.div
                    animate={{
                      x: ["-120%", "140%"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                    className="
                      absolute
                      inset-y-0
                      w-20
                      bg-white/20
                      skew-x-[-20deg]
                      blur-sm
                    "
                  />
                )}

                <span
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-center
                    gap-3
                  "
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      />

                      جاري إرسال الطلب...
                    </>
                  ) : (
                    <>
                      <UserRoundPlus size={20} />

                      طلب الانضمام

                      <ArrowLeft size={18} />
                    </>
                  )}
                </span>
              </motion.button>

              {/* Message */}

              <AnimatePresence mode="wait">
                {message && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      height: 0,
                    }}
                    className={`
                      mt-5
                      p-4
                      rounded-2xl
                      border
                      ${
                        messageType === "success"
                          ? "bg-emerald-400/5 border-emerald-400/20"
                          : "bg-red-400/5 border-red-400/20"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          w-9
                          h-9
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          shrink-0
                          ${
                            messageType === "success"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-red-400/10 text-red-300"
                          }
                        `}
                      >
                        {messageType === "success" ? (
                          <CheckCircle2 size={18} />
                        ) : (
                          <AlertCircle size={18} />
                        )}
                      </div>

                      <div>
                        <p
                          className={`
                            text-sm
                            font-bold
                            leading-6
                            ${
                              messageType === "success"
                                ? "text-emerald-300"
                                : "text-red-300"
                            }
                          `}
                        >
                          {message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom features */}

              <div
                className="
                  grid
                  grid-cols-3
                  gap-3
                  mt-7
                "
              >
                <MiniFeature
                  icon={<ShieldCheck size={16} />}
                  text="آمن"
                />

                <MiniFeature
                  icon={<Activity size={16} />}
                  text="متابعة"
                />

                <MiniFeature
                  icon={<Stethoscope size={16} />}
                  text="طبي"
                />
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Bottom status */}

      <div
        className="
          fixed
          bottom-5
          left-1/2
          -translate-x-1/2
          z-20
          hidden
          md:flex
          items-center
          gap-3
          px-5
          py-2.5
          rounded-full
          bg-[#061522]/80
          backdrop-blur-xl
          border
          border-cyan-400/10
          text-[10px]
          text-slate-500
        "
      >
        <span
          className="
            w-2
            h-2
            rounded-full
            bg-emerald-400
            shadow-[0_0_10px_rgba(52,211,153,1)]
          "
        />

        DENTAL CARE SYSTEM

        <span className="text-slate-700">
          •
        </span>

        SECURE CONNECTION
      </div>
    </div>
  );
}

/* =========================================================
   FLOATING PARTICLE
========================================================= */

function FloatingParticle({ className, delay }) {
  return (
    <motion.div
      animate={{
        y: [0, -18, 0],
        opacity: [0.25, 0.8, 0.25],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        fixed
        ${className}
        z-0
        pointer-events-none
      `}
    >
      <div
        className="
          w-2
          h-2
          rounded-full
          bg-cyan-300
          shadow-[0_0_14px_rgba(34,211,238,1)]
        "
      />
    </motion.div>
  );
}

/* =========================================================
   MINI FEATURE
========================================================= */

function MiniFeature({ icon, text }) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        flex
        items-center
        justify-center
        gap-2
        py-3
        rounded-xl
        border
        border-cyan-400/10
        bg-cyan-400/[0.03]
        text-slate-500
      "
    >
      <span className="text-cyan-300">
        {icon}
      </span>

      <span className="text-[10px] font-bold">
        {text}
      </span>
    </motion.div>
  );
}