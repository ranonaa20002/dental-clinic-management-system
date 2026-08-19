import {
  CalendarDays,
  Clock3,
  Bell,
  MessageSquare,
  CreditCard,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ChevronLeft,
  Stethoscope,
  ShieldCheck,
  Activity,
  Receipt,
  UserRound,
  ClipboardList,
  Phone,
  MapPin,
  Sparkles,
  HeartPulse,
  CircleCheck,
  WalletCards,
} from "lucide-react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =====================================================
   CUSTOM TOOTH SVG
===================================================== */

function ToothIcon({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31 13C20 14 14 23 16 35C18 46 22 49 24 62C26 75 30 88 37 88C44 88 43 70 50 70C57 70 56 88 63 88C70 88 74 75 76 62C78 49 82 46 84 35C86 23 80 14 69 13C61 12 56 17 50 17C44 17 39 12 31 13Z"
        fill="currentColor"
      />
      <path
        d="M28 29C34 23 40 25 45 29"
        stroke="white"
        strokeOpacity=".8"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =====================================================
   FLOATING DENTAL DECORATION
===================================================== */

function FloatingTooth({ className = "", delay = 0, size = 42 }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: 0.18,
        scale: [1, 1.08, 1],
        rotate: [-5, 5, -5],
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { duration: 0.8 },
        scale: {
          duration: 4,
          repeat: Infinity,
          delay,
        },
        rotate: {
          duration: 5,
          repeat: Infinity,
          delay,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          delay,
        },
      }}
    >
      <ToothIcon size={size} />
    </motion.div>
  );
}

/* =====================================================
   MAIN
===================================================== */

