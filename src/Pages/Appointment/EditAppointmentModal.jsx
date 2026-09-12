import { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Stethoscope,
  FileText,
  Save,
  Sparkles,
  Activity,
  CheckCircle2,
} from "lucide-react";

export default function EditAppointmentModal({
  isOpen,
  onClose,
  appointment,
  onUpdate,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (appointment) {
      setName(appointment.name || "");
      setPhone(appointment.phone || "");
      setDate(appointment.date || "");
      setTime(appointment.time || "");
      setService(appointment.service || "");
      setNotes(appointment.notes || "");
    }
  }, [appointment]);

  if (!isOpen || !appointment) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !phone.trim() ||
      !date ||
      !time ||
      !service
    ) {
      return;
    }

    const updatedAppointment = {
      ...appointment,
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      service,
      notes: notes.trim(),
    };

    onUpdate(updatedAppointment);
    onClose();
  };

  return (
    <>
      <style>{`
        .edit-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(0, 229, 255, 0.08),
              transparent 35%
            ),
            rgba(1, 5, 13, 0.84);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          animation: editOverlayIn 0.25s ease;
          direction: rtl;
        }

        .edit-modal-shell {
          position: relative;
          width: 100%;
          max-width: 760px;
          max-height: calc(100vh - 48px);
          overflow-y: auto;
          border: 1px solid rgba(0, 229, 255, 0.18);
          border-radius: 28px;
          background:
            linear-gradient(
              145deg,
              rgba(8, 21, 35, 0.98),
              rgba(3, 10, 20, 0.99)
            );
          box-shadow:
            0 30px 100px rgba(0, 0, 0, 0.65),
            0 0 70px rgba(0, 210, 255, 0.09),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          animation: editModalIn 0.35s cubic-bezier(.2,.8,.2,1);
          scrollbar-width: thin;
          scrollbar-color: rgba(0, 229, 255, 0.35) transparent;
        }

        .edit-modal-shell::-webkit-scrollbar {
          width: 6px;
        }

        .edit-modal-shell::-webkit-scrollbar-track {
          background: transparent;
        }

        .edit-modal-shell::-webkit-scrollbar-thumb {
          background: rgba(0, 229, 255, 0.35);
          border-radius: 20px;
        }

        .edit-grid-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.2;
          background-image:
            linear-gradient(
              rgba(0, 229, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 229, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 32px 32px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 85%
          );
        }

        .edit-glow-one {
          position: absolute;
          width: 230px;
          height: 230px;
          top: -100px;
          right: -70px;
          border-radius: 50%;
          background: rgba(0, 229, 255, 0.08);
          filter: blur(50px);
          pointer-events: none;
        }

        .edit-glow-two {
          position: absolute;
          width: 220px;
          height: 220px;
          bottom: -100px;
          left: -70px;
          border-radius: 50%;
          background: rgba(66, 91, 255, 0.07);
          filter: blur(55px);
          pointer-events: none;
        }

        .edit-modal-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 24px 26px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(7, 18, 31, 0.72);
        }

        .edit-header-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .edit-main-icon {
          position: relative;
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          color: #5cecff;
          background:
            linear-gradient(
              145deg,
              rgba(0, 229, 255, 0.15),
              rgba(0, 125, 255, 0.08)
            );
          border: 1px solid rgba(0, 229, 255, 0.2);
          box-shadow:
            0 0 25px rgba(0, 229, 255, 0.08),
            inset 0 0 20px rgba(0, 229, 255, 0.04);
        }

        .edit-main-icon::before {
          content: "";
          position: absolute;
          inset: -5px;
          border-radius: 20px;
          border: 1px solid rgba(0, 229, 255, 0.08);
          animation: iconPulse 2.5s infinite;
        }

        .edit-title {
          margin: 0;
          color: #f5fbff;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.3px;
        }

        .edit-subtitle {
          margin: 5px 0 0;
          color: #7891a5;
          font-size: 12px;
        }

        .edit-status-mini {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 7px;
          padding: 5px 9px;
          border-radius: 999px;
          color: #64f5bd;
          background: rgba(50, 220, 145, 0.08);
          border: 1px solid rgba(50, 220, 145, 0.15);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .edit-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #53edb3;
          box-shadow: 0 0 9px rgba(83, 237, 179, 0.9);
        }

        .edit-close {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.035);
          color: #8197aa;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .edit-close:hover {
          color: #ffffff;
          border-color: rgba(255, 70, 100, 0.35);
          background: rgba(255, 70, 100, 0.08);
          box-shadow: 0 0 20px rgba(255, 70, 100, 0.08);
          transform: rotate(90deg);
        }

        .edit-modal-body {
          position: relative;
          padding: 24px 26px 26px;
        }

        .edit-section {
          margin-bottom: 23px;
        }

        .edit-section:last-of-type {
          margin-bottom: 0;
        }

        .edit-section-heading {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 13px;
        }

        .edit-section-heading-icon {
          width: 29px;
          height: 29px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          color: #53e9ff;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.11);
        }

        .edit-section-title {
          margin: 0;
          color: #dcecf7;
          font-size: 13px;
          font-weight: 800;
        }

        .edit-section-line {
          flex: 1;
          height: 1px;
          margin-right: 4px;
          background: linear-gradient(
            90deg,
            rgba(0, 229, 255, 0.16),
            transparent
          );
        }

        .edit-fields-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .edit-field {
          min-width: 0;
        }

        .edit-field.full {
          grid-column: 1 / -1;
        }

        .edit-label {
          display: block;
          margin-bottom: 7px;
          color: #8ea4b6;
          font-size: 11px;
          font-weight: 700;
        }

        .edit-input-wrap {
          position: relative;
        }

        .edit-input-icon {
          position: absolute;
          top: 50%;
          right: 13px;
          transform: translateY(-50%);
          color: #4f8396;
          pointer-events: none;
          transition: 0.2s ease;
        }

        .edit-textarea-wrap .edit-input-icon {
          top: 14px;
          transform: none;
        }

        .edit-input,
        .edit-select,
        .edit-textarea {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 13px;
          outline: none;
          color: #eaf7ff;
          background:
            linear-gradient(
              145deg,
              rgba(10, 28, 43, 0.88),
              rgba(5, 16, 28, 0.94)
            );
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.025),
            0 5px 20px rgba(0, 0, 0, 0.12);
          transition: 0.25s ease;
          font-family: inherit;
          font-size: 13px;
        }

        .edit-input,
        .edit-select {
          height: 47px;
          padding: 0 42px 0 13px;
        }

        .edit-textarea {
          min-height: 105px;
          resize: vertical;
          padding: 13px 42px 13px 13px;
          line-height: 1.7;
        }

        .edit-input::placeholder,
        .edit-textarea::placeholder {
          color: #4f6879;
        }

        .edit-input:focus,
        .edit-select:focus,
        .edit-textarea:focus {
          border-color: rgba(0, 229, 255, 0.48);
          background:
            linear-gradient(
              145deg,
              rgba(11, 34, 50, 0.95),
              rgba(5, 18, 30, 0.98)
            );
          box-shadow:
            0 0 0 3px rgba(0, 229, 255, 0.055),
            0 0 25px rgba(0, 229, 255, 0.07);
        }

        .edit-input-wrap:focus-within .edit-input-icon {
          color: #53e9ff;
          filter: drop-shadow(0 0 6px rgba(83, 233, 255, 0.5));
        }

        .edit-select {
          appearance: none;
          cursor: pointer;
        }

        .edit-select option {
          background: #081622;
          color: #ffffff;
        }

        .edit-select-arrow {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #4f8396;
          pointer-events: none;
          font-size: 12px;
        }

        .edit-info-card {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 20px;
          padding: 11px 13px;
          border-radius: 13px;
          border: 1px solid rgba(0, 229, 255, 0.1);
          background: rgba(0, 229, 255, 0.035);
        }

        .edit-info-card svg {
          color: #54e9ff;
          flex-shrink: 0;
        }

        .edit-info-text {
          color: #7891a5;
          font-size: 11px;
          line-height: 1.6;
        }

        .edit-info-text strong {
          color: #c9e9f4;
        }

        .edit-footer {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-top: 25px;
          padding-top: 19px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .edit-footer-note {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #526c7d;
          font-size: 10px;
        }

        .edit-footer-note svg {
          color: #3fcfe8;
        }

        .edit-actions {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .edit-cancel,
        .edit-save {
          height: 44px;
          padding: 0 18px;
          border-radius: 12px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .edit-cancel {
          color: #8da2b1;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.035);
        }

        .edit-cancel:hover {
          color: #e6f5fb;
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.13);
        }

        .edit-save {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #021018;
          border: 1px solid rgba(98, 241, 255, 0.45);
          background: linear-gradient(
            135deg,
            #64efff,
            #2ac9ec
          );
          box-shadow:
            0 0 22px rgba(0, 229, 255, 0.16),
            inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }

        .edit-save:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 28px rgba(0, 229, 255, 0.2),
            0 0 35px rgba(0, 229, 255, 0.13);
          filter: brightness(1.06);
        }

        .edit-save:active {
          transform: translateY(0);
        }

        .edit-tooth-decoration {
          position: absolute;
          left: 22px;
          bottom: 78px;
          width: 100px;
          height: 100px;
          opacity: 0.045;
          pointer-events: none;
        }

        .edit-orbit {
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(0, 229, 255, 0.7);
          border-radius: 50%;
          transform: rotate(-25deg) scaleY(0.38);
        }

        .edit-orbit.two {
          transform: rotate(65deg) scaleY(0.38);
        }

        .edit-tooth {
          position: absolute;
          inset: 28px;
          color: #5cecff;
        }

        @keyframes editOverlayIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes editModalIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes iconPulse {
          0%, 100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.04);
          }
        }

        @media (max-width: 650px) {
          .edit-modal-overlay {
            padding: 12px;
            align-items: flex-end;
          }

          .edit-modal-shell {
            max-height: calc(100vh - 24px);
            border-radius: 24px 24px 18px 18px;
          }

          .edit-modal-header {
            padding: 19px;
          }

          .edit-modal-body {
            padding: 20px 19px;
          }

          .edit-fields-grid {
            grid-template-columns: 1fr;
          }

          .edit-field.full {
            grid-column: auto;
          }

          .edit-footer {
            flex-direction: column;
            align-items: stretch;
          }

          .edit-footer-note {
            justify-content: center;
          }

          .edit-actions {
            width: 100%;
          }

          .edit-cancel,
          .edit-save {
            flex: 1;
          }

          .edit-title {
            font-size: 17px;
          }

          .edit-main-icon {
            width: 46px;
            height: 46px;
          }

          .edit-tooth-decoration {
            display: none;
          }
        }
      `}</style>

      <div
        className="edit-modal-overlay"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="edit-modal-shell">
          <div className="edit-grid-bg" />
          <div className="edit-glow-one" />
          <div className="edit-glow-two" />

          {/* HEADER */}
          <div className="edit-modal-header">
            <div className="edit-header-left">
              <div className="edit-main-icon">
                <Calendar size={23} />
              </div>

              <div>
                <h2 className="edit-title">
                  تعديل الموعد
                </h2>

                <p className="edit-subtitle">
                  تحديث بيانات جلسة المريض
                </p>

                <div className="edit-status-mini">
                  <span className="edit-status-dot" />
                  APPOINTMENT EDIT
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="edit-close"
              aria-label="إغلاق"
            >
              <X size={19} />
            </button>
          </div>

          {/* BODY */}
          <form
            onSubmit={handleSubmit}
            className="edit-modal-body"
          >
            {/* PATIENT */}
            <section className="edit-section">
              <div className="edit-section-heading">
                <div className="edit-section-heading-icon">
                  <User size={15} />
                </div>

                <h3 className="edit-section-title">
                  بيانات المريض
                </h3>

                <div className="edit-section-line" />
              </div>

              <div className="edit-info-card">
                <Activity size={16} />

                <div className="edit-info-text">
                  <strong>Patient Record</strong>
                  {" — "}
                  قم بتحديث بيانات التواصل الخاصة بالمريض.
                </div>
              </div>

              <div className="edit-fields-grid">
                {/* NAME */}
                <div className="edit-field">
                  <label className="edit-label">
                    اسم المريض
                  </label>

                  <div className="edit-input-wrap">
                    <User
                      size={17}
                      className="edit-input-icon"
                    />

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                      placeholder="اسم المريض"
                      className="edit-input"
                    />
                  </div>
                </div>

                {/* PHONE */}
                <div className="edit-field">
                  <label className="edit-label">
                    رقم الهاتف
                  </label>

                  <div className="edit-input-wrap">
                    <Phone
                      size={17}
                      className="edit-input-icon"
                    />

                    <input
                      type="text"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      required
                      placeholder="01xxxxxxxxx"
                      className="edit-input"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* APPOINTMENT */}
            <section className="edit-section">
              <div className="edit-section-heading">
                <div className="edit-section-heading-icon">
                  <Calendar size={15} />
                </div>

                <h3 className="edit-section-title">
                  بيانات الموعد
                </h3>

                <div className="edit-section-line" />
              </div>

              <div className="edit-fields-grid">
                {/* DATE */}
                <div className="edit-field">
                  <label className="edit-label">
                    التاريخ
                  </label>

                  <div className="edit-input-wrap">
                    <Calendar
                      size={17}
                      className="edit-input-icon"
                    />

                    <input
                      type="date"
                      value={date}
                      onChange={(e) =>
                        setDate(e.target.value)
                      }
                      required
                      className="edit-input"
                    />
                  </div>
                </div>

                {/* TIME */}
                <div className="edit-field">
                  <label className="edit-label">
                    الوقت
                  </label>

                  <div className="edit-input-wrap">
                    <Clock
                      size={17}
                      className="edit-input-icon"
                    />

                    <input
                      type="time"
                      value={time}
                      onChange={(e) =>
                        setTime(e.target.value)
                      }
                      required
                      className="edit-input"
                    />
                  </div>
                </div>

                {/* SERVICE */}
                <div className="edit-field full">
                  <label className="edit-label">
                    نوع الجلسة
                  </label>

                  <div className="edit-input-wrap">
                    <Stethoscope
                      size={17}
                      className="edit-input-icon"
                    />

                    <select
                      value={service}
                      onChange={(e) =>
                        setService(e.target.value)
                      }
                      required
                      className="edit-select"
                    >
                      <option value="">
                        اختر نوع الجلسة
                      </option>

                      <option value="فحص الأسنان">
                        فحص الأسنان
                      </option>

                      <option value="تنظيف الأسنان">
                        تنظيف الأسنان
                      </option>

                      <option value="حشو">
                        حشو
                      </option>

                      <option value="حشو عصب">
                        حشو عصب
                      </option>

                      <option value="خلع">
                        خلع
                      </option>

                      <option value="تركيب">
                        تركيب
                      </option>

                      <option value="تقويم">
                        تقويم
                      </option>

                      <option value="زراعة">
                        زراعة
                      </option>

                      <option value="تبييض">
                        تبييض
                      </option>
                    </select>

                    <span className="edit-select-arrow">
                      ▾
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* NOTES */}
            <section className="edit-section">
              <div className="edit-section-heading">
                <div className="edit-section-heading-icon">
                  <FileText size={15} />
                </div>

                <h3 className="edit-section-title">
                  ملاحظات الجلسة
                </h3>

                <div className="edit-section-line" />
              </div>

              <div className="edit-field">
                <div className="edit-input-wrap edit-textarea-wrap">
                  <FileText
                    size={17}
                    className="edit-input-icon"
                  />

                  <textarea
                    value={notes}
                    onChange={(e) =>
                      setNotes(e.target.value)
                    }
                    placeholder="اكتب أي ملاحظات خاصة بالجلسة..."
                    rows={4}
                    className="edit-textarea"
                  />
                </div>
              </div>
            </section>

            {/* DECORATIVE TOOTH */}
            <div className="edit-tooth-decoration">
              <div className="edit-orbit" />
              <div className="edit-orbit two" />

              <svg
                className="edit-tooth"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 10C13 11 9 17 10 24C11 31 14 34 15 40C16 48 18 55 23 55C27 55 27 47 32 47C37 47 37 55 41 55C46 55 48 47 49 40C50 34 53 31 54 24C55 17 51 11 45 10C40 9 36 12 32 12C28 12 24 9 19 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M20 19C24 16 28 17 32 19C36 17 40 16 44 19"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* FOOTER */}
            <div className="edit-footer">
              <div className="edit-footer-note">
                <CheckCircle2 size={13} />
                سيتم حفظ التعديلات على الموعد الحالي
              </div>

              <div className="edit-actions">
                <button
                  type="button"
                  onClick={onClose}
                  className="edit-cancel"
                >
                  إلغاء
                </button>

                <button
                  type="submit"
                  className="edit-save"
                >
                  <Save size={16} />
                  حفظ التعديل
                  <Sparkles size={13} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}