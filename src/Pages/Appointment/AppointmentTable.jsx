import {
  Calendar,
  Clock,
  User,
  Phone,
  Stethoscope,
  Bell,
  Edit,
  Trash2,
  Mail,
  Activity,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AppointmentTable({
  appointments = [],
  onDelete,
  onReminder,
  onEdit,
}) {
  const ToothIcon = () => (
    <svg
      width="25"
      height="28"
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
        opacity=".55"
      />

      <path
        d="M36 19C39 21 42 21 46 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".55"
      />
    </svg>
  );

  const getStatus = (status) => {
    const config = {
      confirmed: {
        label: "مؤكد",
        className: "table-status-confirmed",
        icon: <CheckCircle2 size={12} />,
      },

      waiting: {
        label: "في الانتظار",
        className: "table-status-waiting",
        icon: <Clock size={12} />,
      },

      completed: {
        label: "تم الحضور",
        className: "table-status-completed",
        icon: <Activity size={12} />,
      },

      cancelled: {
        label: "ملغي",
        className: "table-status-cancelled",
        icon: <Trash2 size={12} />,
      },

      "no-show": {
        label: "لم يحضر",
        className: "table-status-cancelled",
        icon: <Trash2 size={12} />,
      },

      pending: {
        label: "جديد",
        className: "table-status-new",
        icon: <Sparkles size={12} />,
      },
    };

    return config[status] || config.confirmed;
  };

  return (
    <>
      <style>{`

        /* =====================================================
           APPOINTMENT TABLE
        ===================================================== */

        .dental-table-wrapper {
          position: relative;
          overflow: hidden;

          border-radius: 26px;

          background:
            radial-gradient(
              circle at 90% 0%,
              rgba(0, 200, 255, .09),
              transparent 25%
            ),
            radial-gradient(
              circle at 0% 100%,
              rgba(0, 92, 255, .07),
              transparent 28%
            ),
            linear-gradient(
              145deg,
              #071a2c 0%,
              #041321 48%,
              #020a14 100%
            );

          border:
            1px solid
              rgba(38, 184, 240, .22);

          box-shadow:
            0 25px 65px
              rgba(0, 0, 0, .32),
            inset 0 1px 0
              rgba(255,255,255,.035);
        }

        .dental-table-wrapper::before {
          content: "";

          position: absolute;
          inset: 0;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(0, 193, 255, .022) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 193, 255, .022) 1px,
              transparent 1px
            );

          background-size: 34px 34px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 90%
            );
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .dental-table-header {
          position: relative;
          z-index: 3;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 19px 22px;

          border-bottom:
            1px solid
              rgba(40, 169, 215, .14);
        }

        .dental-table-title-area {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .dental-table-icon {
          position: relative;

          width: 47px;
          height: 47px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #2bdcff;

          border-radius: 15px;

          background:
            linear-gradient(
              145deg,
              rgba(0, 201, 255, .13),
              rgba(0, 80, 150, .07)
            );

          border:
            1px solid
              rgba(34, 211, 255, .27);

          box-shadow:
            0 0 28px
              rgba(0, 194, 255, .08);
        }

        .dental-table-icon::after {
          content: "";

          position: absolute;

          inset: -5px;

          border-radius: 18px;

          border:
            1px solid
              rgba(0, 200, 255, .06);
        }

        .dental-table-title {
          color: #eafaff;

          font-size: 17px;
          font-weight: 900;

          letter-spacing: -.2px;
        }

        .dental-table-subtitle {
          color: #507086;

          font-size: 9px;

          margin-top: 4px;

          letter-spacing: .8px;
        }

        .dental-live-indicator {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #34dfa9;

          font-size: 8px;
          font-weight: 900;

          letter-spacing: 1.1px;

          padding: 7px 10px;

          border-radius: 999px;

          background:
            rgba(30, 220, 157, .045);

          border:
            1px solid
              rgba(30, 220, 157, .17);
        }

        .dental-live-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background: #32e3aa;

          box-shadow:
            0 0 8px
              rgba(50, 227, 170, .8);

          animation:
            livePulse 1.8s infinite;
        }

        @keyframes livePulse {
          0%,100% {
            opacity: .45;
            transform: scale(.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        /* =====================================================
           TABLE
        ===================================================== */

        .dental-table-scroll {
          position: relative;
          z-index: 2;

          overflow-x: auto;
        }

        .dental-table {
          width: 100%;
          min-width: 930px;

          border-collapse: separate;
          border-spacing: 0;
        }

        .dental-table thead th {
          padding: 13px 18px;

          color: #527287;

          font-size: 8px;
          font-weight: 900;

          letter-spacing: 1.1px;

          text-transform: uppercase;

          text-align: right;

          background:
            rgba(0, 117, 167, .035);

          border-bottom:
            1px solid
              rgba(46, 171, 216, .10);

          white-space: nowrap;
        }

        .dental-table thead th:first-child {
          padding-right: 22px;
        }

        /* =====================================================
           ROW
        ===================================================== */

        .dental-table-row {
          position: relative;

          transition:
            background .25s ease,
            transform .25s ease;
        }

        .dental-table-row td {
          padding: 15px 18px;

          border-bottom:
            1px solid
              rgba(46, 154, 198, .075);

          color: #91adbc;

          font-size: 11px;

          background:
            rgba(255,255,255,0);

          transition:
            background .25s ease,
            border-color .25s ease;
        }

        .dental-table-row:hover td {
          background:
            rgba(0, 194, 255, .035);

          border-bottom-color:
            rgba(0, 194, 255, .13);
        }

        .dental-table-row:last-child td {
          border-bottom: none;
        }

        /* =====================================================
           PATIENT
        ===================================================== */

        .table-patient {
          display: flex;
          align-items: center;
          gap: 11px;

          min-width: 185px;
        }

        .table-patient-avatar {
          position: relative;

          width: 43px;
          height: 43px;

          min-width: 43px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #28d9ff;

          border-radius: 14px;

          background:
            linear-gradient(
              145deg,
              rgba(0, 198, 255, .13),
              rgba(0, 72, 133, .08)
            );

          border:
            1px solid
              rgba(31, 205, 255, .25);

          box-shadow:
            0 0 22px
              rgba(0, 196, 255, .06);
        }

        .table-patient-avatar::before {
          content: "";

          position: absolute;

          inset: -4px;

          border-radius: 17px;

          border:
            1px solid
              rgba(0, 201, 255, .055);
        }

        .table-patient-avatar svg {
          filter:
            drop-shadow(
              0 0 5px
              rgba(0, 211, 255, .45)
            );
        }

        .table-patient-name {
          color: #e1f4fa;

          font-size: 12px;
          font-weight: 900;

          white-space: nowrap;
        }

        .table-patient-id {
          margin-top: 4px;

          color: #38596c;

          font-size: 7px;

          letter-spacing: 1px;
        }

        /* =====================================================
           CONTACT
        ===================================================== */

        .table-contact {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #7793a3;

          white-space: nowrap;
        }

        .table-contact-icon {
          color: #27cfff;

          filter:
            drop-shadow(
              0 0 4px
              rgba(0, 207, 255, .25)
            );
        }

        .table-email {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #668395;

          font-size: 10px;

          max-width: 170px;

          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* =====================================================
           DATE
        ===================================================== */

        .table-date-box {
          display: flex;
          align-items: center;
          gap: 8px;

          white-space: nowrap;
        }

        .table-date-icon {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #3bdcff;

          border-radius: 9px;

          background:
            rgba(0, 194, 255, .055);

          border:
            1px solid
              rgba(0, 194, 255, .13);
        }

        .table-date-text {
          color: #9bb4c0;

          font-weight: 700;
        }

        /* =====================================================
           TIME
        ===================================================== */

        .table-time-box {
          display: flex;
          align-items: center;
          gap: 8px;

          white-space: nowrap;
        }

        .table-time-icon {
          width: 30px;
          height: 30px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #39e0ad;

          border-radius: 9px;

          background:
            rgba(30, 220, 158, .05);

          border:
            1px solid
              rgba(30, 220, 158, .12);
        }

        .table-time-text {
          color: #a4bac5;

          font-weight: 900;
        }

        /* =====================================================
           SERVICE
        ===================================================== */

        .table-service {
          display: inline-flex;
          align-items: center;
          gap: 8px;

          padding: 8px 10px;

          color: #63dfff;

          background:
            rgba(0, 183, 235, .05);

          border:
            1px solid
              rgba(0, 194, 255, .13);

          border-radius: 11px;

          font-size: 9px;
          font-weight: 800;

          white-space: nowrap;
        }

        .table-service-icon {
          width: 23px;
          height: 23px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #2cdbff;

          border-radius: 7px;

          background:
            rgba(0, 200, 255, .08);
        }

        /* =====================================================
           STATUS
        ===================================================== */

        .table-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;

          padding: 6px 9px;

          border-radius: 999px;

          font-size: 8px;
          font-weight: 900;

          white-space: nowrap;
        }

        .table-status-confirmed {
          color: #32e2a8;

          background:
            rgba(30, 220, 158, .055);

          border:
            1px solid
              rgba(30, 220, 158, .19);
        }

        .table-status-waiting {
          color: #ffca4b;

          background:
            rgba(255, 194, 55, .055);

          border:
            1px solid
              rgba(255, 194, 55, .19);
        }

        .table-status-completed {
          color: #69adff;

          background:
            rgba(70, 145, 255, .055);

          border:
            1px solid
              rgba(70, 145, 255, .19);
        }

        .table-status-cancelled {
          color: #ff6978;

          background:
            rgba(255, 69, 83, .055);

          border:
            1px solid
              rgba(255, 69, 83, .19);
        }

        .table-status-new {
          color: #32d9ff;

          background:
            rgba(0, 194, 255, .055);

          border:
            1px solid
              rgba(0, 194, 255, .19);
        }

        /* =====================================================
           ACTION BUTTONS
        ===================================================== */

        .table-actions {
          display: flex;
          align-items: center;
          justify-content: center;

          gap: 6px;
        }

        .table-action {
          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 9px;

          background:
            rgba(0, 8, 18, .5);

          border:
            1px solid
              rgba(74, 154, 194, .15);

          color: #607e91;

          cursor: pointer;

          transition:
            transform .2s ease,
            color .2s ease,
            background .2s ease,
            border-color .2s ease,
            box-shadow .2s ease;
        }

        .table-action:hover {
          transform: translateY(-2px);
        }

        .table-action.reminder:hover {
          color: #35ddff;

          border-color:
            rgba(0, 207, 255, .4);

          background:
            rgba(0, 194, 255, .07);

          box-shadow:
            0 0 17px
              rgba(0, 194, 255, .07);
        }

        .table-action.edit:hover {
          color: #ffc54d;

          border-color:
            rgba(255, 194, 55, .38);

          background:
            rgba(255, 194, 55, .06);
        }

        .table-action.delete:hover {
          color: #ff6978;

          border-color:
            rgba(255, 67, 82, .4);

          background:
            rgba(255, 67, 82, .06);
        }

        /* =====================================================
           EMPTY
        ===================================================== */

        .dental-table-empty {
          padding: 65px 20px;

          text-align: center;
        }

        .empty-tooth {
          width: 68px;
          height: 68px;

          margin: 0 auto 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #24d9ff;

          border-radius: 21px;

          background:
            rgba(0, 190, 255, .045);

          border:
            1px solid
              rgba(0, 194, 255, .12);

          box-shadow:
            0 0 30px
              rgba(0, 194, 255, .05);

          animation:
            toothFloat 3s ease-in-out infinite;
        }

        @keyframes toothFloat {
          0%,100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-5px);
          }
        }

        .empty-title {
          color: #c2dce6;

          font-size: 13px;
          font-weight: 900;
        }

        .empty-subtitle {
          margin-top: 5px;

          color: #456477;

          font-size: 9px;
        }

        /* =====================================================
           SCROLLBAR
        ===================================================== */

        .dental-table-scroll::-webkit-scrollbar {
          height: 5px;
        }

        .dental-table-scroll::-webkit-scrollbar-track {
          background: #020a13;
        }

        .dental-table-scroll::-webkit-scrollbar-thumb {
          background:
            rgba(25, 185, 230, .25);

          border-radius: 999px;
        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 700px) {

          .dental-table-header {
            padding: 16px;
          }

          .dental-live-indicator {
            display: none;
          }

          .dental-table-title {
            font-size: 15px;
          }

        }

      `}</style>

      <div className="dental-table-wrapper">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="dental-table-header">

          <div className="dental-table-title-area">

            <div className="dental-table-icon">
              <ToothIcon />
            </div>

            <div>

              <div className="dental-table-title">
                جدول المواعيد
              </div>

              <div className="dental-table-subtitle">
                DENTAL APPOINTMENT MANAGEMENT
              </div>

            </div>

          </div>

          <div className="dental-live-indicator">
            <span className="dental-live-dot" />
            LIVE SCHEDULE
          </div>

        </div>

        {/* ===================================================
            TABLE
        =================================================== */}

        <div className="dental-table-scroll">

          <table className="dental-table">

            <thead>

              <tr>

                <th>
                  المريض
                </th>

                <th>
                  رقم الهاتف
                </th>

                <th>
                  التاريخ
                </th>

                <th>
                  الوقت
                </th>

                <th>
                  نوع الجلسة
                </th>

                <th>
                  الحالة
                </th>

                <th className="text-center">
                  الإجراءات
                </th>

              </tr>

            </thead>

            <tbody>

              {appointments.length === 0 ? (

                <tr>

                  <td colSpan="7">

                    <div className="dental-table-empty">

                      <div className="empty-tooth">
                        <ToothIcon />
                      </div>

                      <div className="empty-title">
                        لا توجد مواعيد
                      </div>

                      <div className="empty-subtitle">
                        NO APPOINTMENTS REGISTERED
                      </div>

                    </div>

                  </td>

                </tr>

              ) : (

                appointments.map((appointment) => {

                  const status =
                    getStatus(
                      appointment.status
                    );

                  return (

                    <tr
                      key={appointment.id}
                      className="dental-table-row"
                    >

                      {/* ================================
                          PATIENT
                      ================================= */}

                      <td>

                        <div className="table-patient">

                          <div className="table-patient-avatar">

                            <User size={19} />

                          </div>

                          <div>

                            <div className="table-patient-name">
                              {appointment.name}
                            </div>

                            <div className="table-patient-id">
                              PATIENT · #{appointment.id}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* ================================
                          PHONE
                      ================================= */}

                      <td>

                        <div className="table-contact">

                          <Phone
                            size={13}
                            className="table-contact-icon"
                          />

                          <span>
                            {appointment.phone}
                          </span>

                        </div>

                      </td>

                      {/* ================================
                          DATE
                      ================================= */}

                      <td>

                        <div className="table-date-box">

                          <div className="table-date-icon">

                            <Calendar size={14} />

                          </div>

                          <span className="table-date-text">
                            {appointment.date}
                          </span>

                        </div>

                      </td>

                      {/* ================================
                          TIME
                      ================================= */}

                      <td>

                        <div className="table-time-box">

                          <div className="table-time-icon">

                            <Clock size={14} />

                          </div>

                          <span className="table-time-text">
                            {appointment.time}
                          </span>

                        </div>

                      </td>

                      {/* ================================
                          SERVICE
                      ================================= */}

                      <td>

                        <div className="table-service">

                          <div className="table-service-icon">

                            <Stethoscope size={13} />

                          </div>

                          {appointment.service}

                        </div>

                      </td>

                      {/* ================================
                          STATUS
                      ================================= */}

                      <td>

                        <span
                          className={`table-status ${status.className}`}
                        >

                          {status.icon}

                          {status.label}

                        </span>

                      </td>

                      {/* ================================
                          ACTIONS
                      ================================= */}

                      <td>

                        <div className="table-actions">

                          <button
                            type="button"
                            className="table-action reminder"
                            onClick={() =>
                              onReminder?.(
                                appointment.name
                              )
                            }
                            title="إرسال تذكير"
                          >

                            <Bell size={15} />

                          </button>

                          <button
                            type="button"
                            className="table-action edit"
                            onClick={() =>
                              onEdit?.(
                                appointment
                              )
                            }
                            title="تعديل الموعد"
                          >

                            <Edit size={15} />

                          </button>

                          <button
                            type="button"
                            className="table-action delete"
                            onClick={() =>
                              onDelete?.(
                                appointment.id
                              )
                            }
                            title="حذف الموعد"
                          >

                            <Trash2 size={15} />

                          </button>

                        </div>

                      </td>

                    </tr>

                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );
}