export default function AdultPatientDashboard({ patient }) {
  const [appointmentStatus, setAppointmentStatus] =
    useState("pending");

  const [rejectReason, setRejectReason] = useState("");
  const [showReason, setShowReason] = useState(false);

  const patientName =
    patient?.name ||
    patient?.username ||
    "المريض";

  const handleConfirm = () => {
    setAppointmentStatus("confirmed");
  };

  const handleReject = () => {
    if (!rejectReason.trim()) return;

    setAppointmentStatus("rejected");
    setShowReason(false);
  };

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        bg-[#f5fbfc]
        text-slate-800
        overflow-hidden
        selection:bg-cyan-200
      "
    >
      {/* =================================================
          BACKGROUND DECORATIONS
      ================================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="
            absolute
            -top-40
            -right-40
            w-[500px]
            h-[500px]
            rounded-full
            bg-cyan-200/30
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-[35%]
            -left-40
            w-[450px]
            h-[450px]
            rounded-full
            bg-blue-200/20
            blur-3xl
          "
        />

        <FloatingTooth
          className="top-32 left-[8%] text-cyan-400"
          delay={0}
          size={70}
        />

        <FloatingTooth
          className="top-[45%] right-[3%] text-blue-400"
          delay={1}
          size={55}
        />

        <FloatingTooth
          className="bottom-[10%] left-[12%] text-teal-400"
          delay={2}
          size={45}
        />

        <motion.div
          className="absolute top-[20%] right-[18%] text-cyan-400"
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: {
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 3,
              repeat: Infinity,
            },
          }}
        >
          <Sparkles size={26} />
        </motion.div>
      </div>

      {/* =================================================
          HEADER
      ================================================= */}

      <header
        className="
          sticky
          top-0
          z-50
          bg-white/85
          backdrop-blur-2xl
          border-b
          border-cyan-100
        "
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-[78px] flex items-center justify-between">

            {/* BRAND */}

            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <motion.div
                whileHover={{
                  rotate: -8,
                  scale: 1.08,
                }}
                className="
                  relative
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-500
                  to-blue-600
                  text-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-cyan-200
                "
              >
                <ToothIcon size={30} />

                <motion.span
                  className="
                    absolute
                    -top-1
                    -left-1
                    text-yellow-300
                  "
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles size={13} />
                </motion.span>
              </motion.div>

              <div>
                <h1 className="font-black text-slate-900">
                  My Dental Clinic
                </h1>

                <p className="text-[11px] text-cyan-600 mt-0.5 font-bold">
                  بوابة المريض ✨
                </p>
              </div>
            </motion.div>

            {/* HEADER ACTIONS */}

            <div className="flex items-center gap-2 md:gap-3">

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="
                  hidden
                  md:flex
                  items-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-cyan-50
                  text-cyan-700
                  border
                  border-cyan-100
                  text-sm
                  font-bold
                "
              >
                <Phone size={17} />
                تواصل معنا
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="
                  relative
                  w-11
                  h-11
                  rounded-xl
                  bg-slate-50
                  text-slate-600
                  flex
                  items-center
                  justify-center
                  border
                  border-slate-100
                "
              >
                <Bell size={20} />

                <motion.span
                  className="
                    absolute
                    top-1
                    left-1
                    w-2.5
                    h-2.5
                    rounded-full
                    bg-cyan-500
                  "
                  animate={{
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                />
              </motion.button>

              <div
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-3
                  pr-3
                  border-r
                  border-slate-200
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gradient-to-br
                    from-cyan-100
                    to-blue-100
                    flex
                    items-center
                    justify-center
                    text-cyan-700
                  "
                >
                  <UserRound size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {patientName}
                  </p>

                  <p className="text-[11px] text-slate-400">
                    مريض
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-4
          md:px-6
          py-7
          space-y-6
        "
      >

        {/* =================================================
            HERO
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            bg-gradient-to-br
            from-cyan-600
            via-cyan-500
            to-blue-600
            p-7
            md:p-10
            text-white
            shadow-xl
            shadow-cyan-100
          "
        >
          {/* Decorative circles */}

          <motion.div
            className="
              absolute
              -right-20
              -top-32
              w-80
              h-80
              rounded-full
              bg-white/10
            "
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
          />

          <motion.div
            className="
              absolute
              -left-20
              -bottom-40
              w-96
              h-96
              rounded-full
              bg-blue-900/10
            "
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
          />

          <FloatingTooth
            className="top-8 left-10 text-white"
            delay={0}
            size={100}
          />

          <FloatingTooth
            className="bottom-5 right-[35%] text-white"
            delay={1}
            size={60}
          />

          <div className="relative z-10">

            <div className="flex items-center gap-2 text-cyan-50 text-sm">
              <ShieldCheck size={17} />
              <span>ملفك الطبي آمن ومحمي</span>
            </div>

            <h1
              className="
                text-3xl
                md:text-4xl
                font-black
                mt-4
              "
            >
              أهلاً بك، {patientName} 👋
            </h1>

            <p
              className="
                text-cyan-50
                mt-3
                max-w-2xl
                leading-7
              "
            >
              تابع مواعيدك وخطة علاجك ومدفوعاتك
              وكل تفاصيل ابتسامتك من مكان واحد.
            </p>

            <div
              className="
                flex
                flex-wrap
                gap-3
                mt-7
              "
            >
              <motion.div
                whileHover={{ y: -3 }}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-white/15
                  border
                  border-white/15
                  text-sm
                  backdrop-blur
                "
              >
                آخر زيارة: 12 أغسطس 2026
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="
                  px-4
                  py-2.5
                  rounded-xl
                  bg-emerald-400/20
                  border
                  border-white/10
                  text-white
                  text-sm
                  font-bold
                  flex
                  items-center
                  gap-2
                "
              >
                <CircleCheck size={16} />
                خطة العلاج نشطة
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* =================================================
            STATS
        ================================================= */}

        <section
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
          "
        >
          <StatCard
            icon={<CalendarDays size={21} />}
            title="الموعد القادم"
            value="23 أغسطس"
            description="10:30 صباحًا"
            color="cyan"
          />

          <StatCard
            icon={<Activity size={21} />}
            title="الخطة العلاجية"
            value="65%"
            description="تم إنجاز 65% من الخطة"
            color="blue"
          />

          <StatCard
            icon={<WalletCards size={21} />}
            title="الرصيد المستحق"
            value="850 جنيه"
            description="فاتورة غير مسددة"
            color="violet"
          />

          <StatCard
            icon={<FileText size={21} />}
            title="الملف الطبي"
            value="12"
            description="مستند وسجل طبي"
            color="teal"
          />
        </section>

        {/* =================================================
            APPOINTMENT
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            margin: "-80px",
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            bg-white
            rounded-[2rem]
            border
            border-cyan-100
            shadow-sm
            overflow-hidden
          "
        >
          <div
            className="
              px-6
              py-5
              border-b
              border-slate-100
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <div className="flex items-center gap-3">

              <motion.div
                whileHover={{
                  rotate: -8,
                  scale: 1.05,
                }}
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-cyan-50
                  text-cyan-600
                  flex
                  items-center
                  justify-center
                "
              >
                <CalendarDays size={21} />
              </motion.div>

              <div>
                <h2 className="font-black">
                  الموعد القادم
                </h2>

                <p className="text-xs text-slate-400 mt-1">
                  يوجد طلب جديد بانتظار تأكيدك
                </p>
              </div>
            </div>

            <StatusBadge
              status={appointmentStatus}
            />
          </div>

          <div className="p-6">

            <div
              className="
                rounded-2xl
                border
                border-cyan-100
                bg-gradient-to-br
                from-cyan-50/60
                to-white
                p-5
              "
            >
              <div
                className="
                  flex
                  flex-col
                  md:flex-row
                  md:items-center
                  gap-5
                "
              >

                {/* DOCTOR */}

                <motion.div
                  whileHover={{
                    rotate: 4,
                    scale: 1.05,
                  }}
                  className="
                    relative
                    w-20
                    h-20
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-100
                    to-blue-100
                    border
                    border-cyan-100
                    flex
                    items-center
                    justify-center
                    shrink-0
                    text-cyan-600
                  "
                >
                  <Stethoscope size={30} />

                  <motion.div
                    className="
                      absolute
                      -top-2
                      -left-2
                      text-yellow-400
                    "
                    animate={{
                      rotate: [0, 15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles size={16} />
                  </motion.div>
                </motion.div>

                <div className="flex-1">

                  <div
                    className="
                      flex
                      flex-col
                      md:flex-row
                      md:items-center
                      justify-between
                      gap-3
                    "
                  >
                    <div>
                      <h3 className="text-xl font-black">
                        د. أحمد محمد
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        استشاري طب وجراحة الأسنان
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-xs
                        text-slate-400
                      "
                    >
                      <MapPin size={15} />
                      فرع مدينة نصر
                    </div>
                  </div>

                  {/* INFO */}

                  <div
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-3
                      gap-3
                      mt-5
                    "
                  >
                    <InfoBox
                      icon={<CalendarDays size={17} />}
                      title="التاريخ"
                      value="الأحد، 23 أغسطس 2026"
                    />

                    <InfoBox
                      icon={<Clock3 size={17} />}
                      title="الوقت"
                      value="10:30 صباحًا"
                    />

                    <InfoBox
                      icon={<ClipboardList size={17} />}
                      title="نوع الزيارة"
                      value="فحص ومتابعة"
                    />
                  </div>

                  {/* ACTIONS */}

                  {appointmentStatus === "pending" && (
                    <AnimatePresence mode="wait">

                      {!showReason ? (
                        <motion.div
                          key="actions"
                          initial={{
                            opacity: 0,
                            y: 10,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -10,
                          }}
                          className="
                            flex
                            flex-wrap
                            gap-3
                            mt-5
                          "
                        >
                          <motion.button
                            whileHover={{
                              y: -2,
                              scale: 1.01,
                            }}
                            whileTap={{
                              scale: 0.97,
                            }}
                            onClick={handleConfirm}
                            className="
                              flex
                              items-center
                              gap-2
                              px-5
                              py-3
                              rounded-xl
                              bg-gradient-to-r
                              from-cyan-600
                              to-blue-600
                              text-white
                              font-bold
                              text-sm
                              shadow-lg
                              shadow-cyan-100
                            "
                          >
                            <CheckCircle2 size={18} />
                            تأكيد الموعد
                          </motion.button>

                          <motion.button
                            whileHover={{
                              y: -2,
                            }}
                            whileTap={{
                              scale: 0.97,
                            }}
                            onClick={() =>
                              setShowReason(true)
                            }
                            className="
                              flex
                              items-center
                              gap-2
                              px-5
                              py-3
                              rounded-xl
                              bg-white
                              border
                              border-slate-200
                              text-slate-600
                              font-bold
                              text-sm
                            "
                          >
                            <XCircle size={18} />
                            الموعد غير مناسب
                          </motion.button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="reason"
                          initial={{
                            opacity: 0,
                            height: 0,
                          }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          className="mt-5"
                        >
                          <label
                            className="
                              block
                              text-sm
                              font-bold
                              text-slate-700
                              mb-2
                            "
                          >
                            سبب عدم مناسبة الموعد
                          </label>

                          <textarea
                            value={rejectReason}
                            onChange={(e) =>
                              setRejectReason(
                                e.target.value
                              )
                            }
                            placeholder="اكتب سبب عدم مناسبة الموعد..."
                            className="
                              w-full
                              min-h-28
                              rounded-xl
                              border
                              border-slate-200
                              bg-white
                              p-4
                              text-sm
                              outline-none
                              resize-none
                              focus:border-cyan-400
                              focus:ring-4
                              focus:ring-cyan-50
                            "
                          />

                          <div className="flex gap-3 mt-3">

                            <motion.button
                              whileHover={{
                                y: -2,
                              }}
                              whileTap={{
                                scale: 0.97,
                              }}
                              onClick={handleReject}
                              className="
                                px-5
                                py-2.5
                                rounded-xl
                                bg-red-500
                                text-white
                                font-bold
                                text-sm
                              "
                            >
                              إرسال
                            </motion.button>

                            <motion.button
                              whileTap={{
                                scale: 0.97,
                              }}
                              onClick={() =>
                                setShowReason(false)
                              }
                              className="
                                px-5
                                py-2.5
                                rounded-xl
                                bg-slate-100
                                text-slate-600
                                font-bold
                                text-sm
                              "
                            >
                              إلغاء
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* CONFIRMED */}

                  <AnimatePresence>
                    {appointmentStatus === "confirmed" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.97,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="
                          mt-5
                          rounded-xl
                          bg-emerald-50
                          border
                          border-emerald-100
                          p-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-emerald-700
                            font-bold
                            text-sm
                          "
                        >
                          <CheckCircle2 size={19} />
                          تم تأكيد الموعد بنجاح 🎉
                        </div>

                        <p
                          className="
                            text-xs
                            text-emerald-600
                            mt-2
                          "
                        >
                          ننتظرك يوم الأحد 23 أغسطس
                          الساعة 10:30 صباحًا.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* REJECTED */}

                  <AnimatePresence>
                    {appointmentStatus === "rejected" && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.97,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="
                          mt-5
                          rounded-xl
                          bg-red-50
                          border
                          border-red-100
                          p-4
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            text-red-700
                            font-bold
                            text-sm
                          "
                        >
                          <XCircle size={19} />
                          تم إرسال طلب تغيير الموعد
                        </div>

                        <p
                          className="
                            text-xs
                            text-red-600
                            mt-2
                          "
                        >
                          السبب: {rejectReason}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* =================================================
            TWO COLUMNS
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >

          <DashboardSection
            icon={<Bell size={20} />}
            title="آخر التحديثات"
            subtitle="أحدث الإشعارات الخاصة بحسابك"
          >
            <div className="space-y-2 mt-5">

              <Notification
                icon={<CalendarDays />}
                title="تذكير بالموعد"
                text="لديك موعد مع د. أحمد يوم الأحد."
                time="منذ 10 دقائق"
              />

              <Notification
                icon={<MessageSquare />}
                title="رسالة جديدة"
                text="لديك رسالة جديدة من الطبيب."
                time="منذ ساعة"
              />

              <Notification
                icon={<Receipt />}
                title="فاتورة جديدة"
                text="تم إصدار فاتورة بقيمة 850 جنيه."
                time="منذ 3 ساعات"
              />
            </div>
          </DashboardSection>

          <DashboardSection
            icon={<MessageSquare size={20} />}
            title="رسالة من الطبيب"
            subtitle="آخر رسالة من الفريق الطبي"
          >
            <div
              className="
                mt-5
                rounded-2xl
                bg-gradient-to-br
                from-cyan-50
                to-white
                border
                border-cyan-100
                p-5
              "
            >
              <div className="flex items-center gap-3">

                <motion.div
                  whileHover={{
                    rotate: -5,
                    scale: 1.05,
                  }}
                  className="
                    w-11
                    h-11
                    rounded-xl
                    bg-gradient-to-br
                    from-cyan-500
                    to-blue-600
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Stethoscope size={19} />
                </motion.div>

                <div>
                  <h3 className="font-bold">
                    د. أحمد محمد
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    استشاري طب الأسنان
                  </p>
                </div>
              </div>

              <div
                className="
                  mt-5
                  p-4
                  bg-white
                  rounded-xl
                  border
                  border-cyan-50
                  text-sm
                  leading-7
                  text-slate-600
                "
              >
                أهلاً بك، نذكرك بإحضار الأشعة السابقة
                وأي تقارير طبية مرتبطة بالعلاج في الزيارة القادمة.
              </div>

              <motion.button
                whileHover={{ x: -4 }}
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-cyan-700
                "
              >
                فتح المحادثة
                <ArrowLeft size={16} />
              </motion.button>
            </div>
          </DashboardSection>
        </div>

        {/* =================================================
            TREATMENT + PAYMENT
        ================================================= */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          "
        >

          <DashboardSection
            icon={<Activity size={20} />}
            title="الخطة العلاجية"
            subtitle="متابعة تقدم حالتك العلاجية"
          >
            <div className="mt-6">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-3
                "
              >
                <span className="text-sm font-bold">
                  نسبة الإنجاز
                </span>

                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="text-sm font-black text-cyan-600"
                >
                  65%
                </motion.span>
              </div>

              <div
                className="
                  h-3
                  rounded-full
                  bg-cyan-50
                  overflow-hidden
                "
              >
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: "65%",
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                  "
                />
              </div>

              <div
                className="
                  grid
                  grid-cols-3
                  gap-3
                  mt-6
                "
              >
                <TreatmentStep
                  title="الفحص"
                  status="مكتمل"
                  done
                />

                <TreatmentStep
                  title="العلاج"
                  status="جاري"
                  active
                />

                <TreatmentStep
                  title="المتابعة"
                  status="قادم"
                />
              </div>
            </div>
          </DashboardSection>

          <DashboardSection
            icon={<CreditCard size={20} />}
            title="المدفوعات"
            subtitle="الفواتير والرصيد المستحق"
          >
            <motion.div
              whileHover={{
                y: -3,
              }}
              className="
                relative
                overflow-hidden
                mt-5
                rounded-2xl
                bg-gradient-to-br
                from-slate-900
                to-slate-800
                text-white
                p-6
              "
            >
              <FloatingTooth
                className="bottom-[-20px] left-10 text-white"
                size={100}
              />

              <div className="relative z-10">

                <p className="text-sm text-slate-400">
                  إجمالي المبلغ المستحق
                </p>

                <div className="flex items-end gap-2 mt-2">
                  <h2 className="text-3xl font-black">
                    850
                  </h2>

                  <span className="text-sm text-slate-400 mb-1">
                    جنيه مصري
                  </span>
                </div>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                    mt-6
                  "
                >
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-white
                      text-slate-900
                      font-bold
                      text-sm
                    "
                  >
                    دفع الآن
                  </motion.button>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-white/10
                      border
                      border-white/10
                      text-white
                      font-bold
                      text-sm
                    "
                  >
                    عرض الفاتورة
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </DashboardSection>
        </div>

        {/* =================================================
            MEDICAL RECORD
        ================================================= */}

        <DashboardSection
          icon={<FileText size={20} />}
          title="ملفي الطبي"
          subtitle="الوصول السريع إلى بياناتك الطبية"
        >
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-3
              mt-5
            "
          >
            <QuickCard
              icon={<FileText />}
              title="السجل الطبي"
              description="عرض التاريخ الطبي"
            />

            <QuickCard
              icon={<ClipboardList />}
              title="خطة العلاج"
              description="تفاصيل العلاج الحالي"
            />

            <QuickCard
              icon={<Receipt />}
              title="الفواتير"
              description="الفواتير والمدفوعات"
            />

            <QuickCard
              icon={<MessageSquare />}
              title="المحادثات"
              description="التواصل مع العيادة"
            />
          </div>
        </DashboardSection>

        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <section>

          <div
            className="
              flex
              items-center
              justify-between
              mb-4
            "
          >
            <div>
              <h2 className="font-black text-xl">
                الخدمات السريعة
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                كل ما تحتاجه لابتسامتك في مكان واحد ✨
              </p>
            </div>

            <motion.div
              animate={{
                x: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <ChevronLeft
                size={19}
                className="text-cyan-500"
              />
            </motion.div>
          </div>

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
            "
          >
            <ActionCard
              icon={<CalendarDays />}
              title="حجز موعد"
              description="احجز زيارة جديدة"
            />

            <ActionCard
              icon={<FileText />}
              title="الملف الطبي"
              description="عرض بياناتك الطبية"
            />

            <ActionCard
              icon={<CreditCard />}
              title="المدفوعات"
              description="إدارة الفواتير"
            />

            <ActionCard
              icon={<MessageSquare />}
              title="تواصل معنا"
              description="تحدث مع العيادة"
            />
          </div>
        </section>

        {/* FOOTER */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="
            text-center
            py-8
            text-xs
            text-slate-400
          "
        >
          <div className="flex justify-center items-center gap-2">
            <ToothIcon
              size={20}
              className="text-cyan-400"
            />
            ابتسامتك أهم حاجة عندنا 💙
          </div>
        </motion.div>
      </main>
    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  title,
  value,
  description,
  color,
}) {
  const colors = {
    cyan: "bg-cyan-50 text-cyan-600",
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
    teal: "bg-teal-50 text-teal-600",
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      className="
        group
        bg-white
        border
        border-slate-100
        rounded-2xl
        p-5
        shadow-sm
        hover:shadow-lg
        hover:shadow-cyan-100/50
        transition-shadow
      "
    >
      <div className="flex items-center justify-between">

        <motion.div
          whileHover={{
            rotate: -8,
            scale: 1.08,
          }}
          className={`
            w-10
            h-10
            rounded-xl
            flex
            items-center
            justify-center
            ${colors[color]}
          `}
        >
          {icon}
        </motion.div>

        <span className="text-[11px] text-slate-400">
          {title}
        </span>
      </div>

      <h2
        className="
          text-2xl
          font-black
          text-slate-900
          mt-5
        "
      >
        {value}
      </h2>

      <p className="text-xs text-slate-400 mt-1">
        {description}
      </p>
    </motion.div>
  );
}

/* =====================================================
   STATUS BADGE
===================================================== */

function StatusBadge({ status }) {
  if (status === "confirmed") {
    return (
      <motion.span
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="
          px-3
          py-1.5
          rounded-full
          bg-emerald-50
          text-emerald-700
          text-xs
          font-bold
        "
      >
        تم التأكيد
      </motion.span>
    );
  }

  if (status === "rejected") {
    return (
      <motion.span
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="
          px-3
          py-1.5
          rounded-full
          bg-red-50
          text-red-600
          text-xs
          font-bold
        "
      >
        تم طلب التغيير
      </motion.span>
    );
  }

  return (
    <motion.span
      animate={{
        opacity: [0.7, 1, 0.7],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
      }}
      className="
        px-3
        py-1.5
        rounded-full
        bg-amber-50
        text-amber-700
        text-xs
        font-bold
      "
    >
      بانتظار التأكيد
    </motion.span>
  );
}

/* =====================================================
   INFO BOX
===================================================== */

function InfoBox({
  icon,
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      className="
        bg-white
        rounded-xl
        border
        border-slate-100
        p-3
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-cyan-500
        "
      >
        {icon}

        <span className="text-xs text-slate-400">
          {title}
        </span>
      </div>

      <p
        className="
          text-sm
          font-bold
          text-slate-700
          mt-2
        "
      >
        {value}
      </p>
    </motion.div>
  );
}

/* =====================================================
   DASHBOARD SECTION
===================================================== */

function DashboardSection({
  icon,
  title,
  subtitle,
  children,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-70px",
      }}
      transition={{
        duration: 0.45,
      }}
      className="
        bg-white
        rounded-[2rem]
        border
        border-slate-100
        shadow-sm
        p-6
      "
    >
      <div className="flex items-center gap-3">

        <motion.div
          whileHover={{
            rotate: -8,
            scale: 1.06,
          }}
          className="
            w-10
            h-10
            rounded-xl
            bg-cyan-50
            text-cyan-600
            flex
            items-center
            justify-center
          "
        >
          {icon}
        </motion.div>

        <div>
          <h2 className="font-black">
            {title}
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </motion.section>
  );
}

/* =====================================================
   NOTIFICATION
===================================================== */

function Notification({
  icon,
  title,
  text,
  time,
}) {
  return (
    <motion.div
      whileHover={{
        x: -4,
        backgroundColor: "#f8fafc",
      }}
      className="
        flex
        gap-3
        p-3
        rounded-xl
        transition
        cursor-pointer
      "
    >
      <motion.div
        whileHover={{
          rotate: -7,
        }}
        className="
          w-10
          h-10
          rounded-xl
          bg-cyan-50
          text-cyan-600
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        {icon}
      </motion.div>

      <div className="flex-1 min-w-0">

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
          "
        >
          <h3 className="text-sm font-bold">
            {title}
          </h3>

          <span
            className="
              text-[10px]
              text-slate-400
              whitespace-nowrap
            "
          >
            {time}
          </span>
        </div>

        <p
          className="
            text-xs
            text-slate-400
            mt-1
            leading-5
          "
        >
          {text}
        </p>
      </div>
    </motion.div>
  );
}

/* =====================================================
   TREATMENT STEP
===================================================== */

function TreatmentStep({
  title,
  status,
  done,
  active,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className={`
        rounded-xl
        p-3
        border
        ${
          active
            ? "border-cyan-200 bg-cyan-50/50"
            : "border-slate-100 bg-white"
        }
      `}
    >
      <div className="flex items-center gap-2">

        <div
          className={`
            w-7
            h-7
            rounded-lg
            flex
            items-center
            justify-center
            ${
              done
                ? "bg-emerald-100 text-emerald-600"
                : active
                ? "bg-cyan-600 text-white"
                : "bg-slate-100 text-slate-400"
            }
          `}
        >
          {done ? (
            <CheckCircle2 size={15} />
          ) : active ? (
            <Activity size={15} />
          ) : (
            <span className="text-[10px] font-bold">
              •
            </span>
          )}
        </div>

        <div>
          <p className="text-xs font-bold">
            {title}
          </p>

          <p className="text-[10px] text-slate-400 mt-0.5">
            {status}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* =====================================================
   QUICK CARD
===================================================== */

function QuickCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.button
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
        text-right
        p-4
        rounded-xl
        border
        border-slate-100
        bg-white
        hover:bg-cyan-50/40
        hover:border-cyan-100
        transition
      "
    >
      <motion.div
        whileHover={{
          rotate: -7,
        }}
        className="
          w-9
          h-9
          rounded-lg
          bg-cyan-50
          text-cyan-600
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </motion.div>

      <h3 className="text-sm font-bold mt-4">
        {title}
      </h3>

      <p className="text-[11px] text-slate-400 mt-1">
        {description}
      </p>
    </motion.button>
  );
}

/* =====================================================
   ACTION CARD
===================================================== */

function ActionCard({
  icon,
  title,
  description,
}) {
  return (
    <motion.button
      whileHover={{
        y: -6,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        group
        bg-white
        border
        border-slate-100
        rounded-2xl
        p-5
        text-right
        shadow-sm
        hover:shadow-xl
        hover:shadow-cyan-100/60
        hover:border-cyan-100
        transition
      "
    >
      <motion.div
        whileHover={{
          rotate: -8,
          scale: 1.08,
        }}
        className="
          w-11
          h-11
          rounded-xl
          bg-gradient-to-br
          from-cyan-500
          to-blue-600
          text-white
          flex
          items-center
          justify-center
          shadow-lg
          shadow-cyan-100
        "
      >
        {icon}
      </motion.div>

      <h3 className="font-bold mt-4">
        {title}
      </h3>

      <p className="text-xs text-slate-400 mt-1">
        {description}
      </p>

      <motion.div
        initial={{
          width: 0,
        }}
        whileHover={{
          width: "35px",
        }}
        className="
          h-0.5
          bg-cyan-500
          rounded-full
          mt-3
        "
      />
    </motion.button>
  );
}