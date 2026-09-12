import { useEffect, useState } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Stethoscope,
  FileText,
  Plus,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function AddAppointmentModal({
  isOpen,
  onClose,
  onAdd,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  /* =========================
     RESET WHEN MODAL OPENS
  ========================= */

  useEffect(() => {
    if (isOpen) {
      setName("");
      setPhone("");
      setDate("");
      setTime("");
      setService("");
      setNotes("");
    }
  }, [isOpen]);

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !date || !time || !service) {
      return;
    }

    const newAppointment = {
      id: Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      date,
      time,
      service,
      notes: notes.trim(),
      status: "pending",
    };

    onAdd(newAppointment);

    setName("");
    setPhone("");
    setDate("");
    setTime("");
    setService("");
    setNotes("");

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="appointment-modal-overlay" dir="rtl">
      <div
        className="appointment-modal-backdrop"
        onClick={onClose}
      />

      <div className="appointment-modal">

        {/* =========================
            HEADER
        ========================= */}

        <div className="appointment-modal-header">

          <div className="appointment-title-wrapper">

            <div className="appointment-main-icon">
              <Calendar size={22} />
            </div>

            <div>
              <div className="appointment-eyebrow">
                <Sparkles size={11} />
                SMART APPOINTMENT SYSTEM
              </div>

              <h2>حجز موعد جديد</h2>

              <p>
                إضافة موعد جديد للمريض
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="appointment-close"
          >
            <X size={20} />
          </button>

        </div>

        {/* =========================
            TOP STATUS
        ========================= */}

        <div className="appointment-system-status">

          <div className="system-status-icon">
            <CheckCircle2 size={17} />
          </div>

          <div>
            <strong>نظام الحجز متاح</strong>
            <span>
              أدخل بيانات الموعد وسيتم حفظه في جدول المواعيد
            </span>
          </div>

          <div className="system-online">
            <span />
            ONLINE
          </div>

        </div>

        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="appointment-form"
        >

          {/* =========================
              PATIENT DATA
          ========================= */}

          <div className="form-section">

            <div className="form-section-header">

              <div className="section-icon">
                <User size={17} />
              </div>

              <div>
                <h3>بيانات المريض</h3>
                <span>
                  المعلومات الأساسية للمريض
                </span>
              </div>

            </div>

            <div className="form-grid">

              {/* NAME */}

              <div className="form-field">

                <label>
                  اسم المريض
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <User size={17} />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="اكتب اسم المريض"
                    required
                  />

                </div>

              </div>

              {/* PHONE */}

              <div className="form-field">

                <label>
                  رقم الهاتف
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <Phone size={17} />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="01XXXXXXXXX"
                    required
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              APPOINTMENT DATA
          ========================= */}

          <div className="form-section">

            <div className="form-section-header">

              <div className="section-icon cyan">
                <Calendar size={17} />
              </div>

              <div>
                <h3>بيانات الموعد</h3>
                <span>
                  حدد التاريخ والوقت المناسب
                </span>
              </div>

            </div>

            <div className="form-grid">

              {/* DATE */}

              <div className="form-field">

                <label>
                  التاريخ
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <Calendar size={17} />

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

              {/* TIME */}

              <div className="form-field">

                <label>
                  الوقت
                  <span>*</span>
                </label>

                <div className="input-wrapper">

                  <Clock size={17} />

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    required
                  />

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              SERVICE
          ========================= */}

          <div className="form-section">

            <div className="form-section-header">

              <div className="section-icon purple">
                <Stethoscope size={17} />
              </div>

              <div>
                <h3>نوع الجلسة</h3>
                <span>
                  اختر الخدمة الطبية المطلوبة
                </span>
              </div>

            </div>

            <div className="service-wrapper">

              <Stethoscope size={17} />

              <select
                value={service}
                onChange={(e) =>
                  setService(e.target.value)
                }
                required
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

            </div>

          </div>

          {/* =========================
              NOTES
          ========================= */}

          <div className="form-section">

            <div className="form-section-header">

              <div className="section-icon green">
                <FileText size={17} />
              </div>

              <div>
                <h3>ملاحظات الموعد</h3>
                <span>
                  معلومات إضافية اختيارية
                </span>
              </div>

            </div>

            <div className="textarea-wrapper">

              <FileText size={17} />

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                placeholder="اكتب أي ملاحظات عن الموعد..."
                rows={3}
              />

            </div>

          </div>

          {/* =========================
              SECURITY
          ========================= */}

          <div className="appointment-security">

            <ShieldCheck size={18} />

            <div>
              <strong>بيانات الموعد محمية</strong>

              <span>
                سيتم حفظ بيانات المريض والموعد داخل النظام بشكل آمن
              </span>
            </div>

          </div>

          {/* =========================
              FOOTER
          ========================= */}

          <div className="appointment-modal-footer">

            <button
              type="button"
              onClick={onClose}
              className="cancel-appointment"
            >
              <X size={16} />
              إلغاء
            </button>

            <button
              type="submit"
              className="save-appointment"
            >
              <Plus size={18} />
              حجز الموعد
            </button>

          </div>

        </form>

      </div>

      {/* =========================
          STYLES
      ========================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        .appointment-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .appointment-modal-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 4, 9, 0.78);
          backdrop-filter: blur(10px);
        }

        /* =========================
           MODAL
        ========================= */

        .appointment-modal {
          position: relative;
          z-index: 2;
          width: min(720px, 100%);
          max-height: 94vh;
          overflow-y: auto;

          border-radius: 24px;

          background:
            radial-gradient(
              circle at 85% 0%,
              rgba(0, 190, 255, 0.10),
              transparent 27%
            ),
            radial-gradient(
              circle at 5% 80%,
              rgba(80, 75, 255, 0.07),
              transparent 25%
            ),
            linear-gradient(
              145deg,
              rgba(8, 25, 36, 0.99),
              rgba(2, 10, 17, 0.99)
            );

          border: 1px solid rgba(70, 205, 245, 0.14);

          box-shadow:
            0 35px 100px rgba(0, 0, 0, 0.6),
            0 0 80px rgba(0, 170, 230, 0.06),
            inset 0 1px 0 rgba(255,255,255,0.035);

          color: #eafaff;

          scrollbar-width: thin;
          scrollbar-color: rgba(57, 207, 245, 0.25) transparent;
        }

        .appointment-modal::-webkit-scrollbar {
          width: 5px;
        }

        .appointment-modal::-webkit-scrollbar-track {
          background: transparent;
        }

        .appointment-modal::-webkit-scrollbar-thumb {
          background: rgba(58, 205, 243, 0.25);
          border-radius: 10px;
        }

        /* =========================
           HEADER
        ========================= */

        .appointment-modal-header {
          padding: 22px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          border-bottom: 1px solid rgba(255,255,255,0.055);

          background:
            linear-gradient(
              90deg,
              rgba(5, 24, 34, 0.7),
              rgba(7, 20, 29, 0.3)
            );
        }

        .appointment-title-wrapper {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .appointment-main-icon {
          width: 47px;
          height: 47px;
          flex-shrink: 0;

          display: grid;
          place-items: center;

          border-radius: 14px;

          color: #48dcff;

          background:
            linear-gradient(
              135deg,
              rgba(37, 207, 250, 0.17),
              rgba(43, 83, 255, 0.08)
            );

          border: 1px solid rgba(67, 213, 250, 0.17);

          box-shadow:
            0 0 25px rgba(30, 200, 245, 0.08),
            inset 0 0 15px rgba(30, 200, 245, 0.04);
        }

        .appointment-eyebrow {
          display: flex;
          align-items: center;
          gap: 5px;

          color: #43c8e9;

          font-size: 7px;
          letter-spacing: 1.7px;

          margin-bottom: 4px;
        }

        .appointment-eyebrow svg {
          filter: drop-shadow(
            0 0 6px rgba(61,214,255,.7)
          );
        }

        .appointment-modal-header h2 {
          margin: 0;

          color: #e9f8fc;

          font-size: 18px;
          font-weight: 750;
        }

        .appointment-modal-header p {
          margin: 4px 0 0;

          color: #5e7e89;

          font-size: 9px;
        }

        .appointment-close {
          width: 37px;
          height: 37px;

          display: grid;
          place-items: center;

          border-radius: 11px;

          border: 1px solid rgba(255,255,255,0.065);

          background: rgba(255,255,255,0.025);

          color: #66828d;

          cursor: pointer;

          transition: .2s ease;
        }

        .appointment-close:hover {
          color: #ff7884;

          border-color:
            rgba(255,80,100,.2);

          background:
            rgba(255,70,90,.06);

          transform: rotate(3deg);
        }

        /* =========================
           SYSTEM STATUS
        ========================= */

        .appointment-system-status {
          margin: 18px 24px 5px;

          padding: 11px 13px;

          display: flex;
          align-items: center;
          gap: 10px;

          border-radius: 13px;

          border: 1px solid
            rgba(59,214,157,.09);

          background:
            rgba(45,190,133,.035);
        }

        .system-status-icon {
          width: 31px;
          height: 31px;

          display: grid;
          place-items: center;

          border-radius: 9px;

          color: #4ee39d;

          background:
            rgba(51,218,143,.08);
        }

        .appointment-system-status > div:nth-child(2) {
          flex: 1;
        }

        .appointment-system-status strong {
          display: block;

          color: #a9dfc4;

          font-size: 9px;
        }

        .appointment-system-status span {
          display: block;

          color: #527269;

          font-size: 7px;

          margin-top: 3px;
        }

        .system-online {
          display: flex;
          align-items: center;
          gap: 6px;

          color: #56d99b !important;

          font-size: 7px !important;

          letter-spacing: 1px;

          padding: 5px 8px;

          border-radius: 20px;

          border: 1px solid
            rgba(69,218,145,.1);

          background:
            rgba(69,218,145,.04);
        }

        .system-online span {
          width: 5px !important;
          height: 5px !important;

          padding: 0 !important;

          border-radius: 50%;

          background: #45df8b;

          box-shadow:
            0 0 8px #45df8b;
        }

        /* =========================
           FORM
        ========================= */

        .appointment-form {
          padding: 15px 24px 23px;
        }

        .form-section {
          margin-top: 16px;
        }

        .form-section:first-child {
          margin-top: 8px;
        }

        .form-section-header {
          display: flex;
          align-items: center;
          gap: 9px;

          margin-bottom: 10px;
        }

        .section-icon {
          width: 32px;
          height: 32px;

          flex-shrink: 0;

          display: grid;
          place-items: center;

          border-radius: 9px;

          color: #42d8ff;

          background:
            rgba(37,200,242,.075);

          border: 1px solid
            rgba(57,205,245,.08);
        }

        .section-icon.cyan {
          color: #4ce5d3;

          background:
            rgba(53,219,194,.065);

          border-color:
            rgba(53,219,194,.08);
        }

        .section-icon.purple {
          color: #aa83ff;

          background:
            rgba(155,105,255,.07);

          border-color:
            rgba(155,105,255,.08);
        }

        .section-icon.green {
          color: #4de29a;

          background:
            rgba(59,216,137,.065);

          border-color:
            rgba(59,216,137,.08);
        }

        .form-section-header h3 {
          margin: 0;

          color: #cce7ed;

          font-size: 11px;
        }

        .form-section-header span {
          display: block;

          color: #526f7a;

          font-size: 7px;

          margin-top: 3px;
        }

        .form-grid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 11px;
        }

        .form-field label {
          display: block;

          margin-bottom: 6px;

          color: #78949e;

          font-size: 8px;
        }

        .form-field label span {
          color: #45d7ff;
          margin-right: 3px;
        }

        /* =========================
           INPUT
        ========================= */

        .input-wrapper {
          height: 43px;

          display: flex;
          align-items: center;

          gap: 9px;

          padding: 0 12px;

          border-radius: 11px;

          background:
            rgba(3,14,22,.75);

          border: 1px solid
            rgba(103,187,213,.09);

          transition: .2s ease;
        }

        .input-wrapper svg {
          flex-shrink: 0;

          color: #4b7b8a;
        }

        .input-wrapper:focus-within {
          border-color:
            rgba(52,211,250,.34);

          background:
            rgba(5,22,31,.9);

          box-shadow:
            0 0 0 3px
            rgba(42,202,245,.045),
            0 0 22px
            rgba(42,202,245,.055);
        }

        .input-wrapper:focus-within svg {
          color: #43d7ff;

          filter:
            drop-shadow(
              0 0 5px
              rgba(60,216,255,.45)
            );
        }

        .input-wrapper input {
          width: 100%;

          border: 0;
          outline: 0;

          background: transparent;

          color: #dceff4;

          font-family: inherit;

          font-size: 10px;
        }

        .input-wrapper input::placeholder {
          color: #45606b;
        }

        .input-wrapper input::-webkit-calendar-picker-indicator {
          filter:
            invert(70%)
            sepia(30%)
            saturate(700%)
            hue-rotate(160deg);

          opacity: .6;

          cursor: pointer;
        }

        /* =========================
           SELECT
        ========================= */

        .service-wrapper {
          height: 44px;

          display: flex;
          align-items: center;

          gap: 9px;

          padding: 0 12px;

          border-radius: 11px;

          background:
            rgba(3,14,22,.75);

          border: 1px solid
            rgba(103,187,213,.09);

          transition: .2s ease;
        }

        .service-wrapper svg {
          flex-shrink: 0;

          color: #8e70dd;
        }

        .service-wrapper:focus-within {
          border-color:
            rgba(155,105,255,.28);

          box-shadow:
            0 0 0 3px
            rgba(155,105,255,.04);
        }

        .service-wrapper select {
          width: 100%;

          height: 100%;

          border: 0;
          outline: 0;

          background: transparent;

          color: #c9e3e9;

          font-family: inherit;

          font-size: 10px;

          cursor: pointer;
        }

        .service-wrapper select option {
          background: #081721;
          color: #d9eef3;
        }

        /* =========================
           TEXTAREA
        ========================= */

        .textarea-wrapper {
          min-height: 85px;

          display: flex;
          align-items: flex-start;

          gap: 9px;

          padding: 11px 12px;

          border-radius: 11px;

          background:
            rgba(3,14,22,.75);

          border: 1px solid
            rgba(103,187,213,.09);

          transition: .2s ease;
        }

        .textarea-wrapper svg {
          flex-shrink: 0;

          color: #4a8290;

          margin-top: 2px;
        }

        .textarea-wrapper:focus-within {
          border-color:
            rgba(62,210,250,.3);

          box-shadow:
            0 0 0 3px
            rgba(42,202,245,.04);
        }

        .textarea-wrapper textarea {
          width: 100%;

          min-height: 60px;

          resize: vertical;

          border: 0;
          outline: 0;

          background: transparent;

          color: #dceff4;

          font-family: inherit;

          font-size: 10px;

          line-height: 1.7;
        }

        .textarea-wrapper textarea::placeholder {
          color: #45606b;
        }

        /* =========================
           SECURITY
        ========================= */

        .appointment-security {
          margin-top: 17px;

          display: flex;
          align-items: center;

          gap: 9px;

          padding: 10px 12px;

          border-radius: 11px;

          background:
            linear-gradient(
              90deg,
              rgba(44,214,143,.035),
              rgba(44,214,143,.015)
            );

          border: 1px solid
            rgba(54,214,143,.07);

          color: #4cdb98;
        }

        .appointment-security > div {
          flex: 1;
        }

        .appointment-security strong {
          display: block;

          color: #9cdabb;

          font-size: 8px;
        }

        .appointment-security span {
          display: block;

          color: #506f64;

          font-size: 7px;

          margin-top: 3px;
        }

        /* =========================
           FOOTER
        ========================= */

        .appointment-modal-footer {
          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 9px;

          margin-top: 18px;

          padding-top: 17px;

          border-top: 1px solid
            rgba(255,255,255,.05);
        }

        .cancel-appointment,
        .save-appointment {
          height: 40px;

          padding: 0 17px;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 7px;

          border-radius: 10px;

          font-family: inherit;

          font-size: 9px;

          font-weight: 650;

          cursor: pointer;

          transition: .2s ease;
        }

        .cancel-appointment {
          color: #77909a;

          background:
            rgba(255,255,255,.025);

          border: 1px solid
            rgba(255,255,255,.07);
        }

        .cancel-appointment:hover {
          color: #b9d1d8;

          background:
            rgba(255,255,255,.05);
        }

        .save-appointment {
          min-width: 145px;

          color: #031117;

          border: 0;

          background:
            linear-gradient(
              135deg,
              #55dfff,
              #22bfe9
            );

          box-shadow:
            0 8px 25px
            rgba(34,191,233,.16);
        }

        .save-appointment:hover {
          transform: translateY(-1px);

          box-shadow:
            0 12px 32px
            rgba(34,191,233,.27);
        }

        .save-appointment:active {
          transform: translateY(0);
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 650px) {

          .appointment-modal-overlay {
            padding: 10px;
          }

          .appointment-modal {
            max-height: 96vh;

            border-radius: 19px;
          }

          .appointment-modal-header {
            padding: 17px;
          }

          .appointment-main-icon {
            width: 42px;
            height: 42px;
          }

          .appointment-modal-header h2 {
            font-size: 16px;
          }

          .appointment-system-status {
            margin:
              13px 17px 4px;
          }

          .appointment-form {
            padding:
              12px 17px 18px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .system-online {
            display: none;
          }

          .appointment-modal-footer {
            position: sticky;
            bottom: 0;

            background:
              rgba(4,13,21,.96);

            margin-left: -17px;
            margin-right: -17px;

            padding:
              13px 17px;

            margin-top: 15px;
          }

          .cancel-appointment,
          .save-appointment {
            flex: 1;
          }
        }

      `}</style>
    </div>
  );
}