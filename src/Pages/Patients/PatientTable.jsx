import {
  Eye,
  Pencil,
  Trash2,
  UserRound,
  Phone,
  MapPin,
  Calendar,
  VenusAndMars,
  Hash,
  Users,
} from "lucide-react";

export default function PatientTable({
  patients = [],
  onDelete,
  onEdit,
  onView,
}) {
  if (patients.length === 0) {
    return (
      <div className="patients-empty">
        <div className="empty-glow"></div>

        <div className="empty-icon">
          <Users size={30} />
        </div>

        <h3>No Patients Found</h3>

        <p>
          No patient records match your current search.
        </p>

        <style>{`
          .patients-empty {
            position: relative;
            overflow: hidden;
            min-height: 260px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px 20px;
            border: 1px solid rgba(59, 210, 255, 0.16);
            border-radius: 24px;
            background:
              linear-gradient(
                145deg,
                rgba(8, 25, 43, 0.92),
                rgba(2, 11, 22, 0.96)
              );
            box-shadow:
              0 20px 60px rgba(0, 0, 0, 0.35),
              inset 0 0 30px rgba(0, 180, 255, 0.025);
            backdrop-filter: blur(18px);
          }

          .patients-empty::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
              linear-gradient(
                rgba(57, 210, 255, 0.025) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(57, 210, 255, 0.025) 1px,
                transparent 1px
              );
            background-size: 32px 32px;
            pointer-events: none;
          }

          .empty-glow {
            position: absolute;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: rgba(0, 183, 255, 0.12);
            filter: blur(55px);
            pointer-events: none;
          }

          .empty-icon {
            position: relative;
            z-index: 2;
            width: 66px;
            height: 66px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 18px;
            color: #57ddff;
            background: rgba(0, 190, 255, 0.08);
            border: 1px solid rgba(73, 218, 255, 0.22);
            box-shadow:
              0 0 25px rgba(0, 190, 255, 0.12),
              inset 0 0 20px rgba(0, 190, 255, 0.04);
          }

          .patients-empty h3 {
            position: relative;
            z-index: 2;
            margin: 18px 0 6px;
            color: #e9faff;
            font-size: 18px;
            font-weight: 700;
          }

          .patients-empty p {
            position: relative;
            z-index: 2;
            margin: 0;
            color: #7893a8;
            font-size: 13px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="patients-table-wrapper">
      {/* Table Header */}
      <div className="table-top-bar">
        <div className="table-title">
          <div className="table-title-icon">
            <Users size={18} />
          </div>

          <div>
            <h3>Patient Directory</h3>
            <span>
              {patients.length}{" "}
              {patients.length === 1 ? "patient" : "patients"} registered
            </span>
          </div>
        </div>

        <div className="live-status">
          <span className="live-dot"></span>
          LIVE DATABASE
        </div>
      </div>

      {/* Table */}
      <div className="table-scroll">
        <table className="patients-table">
          <thead>
            <tr>
              <th>
                <span>
                  <Hash size={13} />
                  CODE
                </span>
              </th>

              <th>
                <span>
                  <UserRound size={13} />
                  PATIENT
                </span>
              </th>

              <th>
                <span>
                  <Calendar size={13} />
                  AGE
                </span>
              </th>

              <th>
                <span>
                  <Phone size={13} />
                  PHONE
                </span>
              </th>

              <th>
                <span>
                  <MapPin size={13} />
                  ADDRESS
                </span>
              </th>

              <th>
                <span>
                  <VenusAndMars size={13} />
                  GENDER
                </span>
              </th>

              <th className="actions-heading">
                ACTIONS
              </th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient, index) => (
              <tr
                key={patient.id}
                className="patient-row"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Code */}
                <td>
                  <div className="patient-code">
                    <span className="code-line"></span>
                    {patient.patientCode || "N/A"}
                  </div>
                </td>

                {/* Name */}
                <td>
                  <div className="patient-name-cell">
                    <div className="patient-avatar">
                      <UserRound size={17} />
                    </div>

                    <div className="patient-name-info">
                      <strong>
                        {patient.name || "Unknown Patient"}
                      </strong>

                      <span>
                        Patient Record
                      </span>
                    </div>
                  </div>
                </td>

                {/* Age */}
                <td>
                  <div className="age-cell">
                    <span>
                      {patient.age || "--"}
                    </span>

                    {patient.age && (
                      <small>years</small>
                    )}
                  </div>
                </td>

                {/* Phone */}
                <td>
                  <div className="phone-cell">
                    <Phone size={14} />
                    <span>
                      {patient.phone || "Not provided"}
                    </span>
                  </div>
                </td>

                {/* Address */}
                <td>
                  <div className="address-cell">
                    <MapPin size={14} />

                    <span
                      title={patient.address || "Not provided"}
                    >
                      {patient.address || "Not provided"}
                    </span>
                  </div>
                </td>

                {/* Gender */}
                <td>
                  <div
                    className={`gender-badge ${
                      String(patient.gender || "")
                        .toLowerCase() === "female"
                        ? "female"
                        : "male"
                    }`}
                  >
                    <VenusAndMars size={13} />

                    {patient.gender || "N/A"}
                  </div>
                </td>

                {/* Actions */}
                <td>
                  <div className="actions">
                    {/* View */}
                    <button
                      type="button"
                      title="View Patient"
                      onClick={() => onView?.(patient)}
                      className="action-btn view-btn"
                    >
                      <Eye size={16} />
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      title="Edit Patient"
                      onClick={() => onEdit?.(patient)}
                      className="action-btn edit-btn"
                    >
                      <Pencil size={15} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      title="Delete Patient"
                      onClick={() => onDelete?.(patient.id)}
                      className="action-btn delete-btn"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom decoration */}
      <div className="table-bottom-line">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <style>{`
        .patients-table-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          border-radius: 24px;

          background:
            linear-gradient(
              145deg,
              rgba(8, 26, 45, 0.94),
              rgba(2, 10, 20, 0.97)
            );

          border: 1px solid rgba(62, 205, 255, 0.15);

          box-shadow:
            0 25px 70px rgba(0, 0, 0, 0.4),
            0 0 45px rgba(0, 160, 255, 0.035),
            inset 0 0 35px rgba(0, 170, 255, 0.025);

          backdrop-filter: blur(20px);
        }

        /* =========================================
           TOP BAR
        ========================================= */

        .table-top-bar {
          height: 76px;
          padding: 0 22px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom: 1px solid rgba(86, 214, 255, 0.09);

          background:
            linear-gradient(
              90deg,
              rgba(13, 43, 67, 0.72),
              rgba(5, 20, 35, 0.42)
            );
        }

        .table-title {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .table-title-icon {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          color: #57dcff;

          background:
            linear-gradient(
              145deg,
              rgba(27, 190, 255, 0.14),
              rgba(22, 100, 170, 0.06)
            );

          border: 1px solid rgba(75, 214, 255, 0.2);

          box-shadow:
            0 0 20px rgba(0, 190, 255, 0.08),
            inset 0 0 15px rgba(0, 200, 255, 0.04);
        }

        .table-title h3 {
          margin: 0;
          color: #e8faff;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        .table-title span {
          display: block;
          margin-top: 3px;
          color: #69879c;
          font-size: 11px;
        }

        .live-status {
          display: flex;
          align-items: center;
          gap: 7px;

          padding: 7px 11px;

          border-radius: 20px;

          color: #61e7ff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;

          background: rgba(24, 196, 232, 0.055);
          border: 1px solid rgba(43, 208, 239, 0.13);
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #42e1ff;

          box-shadow:
            0 0 8px #42e1ff,
            0 0 15px rgba(66, 225, 255, 0.5);

          animation: livePulse 1.8s infinite;
        }

        @keyframes livePulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.45;
            transform: scale(0.7);
          }
        }

        /* =========================================
           SCROLL
        ========================================= */

        .table-scroll {
          width: 100%;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(46, 203, 255, 0.35) transparent;
        }

        .table-scroll::-webkit-scrollbar {
          height: 6px;
        }

        .table-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.15);
        }

        .table-scroll::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgba(43, 203, 255, 0.28);
        }

        /* =========================================
           TABLE
        ========================================= */

        .patients-table {
          width: 100%;
          min-width: 1050px;
          border-collapse: collapse;
        }

        .patients-table thead {
          background:
            linear-gradient(
              90deg,
              rgba(7, 28, 47, 0.95),
              rgba(8, 35, 56, 0.72),
              rgba(5, 23, 39, 0.94)
            );
        }

        .patients-table th {
          padding: 15px 17px;

          color: #5e9ab1;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: 1.1px;

          text-align: left;

          border-bottom: 1px solid rgba(75, 213, 255, 0.1);

          white-space: nowrap;
        }

        .patients-table th span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .patients-table th svg {
          color: #3bd7ff;
          opacity: 0.75;
        }

        .patients-table th.actions-heading {
          text-align: center;
        }

        /* =========================================
           ROW
        ========================================= */

        .patient-row {
          position: relative;

          animation: rowAppear 0.35s ease both;

          transition:
            background 0.25s ease,
            transform 0.25s ease;
        }

        @keyframes rowAppear {
          from {
            opacity: 0;
            transform: translateY(5px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .patient-row:not(:last-child) td {
          border-bottom: 1px solid rgba(89, 177, 207, 0.065);
        }

        .patient-row:hover {
          background:
            linear-gradient(
              90deg,
              rgba(23, 180, 224, 0.045),
              rgba(16, 102, 145, 0.075),
              rgba(20, 175, 220, 0.035)
            );
        }

        .patients-table td {
          padding: 15px 17px;
          color: #a8c3d1;
          font-size: 12px;
          vertical-align: middle;
        }

        /* =========================================
           CODE
        ========================================= */

        .patient-code {
          display: flex;
          align-items: center;
          gap: 7px;

          color: #47ddff;

          font-family: monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.4px;

          white-space: nowrap;
        }

        .code-line {
          width: 3px;
          height: 18px;
          border-radius: 5px;

          background: #36d7ff;

          box-shadow:
            0 0 9px rgba(54, 215, 255, 0.7);
        }

        /* =========================================
           NAME
        ========================================= */

        .patient-name-cell {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 170px;
        }

        .patient-avatar {
          flex-shrink: 0;

          width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 12px;

          color: #63dcff;

          background:
            linear-gradient(
              145deg,
              rgba(28, 182, 237, 0.14),
              rgba(31, 87, 126, 0.07)
            );

          border: 1px solid rgba(63, 210, 255, 0.15);

          box-shadow:
            inset 0 0 15px rgba(0, 194, 255, 0.03);
        }

        .patient-name-info strong {
          display: block;

          color: #e4f5fb;

          font-size: 12px;
          font-weight: 650;

          white-space: nowrap;
        }

        .patient-name-info span {
          display: block;

          margin-top: 3px;

          color: #567589;

          font-size: 9px;
        }

        /* =========================================
           AGE
        ========================================= */

        .age-cell {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .age-cell span {
          color: #d4edf5;
          font-weight: 650;
        }

        .age-cell small {
          color: #567589;
          font-size: 9px;
        }

        /* =========================================
           PHONE
        ========================================= */

        .phone-cell {
          display: flex;
          align-items: center;
          gap: 7px;
          white-space: nowrap;
        }

        .phone-cell svg {
          color: #3dd8ff;
          opacity: 0.7;
        }

        .phone-cell span {
          color: #a5c1cf;
          font-size: 11px;
        }

        /* =========================================
           ADDRESS
        ========================================= */

        .address-cell {
          max-width: 190px;

          display: flex;
          align-items: center;
          gap: 7px;
        }

        .address-cell svg {
          flex-shrink: 0;
          color: #3dcdf4;
          opacity: 0.65;
        }

        .address-cell span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          color: #91afbe;
          font-size: 11px;
        }

        /* =========================================
           GENDER
        ========================================= */

        .gender-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;

          padding: 6px 9px;

          border-radius: 8px;

          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;

          background: rgba(51, 201, 240, 0.055);
          border: 1px solid rgba(51, 201, 240, 0.12);

          color: #66dcf8;
        }

        .gender-badge.female {
          color: #c48cff;
          background: rgba(177, 99, 255, 0.055);
          border-color: rgba(177, 99, 255, 0.13);
        }

        /* =========================================
           ACTIONS
        ========================================= */

        .actions {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
        }

        .action-btn {
          position: relative;

          width: 34px;
          height: 34px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 10px;

          cursor: pointer;

          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        }

        .action-btn:hover {
          transform: translateY(-2px);
        }

        .action-btn:active {
          transform: translateY(0) scale(0.96);
        }

        /* VIEW */

        .view-btn {
          color: #4fe1ff;

          background: rgba(31, 196, 240, 0.065);
          border: 1px solid rgba(31, 196, 240, 0.14);
        }

        .view-btn:hover {
          background: rgba(31, 196, 240, 0.13);

          border-color: rgba(31, 211, 255, 0.34);

          box-shadow:
            0 0 18px rgba(31, 205, 255, 0.14);
        }

        /* EDIT */

        .edit-btn {
          color: #e7bf65;

          background: rgba(231, 191, 101, 0.055);
          border: 1px solid rgba(231, 191, 101, 0.12);
        }

        .edit-btn:hover {
          background: rgba(231, 191, 101, 0.12);

          border-color: rgba(231, 191, 101, 0.3);

          box-shadow:
            0 0 18px rgba(231, 191, 101, 0.11);
        }

        /* DELETE */

        .delete-btn {
          color: #ff6878;

          background: rgba(255, 76, 96, 0.05);
          border: 1px solid rgba(255, 76, 96, 0.12);
        }

        .delete-btn:hover {
          background: rgba(255, 76, 96, 0.12);

          border-color: rgba(255, 76, 96, 0.3);

          box-shadow:
            0 0 18px rgba(255, 76, 96, 0.11);
        }

        /* =========================================
           BOTTOM
        ========================================= */

        .table-bottom-line {
          height: 3px;

          display: flex;
          gap: 4px;

          background: rgba(0, 0, 0, 0.25);
        }

        .table-bottom-line span:nth-child(1) {
          width: 55%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(44, 207, 255, 0.4),
            transparent
          );
        }

        .table-bottom-line span:nth-child(2) {
          width: 25%;
          background: rgba(47, 181, 235, 0.08);
        }

        .table-bottom-line span:nth-child(3) {
          flex: 1;
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

        @media (max-width: 900px) {
          .table-top-bar {
            padding: 0 15px;
          }

          .live-status {
            display: none;
          }

          .patients-table th,
          .patients-table td {
            padding: 13px 12px;
          }
        }
      `}</style>
    </div>
  );
}