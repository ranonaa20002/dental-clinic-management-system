import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  FileText,
  CreditCard,
  Bell,
  Activity,
  HeartPulse,
  Trophy,
  Star,
  Stethoscope,
  MapPin,
  Clock3,
  UserRound,
  Check,
  X,
  MessageSquare,
  Sparkles,
  CircleHelp,
  ChevronLeft,
} from "lucide-react";

export default function ChildPatientDashboard({ patient }) {
  const [appointmentStatus, setAppointmentStatus] = useState("pending");
  const [showReject, setShowReject] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const childName =
    patient?.name ||
    patient?.username ||
    "ياسين محمد";

  const confirmAppointment = () => {
    setAppointmentStatus("confirmed");
  };

  const rejectAppointment = () => {
    if (!rejectReason.trim()) return;

    setAppointmentStatus("rejected");
    setShowReject(false);
  };

  return (
    <div dir="rtl" className="patient-content">

      {/* ================= BACKGROUND ================= */}

      <div className="page-bg">
        <div className="bg-image" />
        <div className="bg-overlay" />
        <div className="bg-grid" />

        <div className="glow glow-1" />
        <div className="glow glow-2" />
      </div>

      {/* ================= CONTENT ================= */}

      <main className="content-wrapper">

        {/* ================= HERO ================= */}

        <section className="patient-hero">

          <div className="hero-bg" />
          <div className="hero-overlay" />

          {/* TEXT */}

          <div className="hero-text">

            <div className="welcome">
              WELCOME BACK
            </div>

            <h1>
              أهلاً يا
              <span>{childName}</span>
            </h1>

            <p>
              نهتم بابتسامتك
              <br />
              ونرافقك في كل خطوة
            </p>

            <div className="smart-care">
              <Activity size={17} />
              SMART DENTAL CARE
            </div>

            <div className="hero-buttons">

              <button className="primary-btn">
                <CalendarDays size={17} />
                حجز موعد جديد
              </button>

              <button className="secondary-btn">
                <FileText size={17} />
                الملف الطبي
              </button>

            </div>

          </div>

          {/* ================= CHILD IMAGE ================= */}

          <div className="child-area">

            <div className="child-aura" />

            <div className="child-circle circle-1" />
            <div className="child-circle circle-2" />

            <motion.div
              className="child-photo"
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >

              <img
                src="/images/child-patient-photo.png"
                alt="Child Patient"
                onError={(e) => {
                  console.error(
                    "Image not found: /images/child-patient-photo.png"
                  );
                }}
              />

            </motion.div>

          </div>

          {/* ================= TOOTH ================= */}

          <div className="tooth-area">

            <div className="tooth-orbit orbit-1" />
            <div className="tooth-orbit orbit-2" />
            <div className="tooth-orbit orbit-3" />

            <div className="tooth-icon">
              <ToothSVG />
            </div>

            <div className="ai-card">

              <Activity size={15} />

              <div>
                <strong>AI DENTAL</strong>
                <span>MONITORING</span>
              </div>

            </div>

          </div>

        </section>

        {/* ================= STATS ================= */}

        <section className="stats">

          <StatCard
            icon={<CreditCard />}
            title="المبلغ المطلوب"
            value="850"
            subtitle="جنيه"
            type="yellow"
          />

          <StatCard
            icon={<HeartPulse />}
            title="حالة العلاج"
            value="65%"
            subtitle="Progress"
            type="cyan"
          />

          <StatCard
            icon={<CalendarDays />}
            title="الزيارات"
            value="5"
            subtitle="Visits"
            type="green"
          />

          <StatCard
            icon={<Trophy />}
            title="المكافآت"
            value="120"
            subtitle="Points"
            type="purple"
          />

        </section>

        {/* ================= CARDS ================= */}

        <section className="cards-grid">

          {/* ================= APPOINTMENT ================= */}

          <div className="card appointment-card">

            <CardTitle
              icon={<CalendarDays />}
              title="الموعد القادم"
              english="UPCOMING APPOINTMENT"
            />

            <div className="appointment-top">

              <div className="doctor">

                <div className="doctor-image">
                  <Stethoscope size={29} />
                </div>

                <div>
                  <h3>د. أحمد محمد</h3>

                  <p>
                    طبيب أسنان أطفال
                  </p>

                  <div className="rating">
                    <Star size={13} fill="currentColor" />
                    4.9
                  </div>
                </div>

              </div>

              <AppointmentStatus
                status={appointmentStatus}
              />

            </div>

            <div className="appointment-info">

              <InfoBox
                icon={<CalendarDays />}
                title="التاريخ"
                value="الأحد 23 أغسطس 2026"
              />

              <InfoBox
                icon={<Clock3 />}
                title="الوقت"
                value="10:30 صباحًا"
              />

              <InfoBox
                icon={<MapPin />}
                title="الفرع"
                value="مدينة نصر"
              />

              <InfoBox
                icon={<Activity />}
                title="التخصص"
                value="أسنان أطفال"
              />

            </div>

            {appointmentStatus === "pending" && (
              <>
                {!showReject ? (

                  <div className="appointment-actions">

                    <button
                      className="confirm"
                      onClick={confirmAppointment}
                    >
                      <Check size={17} />
                      تأكيد الموعد
                    </button>

                    <button
                      className="reject"
                      onClick={() => setShowReject(true)}
                    >
                      <X size={17} />
                      رفض الموعد
                    </button>

                  </div>

                ) : (

                  <div className="reject-box">

                    <textarea
                      value={rejectReason}
                      onChange={(e) =>
                        setRejectReason(e.target.value)
                      }
                      placeholder="اكتب سبب عدم مناسبة الموعد..."
                    />

                    <div className="reject-buttons">

                      <button
                        className="send-reject"
                        onClick={rejectAppointment}
                      >
                        إرسال الرفض
                      </button>

                      <button
                        className="cancel-reject"
                        onClick={() => setShowReject(false)}
                      >
                        إلغاء
                      </button>

                    </div>

                  </div>

                )}
              </>
            )}

            <AnimatePresence>

              {appointmentStatus === "confirmed" && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="success"
                >
                  <Check size={17} />
                  تم تأكيد الموعد بنجاح
                </motion.div>

              )}

              {appointmentStatus === "rejected" && (

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="error"
                >
                  <X size={17} />
                  تم إرسال رفض الموعد للطبيب
                </motion.div>

              )}

            </AnimatePresence>

          </div>

          {/* ================= PROFILE ================= */}

          <div className="card profile-card">

            <CardTitle
              icon={<UserRound />}
              title="ملف المريض"
              english="PATIENT PROFILE"
            />

            <div className="profile">

              <div className="profile-image">

                <img
                  src="/images/child-patient-photo.png"
                  alt={childName}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

              </div>

              <div>

                <h3>{childName}</h3>

                <p>
                  Patient ID: #{patient?.id || "1048"}
                </p>

              </div>

            </div>

            <div className="profile-data">

              <MiniData
                title="العمر"
                value={`${patient?.age || 12} سنة`}
              />

              <MiniData
                title="الزيارات"
                value="5"
              />

              <MiniData
                title="فصيلة الدم"
                value={patient?.bloodType || "O+"}
              />

              <MiniData
                title="الحالة"
                value="مستمر"
              />

            </div>

          </div>

          {/* ================= TREATMENT ================= */}

          <div className="card treatment-card">

            <CardTitle
              icon={<Sparkles />}
              title="تقدم العلاج"
              english="TREATMENT PROGRESS"
            />

            <div className="progress">

              <svg viewBox="0 0 180 180">

                <circle
                  cx="90"
                  cy="90"
                  r="70"
                  className="progress-bg"
                />

                <motion.circle
                  cx="90"
                  cy="90"
                  r="70"
                  className="progress-bar"
                  initial={{
                    strokeDashoffset: 440,
                  }}
                  animate={{
                    strokeDashoffset: 154,
                  }}
                  transition={{
                    duration: 1.5,
                  }}
                />

              </svg>

              <div className="progress-number">

                <strong>65%</strong>

                <span>
                  COMPLETED
                </span>

              </div>

            </div>

            <div className="treatment-message">

              <strong>
                أنت في الطريق الصحيح
              </strong>

              <span>
                استمر على مواعيد المتابعة
              </span>

            </div>

          </div>

          {/* ================= ACTIVITY ================= */}

          <div className="card activity-card">

            <CardTitle
              icon={<Bell />}
              title="آخر التنبيهات"
              english="RECENT ACTIVITY"
            />

            <div className="activity-list">

              <ActivityItem
                icon={<CalendarDays />}
                title="موعد جديد"
                text="تم إرسال طلب موعد جديد من د. أحمد محمد"
                time="10 دقائق"
              />

              <ActivityItem
                icon={<MessageSquare />}
                title="رسالة من الطبيب"
                text="من فضلك أحضر الأشعة السابقة معك في الزيارة"
                time="25 دقيقة"
              />

              <ActivityItem
                icon={<Star />}
                title="تم إضافة نقاط"
                text="حصلت على 20 نقطة إضافية"
                time="1 ساعة"
              />

            </div>

            <button className="view-all">
              عرض جميع التنبيهات
              <ChevronLeft size={14} />
            </button>

          </div>

          {/* ================= QUICK ACTIONS ================= */}

          <div className="card quick-card">

            <CardTitle
              icon={<Sparkles />}
              title="خدمات سريعة"
              english="QUICK ACTIONS"
            />

            <div className="quick-grid">

              <QuickButton
                icon={<CalendarDays />}
                text="حجز موعد"
                type="blue"
              />

              <QuickButton
                icon={<FileText />}
                text="الملف الطبي"
                type="cyan"
              />

              <QuickButton
                icon={<CreditCard />}
                text="المدفوعات"
                type="green"
              />

              <QuickButton
                icon={<MessageSquare />}
                text="رسائل الطبيب"
                type="teal"
              />

              <QuickButton
                icon={<Trophy />}
                text="المكافآت"
                type="yellow"
              />

              <QuickButton
                icon={<CircleHelp />}
                text="المساعدة"
                type="purple"
              />

            </div>

          </div>

        </section>

      </main>

      {/* ================= CSS ================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          min-height: 100%;
          width: 100%;
        }

        body {
          background: #020812;
        }

        .patient-content {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;

          color: #fff;

          font-family:
            Inter,
            "Segoe UI",
            Tahoma,
            Arial,
            sans-serif;

          background: #020812;
        }

        /* ================= BACKGROUND ================= */

        .page-bg {
          position: fixed;
          inset: 0;

          z-index: 0;

          pointer-events: none;
        }

        .bg-image {
          position: absolute;
          inset: 0;

          background:
            url("/images/dental-clinic-bg.png")
            center / cover no-repeat;

          opacity: .10;
        }

        .bg-overlay {
          position: absolute;
          inset: 0;

          background:
            radial-gradient(
              circle at 70% 20%,
              rgba(0,170,255,.08),
              transparent 35%
            ),
            linear-gradient(
              135deg,
              #020812,
              #031221 50%,
              #010710
            );
        }

        .bg-grid {
          position: absolute;
          inset: 0;

          opacity: .025;

          background-image:
            linear-gradient(
              rgba(0,220,255,.8) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0,220,255,.8) 1px,
              transparent 1px
            );

          background-size: 55px 55px;
        }

        .glow {
          position: absolute;

          border-radius: 50%;

          filter: blur(120px);
        }

        .glow-1 {
          width: 500px;
          height: 500px;

          right: 20%;
          top: -250px;

          background:
            rgba(0,190,255,.10);
        }

        .glow-2 {
          width: 400px;
          height: 400px;

          left: 5%;
          bottom: -200px;

          background:
            rgba(0,90,255,.08);
        }

        /* ================= WRAPPER ================= */

        .content-wrapper {
          position: relative;

          z-index: 2;

          width: 100%;
          max-width: 1450px;

          margin: 0 auto;

          padding:
            35px
            35px
            50px;
        }

        /* ================= HERO ================= */

        .patient-hero {
          min-height: 430px;

          position: relative;

          overflow: hidden;

          border-radius: 22px;

          border:
            1px solid
            rgba(0,210,255,.18);

          background: #031221;

          box-shadow:
            0 25px 80px
            rgba(0,0,0,.35);
        }

        .hero-bg {
          position: absolute;
          inset: 0;

          background:
            url("/images/dental-clinic-bg.png")
            center / cover no-repeat;

          opacity: .38;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              #031221 0%,
              rgba(3,18,33,.97) 34%,
              rgba(3,18,33,.60) 63%,
              rgba(3,18,33,.15) 100%
            );
        }

        .hero-text {
          position: relative;

          z-index: 5;

          width: 44%;

          padding:
            65px
            50px;
        }

        .welcome {
          color: #5eeaff;

          font-size: 11px;

          letter-spacing: 3px;

          font-weight: 800;
        }

        .hero-text h1 {
          margin:
            17px 0
            12px;

          font-size:
            clamp(40px, 4vw, 58px);

          line-height: 1.05;

          font-weight: 900;
        }

        .hero-text h1 span {
          display: block;

          color: #0da8ff;

          margin-top: 7px;

          text-shadow:
            0 0 35px
            rgba(0,160,255,.25);
        }

        .hero-text p {
          color: #9aabba;

          font-size: 15px;

          line-height: 2;

          margin: 0;
        }

        .smart-care {
          margin-top: 20px;

          display: flex;

          align-items: center;

          gap: 8px;

          color: #19dcff;

          font-size: 9px;

          letter-spacing: 1.5px;

          font-weight: 800;
        }

        .hero-buttons {
          display: flex;

          gap: 10px;

          margin-top: 28px;
        }

        .primary-btn,
        .secondary-btn {
          height: 45px;

          border-radius: 9px;

          padding: 0 19px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 8px;

          font-size: 10px;

          font-weight: 800;

          cursor: pointer;

          transition: .25s;
        }

        .primary-btn {
          color: white;

          border:
            1px solid
            #129dff;

          background:
            linear-gradient(
              135deg,
              #1094ff,
              #075bd0
            );

          box-shadow:
            0 8px 30px
            rgba(0,130,255,.25);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
        }

        .secondary-btn {
          color: #c7d5df;

          border:
            1px solid
            rgba(0,210,255,.15);

          background:
            rgba(255,255,255,.035);
        }

        .secondary-btn:hover {
          background:
            rgba(0,210,255,.06);
        }

        /* =====================================================
           CHILD PHOTO
        ===================================================== */

        .child-area {
          position: absolute;

          right: 27%;
          bottom: 0;

          width: 380px;
          height: 100%;

          z-index: 4;

          display: flex;

          align-items: flex-end;
          justify-content: center;

          pointer-events: none;
        }

        .child-aura {
          position: absolute;

          width: 330px;
          height: 330px;

          bottom: 35px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(0,210,255,.18) 0%,
              rgba(0,120,255,.08) 45%,
              transparent 72%
            );

          filter: blur(30px);
        }

        .child-circle {
          position: absolute;

          left: 50%;
          top: 50%;

          transform:
            translate(-50%, -45%);

          border-radius: 50%;

          border:
            1px solid
            rgba(0,220,255,.14);
        }

        .circle-1 {
          width: 360px;
          height: 360px;
        }

        .circle-2 {
          width: 285px;
          height: 285px;

          border-color:
            rgba(0,130,255,.16);
        }

        .child-photo {
          position: relative;

          z-index: 10;

          width: 330px;
          height: 420px;

          display: flex;

          align-items: flex-end;
          justify-content: center;

          overflow: visible;
        }

        .child-photo img {
          display: block;

          width: 100%;
          height: 100%;

          object-fit: contain;

          object-position:
            center bottom;

          background: transparent;

          border: none;

          outline: none;

          filter:
            drop-shadow(
              0 20px 35px
              rgba(0,0,0,.55)
            )
            drop-shadow(
              0 0 28px
              rgba(0,190,255,.18)
            );
        }

        /* ================= TOOTH ================= */

        .tooth-area {
          position: absolute;

          right: 4%;
          top: 55px;

          width: 290px;
          height: 300px;

          z-index: 6;

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .tooth-icon {
          width: 135px;

          position: relative;

          z-index: 5;

          filter:
            drop-shadow(
              0 0 18px
              rgba(0,220,255,.95)
            )
            drop-shadow(
              0 0 45px
              rgba(0,150,255,.55)
            );
        }

        .tooth-icon svg {
          display: block;

          width: 100%;
          height: auto;
        }

        .tooth-orbit {
          position: absolute;

          border:
            1px solid
            rgba(0,210,255,.30);

          border-radius: 50%;
        }

        .orbit-1 {
          width: 240px;
          height: 90px;

          transform:
            rotate(-20deg);
        }

        .orbit-2 {
          width: 250px;
          height: 105px;

          transform:
            rotate(50deg);

          border-color:
            rgba(0,130,255,.22);
        }

        .orbit-3 {
          width: 160px;
          height: 250px;

          transform:
            rotate(70deg);

          border-color:
            rgba(0,230,255,.15);
        }

        .ai-card {
          position: absolute;

          left: 0;
          bottom: 0;

          z-index: 10;

          display: flex;

          align-items: center;

          gap: 8px;

          padding:
            9px 12px;

          border-radius: 8px;

          color: #18e2ff;

          border:
            1px solid
            rgba(0,220,255,.16);

          background:
            rgba(0,15,28,.78);

          backdrop-filter:
            blur(15px);
        }

        .ai-card strong,
        .ai-card span {
          display: block;

          font-size: 8px;
        }

        .ai-card span {
          color: #149fc9;

          margin-top: 3px;
        }

        /* ================= STATS ================= */

        .stats {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 12px;

          margin-top: 14px;
        }

        .stat {
          min-height: 105px;

          position: relative;

          overflow: hidden;

          border-radius: 13px;

          border:
            1px solid
            rgba(0,210,255,.12);

          background:
            linear-gradient(
              145deg,
              rgba(4,22,37,.96),
              rgba(2,12,23,.96)
            );

          display: flex;

          align-items: center;

          gap: 14px;

          padding: 17px;
        }

        .stat::after {
          content: "";

          position: absolute;

          width: 120px;
          height: 120px;

          border-radius: 50%;

          right: -60px;
          top: -60px;

          filter: blur(40px);

          opacity: .22;
        }

        .stat.yellow::after {
          background: #ffd21f;
        }

        .stat.cyan::after {
          background: #00dfff;
        }

        .stat.green::after {
          background: #00e6a1;
        }

        .stat.purple::after {
          background: #a84cff;
        }

        .stat-icon {
          width: 52px;
          height: 52px;

          flex: 0 0 52px;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          border:
            1px solid currentColor;
        }

        .yellow .stat-icon {
          color: #ffd21f;
        }

        .cyan .stat-icon {
          color: #14dfff;
        }

        .green .stat-icon {
          color: #1ce5a5;
        }

        .purple .stat-icon {
          color: #b65cff;
        }

        .stat-title {
          color: #718195;

          font-size: 9px;
        }

        .stat-value {
          margin-top: 3px;

          font-size: 27px;

          font-weight: 900;
        }

        .stat-sub {
          color: #506176;

          font-size: 8px;

          margin-top: 2px;
        }

        /* ================= CARDS ================= */

        .cards-grid {
          margin-top: 14px;

          display: grid;

          grid-template-columns:
            minmax(0, 1.65fr)
            minmax(300px, .9fr);

          gap: 12px;
        }

        .card {
          position: relative;

          overflow: hidden;

          border-radius: 13px;

          border:
            1px solid
            rgba(0,210,255,.11);

          background:
            linear-gradient(
              145deg,
              rgba(4,21,35,.96),
              rgba(2,11,21,.96)
            );

          padding: 21px;

          box-shadow:
            0 15px 50px
            rgba(0,0,0,.16);
        }

        .card::before {
          content: "";

          position: absolute;

          top: 0;
          left: 25%;
          right: 25%;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(0,220,255,.55),
              transparent
            );
        }

        .appointment-card {
          grid-row: span 2;
        }

        .card-title {
          display: flex;

          align-items: center;

          gap: 10px;
        }

        .card-title-icon {
          width: 39px;
          height: 39px;

          border-radius: 9px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #20ddff;

          border:
            1px solid
            rgba(0,210,255,.12);

          background:
            rgba(0,210,255,.05);
        }

        .card-title strong {
          display: block;

          font-size: 13px;
        }

        .card-title span {
          display: block;

          color: #178db6;

          font-size: 7px;

          letter-spacing: 1px;

          margin-top: 4px;
        }

        /* ================= APPOINTMENT ================= */

        .appointment-top {
          margin-top: 22px;

          display: flex;

          align-items: center;

          justify-content: space-between;
        }

        .doctor {
          display: flex;

          align-items: center;

          gap: 13px;
        }

        .doctor-image {
          width: 67px;
          height: 67px;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #2edfff;

          border:
            1px solid
            #087fc9;

          background:
            radial-gradient(
              circle,
              rgba(0,160,255,.20),
              rgba(0,40,80,.35)
            );
        }

        .doctor h3 {
          margin: 0;

          font-size: 14px;
        }

        .doctor p {
          margin: 4px 0;

          color: #607286;

          font-size: 9px;
        }

        .rating {
          display: flex;

          align-items: center;

          gap: 4px;

          color: #ffd21c;

          font-size: 9px;
        }

        .appointment-status {
          padding:
            7px 12px;

          border-radius: 20px;

          font-size: 8px;

          font-weight: 900;
        }

        .appointment-status.pending {
          color: #ffd21c;

          border:
            1px solid
            rgba(255,210,30,.20);

          background:
            rgba(255,210,30,.05);
        }

        .appointment-status.confirmed {
          color: #2de5a0;

          border:
            1px solid
            rgba(45,229,160,.18);

          background:
            rgba(45,229,160,.05);
        }

        .appointment-status.rejected {
          color: #ff5555;

          border:
            1px solid
            rgba(255,85,85,.18);

          background:
            rgba(255,85,85,.05);
        }

        .appointment-info {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 9px;

          margin-top: 20px;
        }

        .info-box {
          padding: 12px;

          border-radius: 8px;

          border:
            1px solid
            rgba(255,255,255,.045);

          background:
            rgba(255,255,255,.018);
        }

        .info-head {
          display: flex;

          align-items: center;

          gap: 6px;

          color: #647589;

          font-size: 8px;
        }

        .info-head svg {
          width: 14px;

          color: #15d9ff;
        }

        .info-value {
          color: #d6e1ea;

          font-size: 9px;

          font-weight: 700;

          margin-top: 7px;
        }

        .appointment-actions {
          display: flex;

          gap: 9px;

          margin-top: 15px;
        }

        .confirm,
        .reject {
          height: 39px;

          padding: 0 20px;

          border-radius: 8px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 7px;

          font-size: 9px;

          font-weight: 800;

          cursor: pointer;
        }

        .confirm {
          color: white;

          border:
            1px solid
            #1297ff;

          background:
            linear-gradient(
              135deg,
              #087fff,
              #075bd0
            );
        }

        .reject {
          color: #ff5555;

          border:
            1px solid
            rgba(255,60,60,.22);

          background:
            rgba(255,50,50,.035);
        }

        .reject-box {
          margin-top: 15px;
        }

        .reject-box textarea {
          width: 100%;
          height: 85px;

          resize: none;

          outline: none;

          border-radius: 8px;

          border:
            1px solid
            rgba(255,255,255,.07);

          background: #010812;

          color: white;

          padding: 11px;

          font-size: 10px;
        }

        .reject-buttons {
          display: flex;

          gap: 8px;

          margin-top: 8px;
        }

        .send-reject,
        .cancel-reject {
          height: 34px;

          padding: 0 16px;

          border-radius: 7px;

          cursor: pointer;

          font-size: 9px;

          font-weight: 700;
        }

        .send-reject {
          color: white;

          background: #d92f3d;

          border:
            1px solid
            #ff4454;
        }

        .cancel-reject {
          color: #8290a0;

          background:
            rgba(255,255,255,.04);

          border:
            1px solid
            rgba(255,255,255,.06);
        }

        .success,
        .error {
          margin-top: 13px;

          padding:
            10px 13px;

          border-radius: 7px;

          display: flex;

          align-items: center;

          gap: 7px;

          font-size: 9px;

          font-weight: 700;
        }

        .success {
          color: #2de5a0;

          background:
            rgba(45,229,160,.04);

          border:
            1px solid
            rgba(45,229,160,.14);
        }

        .error {
          color: #ff5555;

          background:
            rgba(255,85,85,.04);

          border:
            1px solid
            rgba(255,85,85,.14);
        }

        /* ================= PROFILE ================= */

        .profile {
          display: flex;

          align-items: center;

          gap: 13px;

          margin-top: 20px;
        }

        .profile-image {
          width: 68px;
          height: 68px;

          flex: 0 0 68px;

          border-radius: 50%;

          overflow: hidden;

          border:
            2px solid
            #079bdf;

          background:
            #061a2a;

          box-shadow:
            0 0 25px
            rgba(0,160,255,.18);
        }

        .profile-image img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;

          object-position:
            center top;
        }

        .profile h3 {
          margin: 0;

          font-size: 14px;
        }

        .profile p {
          margin-top: 5px;

          color: #5f7184;

          font-size: 8px;
        }

        .profile-data {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 7px;

          margin-top: 16px;
        }

        .mini-data {
          padding: 10px;

          border-radius: 7px;

          border:
            1px solid
            rgba(255,255,255,.045);

          background:
            rgba(255,255,255,.018);
        }

        .mini-data span {
          display: block;

          color: #5a6a7d;

          font-size: 7px;
        }

        .mini-data strong {
          display: block;

          color: #d6e1ea;

          font-size: 10px;

          margin-top: 4px;
        }

        /* ================= TREATMENT ================= */

        .treatment-card {
          text-align: center;
        }

        .progress {
          position: relative;

          width: 155px;
          height: 155px;

          margin:
            12px
            auto
            5px;
        }

        .progress svg {
          width: 100%;
          height: 100%;

          transform:
            rotate(-90deg);
        }

        .progress-bg {
          fill: none;

          stroke:
            rgba(255,255,255,.045);

          stroke-width: 9;
        }

        .progress-bar {
          fill: none;

          stroke: #14d5ff;

          stroke-width: 9;

          stroke-linecap: round;

          stroke-dasharray: 440;

          filter:
            drop-shadow(
              0 0 7px
              rgba(0,210,255,.8)
            );
        }

        .progress-number {
          position: absolute;

          inset: 0;

          display: flex;

          align-items: center;
          justify-content: center;

          flex-direction: column;
        }

        .progress-number strong {
          font-size: 28px;
        }

        .progress-number span {
          color: #198db6;

          font-size: 7px;

          margin-top: 2px;
        }

        .treatment-message strong {
          display: block;

          color: #18c9ff;

          font-size: 10px;
        }

        .treatment-message span {
          display: block;

          color: #657386;

          font-size: 8px;

          margin-top: 5px;
        }

        /* ================= ACTIVITY ================= */

        .activity-list {
          margin-top: 14px;
        }

        .activity-item {
          min-height: 53px;

          display: flex;

          align-items: center;

          gap: 10px;

          border-bottom:
            1px solid
            rgba(255,255,255,.04);
        }

        .activity-icon {
          width: 32px;
          height: 32px;

          flex: 0 0 32px;

          border-radius: 8px;

          display: flex;

          align-items: center;
          justify-content: center;

          color: #18dfff;

          border:
            1px solid
            rgba(0,210,255,.09);

          background:
            rgba(0,210,255,.045);
        }

        .activity-icon svg {
          width: 14px;
        }

        .activity-content {
          flex: 1;

          min-width: 0;
        }

        .activity-content strong {
          display: block;

          color: #c8d4de;

          font-size: 9px;
        }

        .activity-content p {
          color: #59697b;

          font-size: 7px;

          margin: 3px 0 0;

          white-space: nowrap;

          overflow: hidden;

          text-overflow: ellipsis;
        }

        .activity-time {
          color: #47576a;

          font-size: 7px;
        }

        .view-all {
          display: flex;

          align-items: center;

          gap: 3px;

          margin-top: 10px;

          border: 0;

          background: transparent;

          color: #10cfff;

          font-size: 8px;

          cursor: pointer;
        }

        /* ================= QUICK ================= */

        .quick-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 7px;

          margin-top: 15px;
        }

        .quick-button {
          min-height: 76px;

          border-radius: 8px;

          border:
            1px solid
            rgba(0,210,255,.09);

          background:
            rgba(255,255,255,.018);

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 7px;

          cursor: pointer;

          transition: .2s;
        }

        .quick-button:hover {
          transform: translateY(-3px);

          background:
            rgba(0,210,255,.04);

          border-color:
            rgba(0,210,255,.25);
        }

        .quick-button svg {
          width: 19px;
        }

        .quick-button span {
          font-size: 7px;

          font-weight: 700;
        }

        .quick-button.blue {
          color: #4c9cff;
        }

        .quick-button.cyan {
          color: #19dfff;
        }

        .quick-button.green {
          color: #21dfa0;
        }

        .quick-button.teal {
          color: #18d8d0;
        }

        .quick-button.yellow {
          color: #ffd21c;
        }

        .quick-button.purple {
          color: #ad62ff;
        }

        /* ================= RESPONSIVE ================= */

        @media (max-width: 1100px) {

          .content-wrapper {
            padding: 25px;
          }

          .hero-text {
            width: 50%;
          }

          .child-area {
            right: 25%;
          }

          .tooth-area {
            right: 2%;

            transform:
              scale(.9);
          }
        }

        @media (max-width: 900px) {

          .stats {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .cards-grid {
            grid-template-columns: 1fr;
          }

          .appointment-card {
            grid-row: auto;
          }

          .hero-text {
            width: 65%;
          }

          .child-area {
            right: 35%;

            opacity: .45;
          }

          .tooth-area {
            opacity: .55;
          }
        }

        @media (max-width: 650px) {

          .content-wrapper {
            padding: 12px;
          }

          .patient-hero {
            min-height: 560px;
          }

          .hero-text {
            width: 100%;

            padding:
              35px 25px;
          }

          .hero-text h1 {
            font-size: 40px;
          }

          .hero-buttons {
            flex-direction: column;

            width: 190px;
          }

          /* الصورة على الموبايل */

          .child-area {
            right: 8%;

            width: 270px;
            height: 52%;

            opacity: .32;
          }

          .child-photo {
            width: 250px;
            height: 300px;
          }

          .child-aura {
            width: 250px;
            height: 250px;
          }

          .circle-1 {
            width: 270px;
            height: 270px;
          }

          .circle-2 {
            width: 210px;
            height: 210px;
          }

          .tooth-area {
            right: -45px;

            bottom: 5px;
            top: auto;

            transform:
              scale(.65);

            opacity: .7;
          }

          .stats {
            grid-template-columns:
              1fr 1fr;

            gap: 8px;
          }

          .stat {
            min-height: 90px;

            padding: 12px;

            gap: 9px;
          }

          .stat-icon {
            width: 43px;
            height: 43px;

            flex-basis: 43px;
          }

          .stat-value {
            font-size: 22px;
          }

          .appointment-top {
            flex-direction: column;

            align-items: flex-start;

            gap: 12px;
          }

          .appointment-info {
            grid-template-columns: 1fr;
          }

          .appointment-actions {
            flex-direction: column;
          }

          .quick-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }
        }

      `}</style>

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
  subtitle,
  type,
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className={`stat ${type}`}
    >

      <div className="stat-icon">
        {icon}
      </div>

      <div>

        <div className="stat-title">
          {title}
        </div>

        <div className="stat-value">
          {value}
        </div>

        <div className="stat-sub">
          {subtitle}
        </div>

      </div>

    </motion.div>
  );
}


/* ============================================================
   CARD TITLE
============================================================ */

function CardTitle({
  icon,
  title,
  english,
}) {
  return (
    <div className="card-title">

      <div className="card-title-icon">
        {icon}
      </div>

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {english}
        </span>

      </div>

    </div>
  );
}


/* ============================================================
   INFO BOX
============================================================ */

function InfoBox({
  icon,
  title,
  value,
}) {
  return (
    <div className="info-box">

      <div className="info-head">
        {icon}
        {title}
      </div>

      <div className="info-value">
        {value}
      </div>

    </div>
  );
}


/* ============================================================
   APPOINTMENT STATUS
============================================================ */

function AppointmentStatus({
  status,
}) {
  if (status === "confirmed") {
    return (
      <span className="appointment-status confirmed">
        CONFIRMED
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="appointment-status rejected">
        REJECTED
      </span>
    );
  }

  return (
    <span className="appointment-status pending">
      PENDING
    </span>
  );
}


/* ============================================================
   MINI DATA
============================================================ */

function MiniData({
  title,
  value,
}) {
  return (
    <div className="mini-data">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


/* ============================================================
   ACTIVITY
============================================================ */

function ActivityItem({
  icon,
  title,
  text,
  time,
}) {
  return (
    <div className="activity-item">

      <div className="activity-icon">
        {icon}
      </div>

      <div className="activity-content">

        <strong>
          {title}
        </strong>

        <p>
          {text}
        </p>

      </div>

      <span className="activity-time">
        {time}
      </span>

    </div>
  );
}


/* ============================================================
   QUICK BUTTON
============================================================ */

function QuickButton({
  icon,
  text,
  type,
}) {
  return (
    <motion.button
      whileHover={{
        y: -3,
      }}
      whileTap={{
        scale: .97,
      }}
      className={`quick-button ${type}`}
    >
      {icon}

      <span>
        {text}
      </span>

    </motion.button>
  );
}


/* ============================================================
   TOOTH SVG
============================================================ */

function ToothSVG() {
  return (
    <svg
      viewBox="0 0 180 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >

      <defs>

        <linearGradient
          id="toothGradient"
          x1="30"
          y1="20"
          x2="145"
          y2="190"
          gradientUnits="userSpaceOnUse"
        >

          <stop
            stopColor="#F4FFFF"
          />

          <stop
            offset=".35"
            stopColor="#68F3FF"
          />

          <stop
            offset=".7"
            stopColor="#00BFFF"
          />

          <stop
            offset="1"
            stopColor="#0075FF"
          />

        </linearGradient>

        <filter
          id="toothGlow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >

          <feGaussianBlur
            stdDeviation="5"
            result="blur"
          />

          <feMerge>

            <feMergeNode
              in="blur"
            />

            <feMergeNode
              in="SourceGraphic"
            />

          </feMerge>

        </filter>

      </defs>

      <path
        d="
          M90 12
          C62 12 37 28 31 54
          C26 76 38 91 39 112
          C40 136 45 174 62 188
          C69 194 78 190 82 176
          L89 143
          C90 137 94 137 96 143
          L103 176
          C106 190 116 194 123 188
          C140 174 145 136 146 112
          C147 91 159 76 154 54
          C148 28 118 12 90 12Z
        "
        fill="url(#toothGradient)"
        opacity=".25"
        stroke="#5EF6FF"
        strokeWidth="3"
        filter="url(#toothGlow)"
      />

      <path
        d="
          M54 60
          C61 43 76 35 90 35
          C104 35 119 43 126 60
        "
        stroke="#EFFFFF"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".9"
      />

      <path
        d="
          M55 77
          C68 67 78 64 90 64
          C102 64 112 67 125 77
        "
        stroke="#45EFFF"
        strokeWidth="2"
        opacity=".85"
      />

      <path
        d="
          M61 102
          L75 118
          L82 102
          L90 124
          L98 102
          L105 118
          L119 102
        "
        stroke="#00E8FF"
        strokeWidth="2"
        opacity=".85"
      />

      <path
        d="
          M72 132
          L67 166
          M108 132
          L113 166
        "
        stroke="#27DFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".8"
      />

    </svg>
  );
}