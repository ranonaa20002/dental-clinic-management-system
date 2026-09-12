import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  UserCheck,
  MessageCircle,
  Sparkles,
  Activity,
  ChevronDown,
} from "lucide-react";

export default function AppointmentCard({
  appointment,
  onDelete,
  onReminder,
  onEdit,
  onStatusChange,
}) {
  /* =========================================================
     STATUS
  ========================================================= */

  const statusConfig = {
    confirmed: {
      label: "مؤكد",
      className: "status-confirmed",
      icon: <CheckCircle2 size={13} />,
    },

    waiting: {
      label: "في الانتظار",
      className: "status-waiting",
      icon: <Clock size={13} />,
    },

    completed: {
      label: "تم الحضور",
      className: "status-completed",
      icon: <UserCheck size={13} />,
    },

    cancelled: {
      label: "ملغي",
      className: "status-cancelled",
      icon: <XCircle size={13} />,
    },

    "no-show": {
      label: "لم يحضر",
      className: "status-noshow",
      icon: <XCircle size={13} />,
    },

    pending: {
      label: "جديد",
      className: "status-pending",
      icon: <Sparkles size={13} />,
    },
  };

  const currentStatus =
    statusConfig[appointment.status] ||
    statusConfig.confirmed;

  /* =========================================================
     STATUS CHANGE
  ========================================================= */

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;

    if (onStatusChange) {
      onStatusChange(
        appointment.id,
        newStatus
      );
    }
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formattedDate = (() => {
    if (!appointment.date) return "";

    try {
      const date = new Date(
        `${appointment.date}T00:00:00`
      );

      return date.toLocaleDateString("ar-EG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return appointment.date;
    }
  })();

  /* =========================================================
     TOOTH SVG
  ========================================================= */

  const ToothIcon = () => (
    <svg
      width="30"
      height="34"
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 7C12 8 7 14 8 22C9 29 13 34 14 41C15 50 17 63 23 65C28 66 29 54 32 48C35 54 36 66 41 65C47 63 49 50 50 41C51 34 55 29 56 22C57 14 52 8 46 7C40 6 36 10 32 10C28 10 24 6 18 7Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M18 18C22 21 25 21 28 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".6"
      />

      <path
        d="M36 19C39 21 42 21 46 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );

  return (
    <>
      <style>{`

        /* =====================================================
           DENTAL APPOINTMENT CARD
        ===================================================== */

        .dental-appointment-card {
          position: relative;
          min-height: 355px;
          overflow: hidden;
          border-radius: 25px;

          background:
            radial-gradient(
              circle at 82% 18%,
              rgba(0, 214, 255, .11),
              transparent 23%
            ),
            radial-gradient(
              circle at 10% 90%,
              rgba(0, 112, 255, .07),
              transparent 28%
            ),
            linear-gradient(
              145deg,
              #071a2e 0%,
              #041221 45%,
              #020a15 100%
            );

          border: 1px solid
            rgba(38, 184, 240, .22);

          box-shadow:
            0 20px 55px
              rgba(0, 0, 0, .30),
            inset 0 1px 0
              rgba(255, 255, 255, .035);

          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .dental-appointment-card:hover {
          transform: translateY(-6px);

          border-color:
            rgba(31, 211, 255, .48);

          box-shadow:
            0 25px 65px
              rgba(0, 0, 0, .38),
            0 0 45px
              rgba(0, 192, 255, .08),
            inset 0 1px 0
              rgba(255, 255, 255, .05);
        }

        /* =====================================================
           GRID / TECH BACKGROUND
        ===================================================== */

        .dental-appointment-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(0, 193, 255, .025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 193, 255, .025) 1px,
              transparent 1px
            );

          background-size: 32px 32px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 90%
            );
        }

        /* =====================================================
           TOP GLOW LINE
        ===================================================== */

        .dental-top-line {
          position: absolute;
          top: 0;
          left: 16%;
          right: 16%;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(25, 210, 255, .75),
              transparent
            );

          box-shadow:
            0 0 15px
              rgba(0, 210, 255, .5);
        }

        /* =====================================================
           DECORATIVE ORBIT
        ===================================================== */

        .tooth-orbit {
          position: absolute;
          top: -55px;
          right: -50px;

          width: 175px;
          height: 175px;

          border-radius: 50%;

          border:
            1px solid
              rgba(0, 204, 255, .13);

          box-shadow:
            0 0 0 12px
              rgba(0, 196, 255, .018),
            0 0 0 25px
              rgba(0, 196, 255, .014),
            0 0 35px
              rgba(0, 196, 255, .08);
        }

        .tooth-orbit::before {
          content: "";

          position: absolute;
          inset: 28px;

          border-radius: 50%;

          border:
            1px dashed
              rgba(0, 205, 255, .18);

          animation:
            orbitRotate 12s linear infinite;
        }

        .tooth-orbit::after {
          content: "";

          position: absolute;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #25d9ff;

          box-shadow:
            0 0 10px #25d9ff,
            0 0 20px #25d9ff;

          left: 30px;
          bottom: 18px;
        }

        @keyframes orbitRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        /* =====================================================
           CARD CONTENT
        ===================================================== */

        .dental-card-content {
          position: relative;
          z-index: 3;
          height: 100%;

          padding: 18px;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .dental-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .dental-date-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dental-date-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          color: #31d9ff;

          background:
            linear-gradient(
              145deg,
              rgba(0, 198, 255, .13),
              rgba(0, 86, 145, .07)
            );

          border:
            1px solid
              rgba(31, 205, 255, .25);

          box-shadow:
            inset 0 0 18px
              rgba(0, 190, 255, .035),
            0 0 20px
              rgba(0, 190, 255, .05);
        }

        .dental-time {
          color: #f2fbff;
          font-size: 14px;
          font-weight: 900;
        }

        .dental-date {
          color: #668298;
          font-size: 10px;
          margin-top: 3px;
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .dental-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding: 6px 10px;

          border-radius: 999px;

          font-size: 10px;
          font-weight: 900;

          white-space: nowrap;

          backdrop-filter: blur(10px);
        }

        .status-confirmed {
          color: #2de5aa;

          background:
            rgba(25, 225, 158, .07);

          border:
            1px solid
              rgba(25, 225, 158, .28);

          box-shadow:
            0 0 18px
              rgba(25, 225, 158, .05);
        }

        .status-waiting {
          color: #ffc83d;

          background:
            rgba(255, 194, 45, .07);

          border:
            1px solid
              rgba(255, 194, 45, .3);
        }

        .status-completed {
          color: #62aaff;

          background:
            rgba(55, 139, 255, .07);

          border:
            1px solid
              rgba(55, 139, 255, .28);
        }

        .status-cancelled,
        .status-noshow {
          color: #ff6875;

          background:
            rgba(255, 65, 82, .07);

          border:
            1px solid
              rgba(255, 65, 82, .28);
        }

        .status-pending {
          color: #32d5ff;

          background:
            rgba(0, 190, 255, .07);

          border:
            1px solid
              rgba(0, 190, 255, .3);
        }

        /* =====================================================
           PATIENT AREA
        ===================================================== */

        .patient-main {
          margin-top: 23px;

          display: flex;
          align-items: center;
          gap: 13px;
        }

        .patient-avatar-tech {
          position: relative;

          width: 53px;
          height: 53px;
          min-width: 53px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 17px;

          color: #32dfff;

          background:
            linear-gradient(
              145deg,
              rgba(0, 202, 255, .14),
              rgba(0, 69, 132, .10)
            );

          border:
            1px solid
              rgba(26, 210, 255, .34);

          box-shadow:
            0 0 25px
              rgba(0, 195, 255, .08);
        }

        .patient-avatar-tech::before {
          content: "";

          position: absolute;
          inset: -5px;

          border-radius: 20px;

          border:
            1px solid
              rgba(0, 203, 255, .09);
        }

        .patient-avatar-tech svg {
          filter:
            drop-shadow(
              0 0 7px
              rgba(0, 211, 255, .55)
            );
        }

        .patient-name-tech {
          color: #f2fbff;
          font-size: 19px;
          font-weight: 900;

          line-height: 1.2;
        }

        .patient-label-tech {
          color: #4e7a92;
          font-size: 9px;

          margin-top: 5px;

          letter-spacing: 1.3px;
          text-transform: uppercase;
        }

        /* =====================================================
           SERVICE
        ===================================================== */

        .dental-service {
          margin-top: 16px;

          display: flex;
          align-items: center;
          gap: 9px;

          padding: 9px 10px;

          border-radius: 12px;

          background:
            rgba(0, 150, 210, .035);

          border:
            1px solid
              rgba(60, 167, 214, .11);
        }

        .dental-service-icon {
          width: 31px;
          height: 31px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          color: #2adfff;

          background:
            rgba(0, 190, 255, .07);

          border:
            1px solid
              rgba(0, 195, 255, .17);
        }

        .service-label {
          color: #55748a;
          font-size: 9px;
        }

        .service-name {
          color: #c7e4ef;
          font-size: 12px;
          font-weight: 800;

          margin-top: 2px;
        }

        /* =====================================================
           CONTACT
        ===================================================== */

        .dental-contact {
          margin-top: 13px;

          display: grid;
          grid-template-columns: 1fr 1fr;

          gap: 8px;
        }

        .contact-item-tech {
          display: flex;
          align-items: center;
          gap: 7px;

          min-width: 0;

          color: #668195;

          font-size: 10px;
        }

        .contact-item-tech svg {
          color: #27cfff;
          min-width: 13px;

          filter:
            drop-shadow(
              0 0 4px
              rgba(0, 204, 255, .3)
            );
        }

        .contact-item-tech span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* =====================================================
           DIVIDER
        ===================================================== */

        .dental-divider {
          height: 1px;

          margin: 15px 0 12px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(37, 174, 225, .18),
              transparent
            );
        }

        /* =====================================================
           ACTIONS
        ===================================================== */

        .dental-actions {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .dental-action {
          width: 37px;
          height: 37px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          background:
            rgba(0, 8, 18, .48);

          border:
            1px solid
              rgba(70, 153, 198, .18);

          color: #69869a;

          transition: .22s ease;

          cursor: pointer;
        }

        .dental-action:hover {
          transform: translateY(-2px);
        }

        .dental-action.edit:hover {
          color: #2bd9ff;

          border-color:
            rgba(30, 208, 255, .42);

          background:
            rgba(0, 190, 255, .07);

          box-shadow:
            0 0 17px
              rgba(0, 190, 255, .08);
        }

        .dental-action.delete:hover {
          color: #ff6674;

          border-color:
            rgba(255, 76, 91, .4);

          background:
            rgba(255, 60, 72, .07);
        }

        .dental-action.whatsapp:hover {
          color: #31e5a1;

          border-color:
            rgba(31, 225, 158, .4);

          background:
            rgba(31, 225, 158, .07);
        }

        /* =====================================================
           STATUS SELECT
        ===================================================== */

        .dental-status-select-wrapper {
          position: relative;
          flex: 1;
          min-width: 0;
        }

        .dental-status-select {
          width: 100%;
          height: 37px;

          appearance: none;

          padding:
            0 30px 0 10px;

          border-radius: 10px;

          outline: none;

          background:
            rgba(0, 9, 19, .65);

          border:
            1px solid
              rgba(0, 193, 255, .21);

          color: #2ed8ff;

          font-size: 10px;
          font-weight: 800;

          cursor: pointer;

          transition: .2s;
        }

        .dental-status-select:hover {
          border-color:
            rgba(0, 206, 255, .4);
        }

        .dental-status-select:focus {
          box-shadow:
            0 0 0 3px
              rgba(0, 192, 255, .05);
        }

        .dental-status-select option {
          background: #071522;
          color: #dff8ff;
        }

        .select-arrow {
          position: absolute;

          right: 9px;
          top: 50%;

          transform:
            translateY(-50%);

          pointer-events: none;

          color: #27cfff;
        }

        /* =====================================================
           REMINDER
        ===================================================== */

        .reminder-button {
          width: 100%;

          height: 38px;

          margin-top: 9px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          border-radius: 10px;

          background:
            linear-gradient(
              135deg,
              rgba(0, 194, 255, .10),
              rgba(0, 95, 180, .08)
            );

          border:
            1px solid
              rgba(0, 190, 255, .2);

          color: #4bdcff;

          font-size: 10px;
          font-weight: 900;

          cursor: pointer;

          transition: .25s ease;
        }

        .reminder-button:hover {
          background:
            linear-gradient(
              135deg,
              rgba(0, 194, 255, .17),
              rgba(0, 95, 180, .12)
            );

          border-color:
            rgba(0, 207, 255, .42);

          box-shadow:
            0 0 22px
              rgba(0, 193, 255, .08);

          transform: translateY(-1px);
        }

        /* =====================================================
           BOTTOM TECH LABEL
        ===================================================== */

        .dental-card-footer {
          position: absolute;

          bottom: 10px;
          left: 18px;

          display: flex;
          align-items: center;
          gap: 5px;

          color: #29485d;

          font-size: 7px;

          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .footer-dot {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background: #24d8ff;

          box-shadow:
            0 0 8px
              rgba(36, 216, 255, .7);
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 600px) {
          .dental-appointment-card {
            min-height: 350px;
          }

          .dental-contact {
            grid-template-columns: 1fr;
          }

          .patient-name-tech {
            font-size: 17px;
          }
        }

      `}</style>

      <div className="dental-appointment-card">

        {/* TOP GLOW */}
        <div className="dental-top-line" />

        {/* ORBIT */}
        <div className="tooth-orbit">
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#29dfff",
              opacity: 0.65,
            }}
          >
            <ToothIcon />
          </div>
        </div>

        {/* CONTENT */}

        <div className="dental-card-content">

          {/* ================================================
              TOP
          ================================================= */}

          <div className="dental-card-header">

            <div className="dental-date-wrapper">

              <div className="dental-date-icon">
                <Calendar size={19} />
              </div>

              <div>
                <div className="dental-time">
                  {appointment.time}
                </div>

                <div className="dental-date">
                  {formattedDate}
                </div>
              </div>

            </div>

            <span
              className={`dental-status ${currentStatus.className}`}
            >
              {currentStatus.icon}

              {currentStatus.label}
            </span>

          </div>

          {/* ================================================
              PATIENT
          ================================================= */}

          <div className="patient-main">

            <div className="patient-avatar-tech">
              <User size={23} />
            </div>

            <div>

              <div className="patient-name-tech">
                {appointment.name}
              </div>

              <div className="patient-label-tech">
                Dental Patient · ID #{appointment.id}
              </div>

            </div>

          </div>

          {/* ================================================
              SERVICE
          ================================================= */}

          <div className="dental-service">

            <div className="dental-service-icon">
              <ToothIcon />
            </div>

            <div>
              <div className="service-label">
                SERVICE
              </div>

              <div className="service-name">
                {appointment.service}
              </div>
            </div>

          </div>

          {/* ================================================
              CONTACT
          ================================================= */}

          <div className="dental-contact">

            <div className="contact-item-tech">

              <Phone size={13} />

              <span>
                {appointment.phone}
              </span>

            </div>

            <div className="contact-item-tech">

              <Mail size={13} />

              <span>
                {appointment.email ||
                  "patient@example.com"}
              </span>

            </div>

          </div>

          {/* DIVIDER */}

          <div className="dental-divider" />

          {/* ================================================
              ACTIONS
          ================================================= */}

          <div className="dental-actions">

            {/* DELETE */}

            <button
              type="button"
              onClick={() =>
                onDelete(appointment.id)
              }
              className="dental-action delete"
              title="حذف الموعد"
            >
              <Trash2 size={16} />
            </button>

            {/* EDIT */}

            <button
              type="button"
              onClick={() =>
                onEdit(appointment)
              }
              className="dental-action edit"
              title="تعديل الموعد"
            >
              <Edit size={16} />
            </button>

            {/* REMINDER */}

            <button
              type="button"
              onClick={() =>
                onReminder(appointment.name)
              }
              className="dental-action whatsapp"
              title="إرسال تذكير"
            >
              <MessageCircle size={16} />
            </button>

            {/* STATUS */}

            <div className="dental-status-select-wrapper">

              <select
                value={
                  appointment.status ||
                  "confirmed"
                }
                onChange={
                  handleStatusChange
                }
                className="dental-status-select"
              >

                <option value="confirmed">
                  مؤكد
                </option>

                <option value="waiting">
                  في الانتظار
                </option>

                <option value="pending">
                  جديد
                </option>

                <option value="completed">
                  تم الحضور
                </option>

                <option value="cancelled">
                  ملغي
                </option>

                <option value="no-show">
                  لم يحضر
                </option>

              </select>

              <ChevronDown
                size={13}
                className="select-arrow"
              />

            </div>

          </div>

          {/* REMINDER */}

          <button
            type="button"
            onClick={() =>
              onReminder(appointment.name)
            }
            className="reminder-button"
          >
            <MessageCircle size={14} />

            إرسال تذكير للمريض

            <Sparkles size={12} />

          </button>

        </div>

        {/* FOOTER */}

        <div className="dental-card-footer">

          <span className="footer-dot" />

          DENTAL CARE · APPOINTMENT SYSTEM

        </div>

      </div>
    </>
  );
}