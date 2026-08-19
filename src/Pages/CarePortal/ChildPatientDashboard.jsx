import {
  Calendar,
  Star,
  Trophy,
  Smile,
  Clock,
  Bell,
  MessageCircle,
  ShoppingBag,
  CreditCard,
  CheckCircle2,
  XCircle,
  Gift,
  FileText,
  Sparkles,
  Heart,
  Medal,
  ArrowLeft,
} from "lucide-react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChildPatientDashboard({ patient }) {
  const [appointmentStatus, setAppointmentStatus] =
    useState("pending");

  const [rejectReason, setRejectReason] = useState("");
  const [showReason, setShowReason] = useState(false);

  const childName =
    patient?.name ||
    patient?.username ||
    "البطل";

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
        bg-[#f7fbff]
        text-slate-800
        overflow-hidden
      "
    >

      {/* =====================================================
          FLOATING BACKGROUND
      ===================================================== */}

      <FloatingShape
        className="top-32 right-[5%]"
        delay={0}
      >
        ⭐
      </FloatingShape>

      <FloatingShape
        className="top-[45%] left-[4%]"
        delay={0.8}
      >
        ✨
      </FloatingShape>

      <FloatingShape
        className="top-[70%] right-[8%]"
        delay={1.4}
      >
        💙
      </FloatingShape>

      <FloatingShape
        className="top-[20%] left-[20%]"
        delay={2}
      >
        🌈
      </FloatingShape>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header
        className="
          sticky
          top-0
          z-50
          bg-white/80
          backdrop-blur-xl
          border-b
          border-sky-100
        "
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

          <div className="flex items-center justify-between">

            {/* LOGO */}

            <div className="flex items-center gap-3">

              <motion.div
                animate={{
                  rotate: [0, -8, 8, 0],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-gradient-to-br
                  from-sky-400
                  to-blue-600
                  flex
                  items-center
                  justify-center
                  text-2xl
                  shadow-lg
                  shadow-sky-200
                "
              >
                🦷
              </motion.div>

              <div>
                <h1 className="font-black text-slate-800">
                  My Dental Clinic
                </h1>

                <p className="text-xs text-slate-400">
                  عالم الابتسامة 🌈
                </p>
              </div>

            </div>


            {/* NOTIFICATION */}

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="
                relative
                w-11
                h-11
                rounded-2xl
                bg-sky-50
                text-sky-600
                flex
                items-center
                justify-center
              "
            >
              <Bell size={21} />

              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  -top-1
                  -left-1
                  w-5
                  h-5
                  bg-pink-500
                  text-white
                  rounded-full
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                3
              </motion.span>
            </motion.button>

          </div>
        </div>
      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">


        {/* =====================================================
            HERO
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            relative
            overflow-hidden
            rounded-[2.5rem]
            bg-gradient-to-br
            from-sky-500
            via-cyan-400
            to-violet-500
            p-7
            md:p-10
            text-white
            shadow-2xl
            shadow-sky-200
          "
        >

          {/* DECORATION */}

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="
              absolute
              left-6
              bottom-5
              text-7xl
              opacity-30
            "
          >
            🦷
          </motion.div>


          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="
              absolute
              right-10
              top-8
              text-5xl
              opacity-30
            "
          >
            ⭐
          </motion.div>


          <div className="relative z-10 max-w-2xl">

            <div className="flex items-center gap-2 text-white/80 font-bold">
              <Sparkles size={18} />
              My Dental Clinic
            </div>

            <motion.h1
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="
                text-3xl
                md:text-5xl
                font-black
                mt-3
              "
            >
              أهلاً يا {childName} 👋
            </motion.h1>

            <p className="mt-4 text-white/90 text-lg">
              جاهز تخلي ابتسامتك أجمل؟ 😁
            </p>


            {/* BADGES */}

            <div className="flex flex-wrap gap-3 mt-7">

              <Badge icon="⭐">
                120 نقطة
              </Badge>

              <Badge icon="🏆">
                بطل الأسنان
              </Badge>

              <Badge icon="🦷">
                5 زيارات
              </Badge>

            </div>

          </div>

        </motion.section>


        {/* =====================================================
            STATS
        ===================================================== */}

        <motion.section
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >

          <AnimatedStat
            icon={<Star size={25} />}
            emoji="⭐"
            title="نقاطك"
            value="120"
            description="استمر واجمع نقاط أكتر!"
            bg="from-yellow-50 to-orange-50"
            iconBg="bg-yellow-100"
            iconColor="text-yellow-500"
          />

          <AnimatedStat
            icon={<Trophy size={25} />}
            emoji="🏆"
            title="مستواك"
            value="بطل الأسنان"
            description="أنت بتتقدم بشكل رائع!"
            bg="from-violet-50 to-purple-50"
            iconBg="bg-purple-100"
            iconColor="text-purple-500"
          />

          <AnimatedStat
            icon={<Smile size={25} />}
            emoji="😁"
            title="زياراتك"
            value="5"
            description="زيارات ناجحة للعيادة"
            bg="from-emerald-50 to-green-50"
            iconBg="bg-green-100"
            iconColor="text-green-500"
          />

        </motion.section>


        {/* =====================================================
            APPOINTMENT
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="
            bg-white
            rounded-[2.5rem]
            border
            border-sky-100
            shadow-xl
            shadow-sky-100/50
            overflow-hidden
          "
        >

          <div className="p-6 border-b border-slate-100">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-sky-100
                    to-cyan-100
                    text-sky-600
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Calendar size={23} />
                </div>

                <div>
                  <h2 className="font-black">
                    دكتورك عايز يشوفك! 👨‍⚕️
                  </h2>

                  <p className="text-xs text-slate-400 mt-1">
                    عندك طلب موعد جديد
                  </p>
                </div>

              </div>


              <StatusBadge status={appointmentStatus} />

            </div>

          </div>


          <div className="p-6">

            <div
              className="
                relative
                bg-gradient-to-br
                from-sky-50
                via-white
                to-cyan-50
                rounded-[2rem]
                p-5
                md:p-6
                border
                border-sky-100
              "
            >

              <div className="flex flex-col md:flex-row gap-5">

                {/* DOCTOR */}

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="
                    w-full
                    md:w-20
                    h-20
                    rounded-3xl
                    bg-white
                    shadow-md
                    flex
                    items-center
                    justify-center
                    text-4xl
                    shrink-0
                  "
                >
                  👨‍⚕️
                </motion.div>


                <div className="flex-1">

                  <h3 className="font-black text-xl">
                    د. أحمد
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    طبيب الأسنان
                  </p>


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
                      icon={<Calendar size={17} />}
                      title="اليوم"
                      value="الأحد 23 أغسطس"
                    />

                    <InfoBox
                      icon={<Clock size={17} />}
                      title="الوقت"
                      value="10:30 صباحًا"
                    />

                    <InfoBox
                      icon={<Smile size={17} />}
                      title="الزيارة"
                      value="فحص الأسنان"
                    />

                  </div>


                  {/* ACTIONS */}

                  {appointmentStatus === "pending" && (

                    <AnimatePresence mode="wait">

                      {!showReason ? (

                        <motion.div
                          key="buttons"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex flex-wrap gap-3 mt-5"
                        >

                          <motion.button
                            whileHover={{
                              scale: 1.04,
                              y: -2,
                            }}
                            whileTap={{ scale: 0.96 }}
                            onClick={handleConfirm}
                            className="
                              flex
                              items-center
                              gap-2
                              px-6
                              py-3
                              rounded-2xl
                              bg-gradient-to-r
                              from-emerald-400
                              to-green-500
                              text-white
                              font-bold
                              shadow-lg
                              shadow-green-200
                            "
                          >
                            <CheckCircle2 size={18} />
                            أيوه، موافق 😁
                          </motion.button>


                          <motion.button
                            whileHover={{
                              scale: 1.04,
                            }}
                            whileTap={{
                              scale: 0.96,
                            }}
                            onClick={() =>
                              setShowReason(true)
                            }
                            className="
                              flex
                              items-center
                              gap-2
                              px-6
                              py-3
                              rounded-2xl
                              bg-red-50
                              text-red-500
                              font-bold
                              border
                              border-red-100
                            "
                          >
                            <XCircle size={18} />
                            مش مناسب
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
                          className="mt-5 space-y-3"
                        >

                          <textarea
                            value={rejectReason}
                            onChange={(e) =>
                              setRejectReason(e.target.value)
                            }
                            placeholder="ليه مش مناسب؟ 💭"
                            className="
                              w-full
                              min-h-28
                              border
                              border-slate-200
                              rounded-2xl
                              p-4
                              outline-none
                              resize-none
                              focus:border-sky-400
                              focus:ring-4
                              focus:ring-sky-50
                            "
                          />

                          <div className="flex gap-3">

                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={handleReject}
                              className="
                                px-6
                                py-3
                                rounded-2xl
                                bg-red-500
                                text-white
                                font-bold
                              "
                            >
                              إرسال
                            </motion.button>

                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setShowReason(false)
                              }
                              className="
                                px-6
                                py-3
                                rounded-2xl
                                bg-slate-100
                                text-slate-600
                                font-bold
                              "
                            >
                              رجوع
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
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        className="
                          mt-5
                          bg-green-50
                          border
                          border-green-100
                          rounded-2xl
                          p-5
                        "
                      >

                        <div className="flex items-center gap-2 text-green-600 font-bold">

                          <CheckCircle2 size={20} />

                          تمام! الموعد اتأكد 🎉

                        </div>

                        <p className="text-sm text-green-500 mt-2">
                          مستنيك د. أحمد يوم الأحد الساعة
                          10:30 صباحًا.
                        </p>

                      </motion.div>

                    )}

                  </AnimatePresence>


                  {/* REJECTED */}

                  <AnimatePresence>

                    {appointmentStatus === "rejected" && (

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="
                          mt-5
                          bg-red-50
                          border
                          border-red-100
                          rounded-2xl
                          p-5
                        "
                      >

                        <div className="flex items-center gap-2 text-red-600 font-bold">

                          <XCircle size={20} />

                          تم إرسال رفض الموعد

                        </div>

                        <p className="text-sm text-red-500 mt-2">
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


        {/* =====================================================
            NOTIFICATIONS + MESSAGE
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <AnimatedSection>

            <SectionTitle
              icon={<Bell />}
              title="الإشعارات 🔔"
              subtitle="فيه حاجات جديدة ليك"
            />

            <div className="space-y-2 mt-5">

              <Notification
                icon={<Calendar />}
                title="موعد جديد! 📅"
                text="د. أحمد بعتلك طلب موعد."
                time="منذ 10 دقائق"
              />

              <Notification
                icon={<MessageCircle />}
                title="رسالة من الدكتور 💬"
                text="ماتنساش تجيب الأشعة معاك."
                time="منذ 20 دقيقة"
              />

              <Notification
                icon={<Gift />}
                title="مكافأة جديدة! 🎁"
                text="كسبت 20 نقطة جديدة."
                time="منذ ساعة"
              />

            </div>

          </AnimatedSection>


          <AnimatedSection>

            <SectionTitle
              icon={<MessageCircle />}
              title="رسالة من الدكتور 💬"
              subtitle="الدكتور بعتلك رسالة"
            />

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="
                mt-5
                bg-gradient-to-br
                from-pink-50
                to-purple-50
                rounded-3xl
                p-5
                border
                border-pink-100
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-12
                    h-12
                    rounded-2xl
                    bg-white
                    shadow-sm
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "
                >
                  👨‍⚕️
                </div>

                <div>

                  <h3 className="font-bold">
                    د. أحمد
                  </h3>

                  <p className="text-xs text-slate-400">
                    طبيب الأسنان
                  </p>

                </div>

              </div>

              <p className="text-sm text-slate-600 leading-7 mt-5">
                أهلاً يا بطل! 🦷
                <br />
                ماتنساش تجيب الأشعة القديمة معاك في الزيارة الجاية.
              </p>

              <button
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  text-pink-600
                  font-bold
                  text-sm
                "
              >
                فتح الرسالة
                <ArrowLeft size={16} />
              </button>

            </motion.div>

          </AnimatedSection>

        </div>


        {/* =====================================================
            REQUESTS
        ===================================================== */}

        <AnimatedSection>

          <SectionTitle
            icon={<ShoppingBag />}
            title="طلبات الدكتور 🛍️"
            subtitle="حاجات الدكتور طالبها منك"
          />

          <motion.div
            whileHover={{ y: -3 }}
            className="
              mt-5
              flex
              flex-col
              md:flex-row
              md:items-center
              justify-between
              gap-4
              p-5
              rounded-3xl
              bg-gradient-to-r
              from-yellow-50
              to-orange-50
              border
              border-yellow-100
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-white
                  shadow-sm
                  text-yellow-500
                  flex
                  items-center
                  justify-center
                "
              >
                <ShoppingBag size={23} />
              </div>

              <div>

                <h3 className="font-bold">
                  هات الأشعة القديمة 🩻
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  طلب من د. أحمد
                </p>

              </div>

            </div>

            <span
              className="
                px-4
                py-2
                rounded-full
                bg-yellow-100
                text-yellow-700
                text-xs
                font-bold
                w-fit
              "
            >
              مطلوب منك
            </span>

          </motion.div>

        </AnimatedSection>


        {/* =====================================================
            PAYMENT
        ===================================================== */}

        <AnimatedSection>

          <section
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              bg-gradient-to-br
              from-sky-500
              to-cyan-400
              p-7
              text-white
              shadow-xl
            "
          >

            <div className="absolute -left-5 -bottom-5 text-8xl opacity-10">
              💰
            </div>

            <div className="relative z-10">

              <div className="flex items-center gap-3">

                <CreditCard />

                <div>

                  <h2 className="font-black text-xl">
                    المصاريف 💳
                  </h2>

                  <p className="text-white/70 text-xs">
                    هل عليك فلوس للدكتور؟
                  </p>

                </div>

              </div>


              <div className="flex items-center justify-between mt-7">

                <div>

                  <p className="text-white/70 text-sm">
                    المبلغ المطلوب
                  </p>

                  <h2 className="text-4xl font-black mt-1">
                    850
                    <span className="text-lg mr-2">
                      جنيه
                    </span>
                  </h2>

                </div>

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                  className="text-6xl"
                >
                  💰
                </motion.div>

              </div>

              <div className="flex flex-wrap gap-3 mt-6">

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="
                    px-6
                    py-3
                    rounded-2xl
                    bg-white
                    text-sky-600
                    font-bold
                  "
                >
                  ادفع الآن 💳
                </motion.button>

                <button
                  className="
                    px-6
                    py-3
                    rounded-2xl
                    bg-white/20
                    text-white
                    font-bold
                  "
                >
                  عرض الفاتورة
                </button>

              </div>

            </div>

          </section>

        </AnimatedSection>


        {/* =====================================================
            REWARDS
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          className="
            relative
            overflow-hidden
            bg-gradient-to-r
            from-violet-500
            via-purple-500
            to-pink-500
            rounded-[2rem]
            p-7
            text-white
            shadow-xl
          "
        >

          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="text-5xl"
          >
            🏆
          </motion.div>

          <h2 className="text-2xl font-black mt-4">
            قربت تبقى بطل الأسنان! ⭐
          </h2>

          <p className="text-white/80 text-sm mt-2">
            اجمع 30 نقطة كمان وخد مكافأة جديدة 🎁
          </p>


          <div className="mt-6">

            <div className="flex justify-between text-xs mb-2">
              <span>120 نقطة</span>
              <span>150 نقطة</span>
            </div>

            <div className="h-4 bg-white/20 rounded-full overflow-hidden">

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="
                  h-full
                  bg-white
                  rounded-full
                "
              />

            </div>

          </div>

        </motion.section>


        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <section>

          <div className="flex items-center gap-2 mb-4">

            <Sparkles className="text-purple-500" />

            <h2 className="text-xl font-black">
              إيه اللي عايز تعمله؟ 😊
            </h2>

          </div>


          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
            "
          >

            <ActionCard
              icon={<Calendar />}
              emoji="📅"
              title="حجز موعد"
              description="احجز زيارة جديدة"
            />

            <ActionCard
              icon={<FileText />}
              emoji="🦷"
              title="ملفي الطبي"
              description="شوف ملفك الطبي"
            />

            <ActionCard
              icon={<CreditCard />}
              emoji="💳"
              title="المدفوعات"
              description="شوف المصاريف"
            />

            <ActionCard
              icon={<Gift />}
              emoji="🎁"
              title="إنجازاتي"
              description="شوف نقاطك ومكافآتك"
            />

          </motion.div>

        </section>

      </main>

    </div>
  );
}


/* =====================================================
   FLOATING SHAPE
===================================================== */

function FloatingShape({
  children,
  className,
  delay,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -18, 0],
        rotate: [0, 8, -8, 0],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`
        fixed
        ${className}
        text-3xl
        opacity-40
        pointer-events-none
        z-0
      `}
    >
      {children}
    </motion.div>
  );
}


/* =====================================================
   BADGE
===================================================== */

function Badge({ icon, children }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -2,
      }}
      className="
        flex
        items-center
        gap-2
        px-4
        py-2.5
        rounded-full
        bg-white/20
        backdrop-blur-sm
        border
        border-white/20
        text-sm
        font-bold
      "
    >
      <span>{icon}</span>
      {children}
    </motion.div>
  );
}


/* =====================================================
   ANIMATED STAT
===================================================== */

function AnimatedStat({
  icon,
  emoji,
  title,
  value,
  description,
  bg,
  iconBg,
  iconColor,
}) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 25,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className={`
        relative
        overflow-hidden
        bg-gradient-to-br
        ${bg}
        rounded-[2rem]
        p-6
        border
        border-white
        shadow-lg
      `}
    >

      <div className="
        absolute
        -left-3
        -bottom-4
        text-6xl
        opacity-10
      ">
        {emoji}
      </div>

      <div className="relative z-10">

        <div className="
          flex
          items-center
          justify-between
        ">

          <div
            className={`
              w-13
              h-13
              rounded-2xl
              ${iconBg}
              ${iconColor}
              flex
              items-center
              justify-center
            `}
          >
            {icon}
          </div>

          <motion.span
            animate={{
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="text-3xl"
          >
            {emoji}
          </motion.span>

        </div>

        <p className="text-sm text-slate-400 mt-5">
          {title}
        </p>

        <h2 className="
          text-2xl
          font-black
          text-slate-800
          mt-1
        ">
          {value}
        </h2>

        <p className="text-xs text-slate-400 mt-2">
          {description}
        </p>

      </div>

    </motion.div>
  );
}


/* =====================================================
   STATUS
===================================================== */

function StatusBadge({ status }) {
  if (status === "confirmed") {
    return (
      <span className="
        px-3
        py-1.5
        rounded-full
        bg-green-50
        text-green-600
        text-xs
        font-bold
      ">
        تم التأكيد ✅
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="
        px-3
        py-1.5
        rounded-full
        bg-red-50
        text-red-600
        text-xs
        font-bold
      ">
        تم الرفض
      </span>
    );
  }

  return (
    <span className="
      px-3
      py-1.5
      rounded-full
      bg-yellow-50
      text-yellow-600
      text-xs
      font-bold
    ">
      محتاج ردك
    </span>
  );
}


/* =====================================================
   ANIMATED SECTION
===================================================== */

function AnimatedSection({ children }) {
  return (
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
        border-sky-100
        shadow-lg
        p-6
      "
    >
      {children}
    </motion.section>
  );
}


/* =====================================================
   SECTION TITLE
===================================================== */

function SectionTitle({
  icon,
  title,
  subtitle,
}) {
  return (
    <div className="flex items-center gap-3">

      <div
        className="
          w-11
          h-11
          rounded-2xl
          bg-sky-50
          text-sky-600
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      <div>

        <h2 className="font-black text-slate-800">
          {title}
        </h2>

        <p className="text-xs text-slate-400 mt-1">
          {subtitle}
        </p>

      </div>

    </div>
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
        scale: 1.02,
      }}
      className="
        bg-white
        rounded-2xl
        p-3
        border
        border-sky-100
      "
    >

      <div className="
        flex
        items-center
        gap-2
        text-sky-500
      ">
        {icon}

        <span className="text-xs text-slate-400">
          {title}
        </span>
      </div>

      <p className="
        font-bold
        text-slate-700
        text-sm
        mt-2
      ">
        {value}
      </p>

    </motion.div>
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
        backgroundColor: "#f0f9ff",
      }}
      className="
        flex
        gap-3
        p-4
        rounded-2xl
        cursor-pointer
      "
    >

      <div
        className="
          w-10
          h-10
          rounded-xl
          bg-sky-50
          text-sky-500
          flex
          items-center
          justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      <div className="flex-1">

        <div className="
          flex
          justify-between
          gap-2
        ">

          <h3 className="
            font-bold
            text-sm
            text-slate-700
          ">
            {title}
          </h3>

          <span className="
            text-[10px]
            text-slate-400
            whitespace-nowrap
          ">
            {time}
          </span>

        </div>

        <p className="
          text-xs
          text-slate-400
          mt-1
          leading-5
        ">
          {text}
        </p>

      </div>

    </motion.div>
  );
}


/* =====================================================
   ACTION CARD
===================================================== */

function ActionCard({
  icon,
  emoji,
  title,
  description,
}) {
  return (
    <motion.button
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className="
        relative
        overflow-hidden
        bg-white
        rounded-[2rem]
        p-5
        text-start
        border
        border-sky-100
        shadow-lg
      "
    >

      <div className="
        absolute
        left-3
        top-2
        text-3xl
        opacity-10
      ">
        {emoji}
      </div>

      <div
        className="
          relative
          z-10
          w-12
          h-12
          rounded-2xl
          bg-sky-50
          text-sky-500
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      <h3 className="
        relative
        z-10
        font-bold
        text-slate-800
        mt-4
      ">
        {title}
      </h3>

      <p className="
        relative
        z-10
        text-xs
        text-slate-400
        mt-1
      ">
        {description}
      </p>

    </motion.button>
  );
}