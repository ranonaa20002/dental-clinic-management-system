import { useEffect, useState } from "react";

import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Search,
  Plus,
  LayoutGrid,
  List,
  CalendarDays,
  Clock3,
  UserRound,
  Phone,
  Mail,
  Stethoscope,
  Trash2,
  Pencil,
  MessageCircle,
  ChevronDown,
  Sparkles,
  X,
  ShieldCheck,
} from "lucide-react";

import AppointmentTable from "./AppointmentTable";
import AddAppointmentModal from "./AddAppointmentModal";
import AppointmentCard from "./AppointmentCard";
import EditAppointmentModal from "./EditAppointmentModal";
import AppointmentCalendar from "./AppointmentCalendar";

export default function Appointment() {
  /* =========================================================
     LANGUAGE
  ========================================================= */

  const [lang, setLang] = useState(
    () => localStorage.getItem("clinic_lang") || "en"
  );

  /* =========================================================
     STATES
  ========================================================= */

  const [notification, setNotification] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("cards");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  /* =========================================================
     LANGUAGE LISTENER
  ========================================================= */

  useEffect(() => {
    const handleStorageChange = () => {
      setLang(localStorage.getItem("clinic_lang") || "en");
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      const currentLang =
        localStorage.getItem("clinic_lang") || "en";

      if (currentLang !== lang) {
        setLang(currentLang);
      }
    }, 300);

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );

      clearInterval(interval);
    };
  }, [lang]);

  /* =========================================================
     DEFAULT DATA
  ========================================================= */

  const defaultAppointmentsAr = [
    {
      id: 1,
      name: "رنا حسن",
      email: "rana@example.com",
      phone: "01099342368",
      date: "2026-07-20",
      time: "09:00",
      service: "فحص الأسنان",
      notes: "",
      status: "confirmed",
    },

    {
      id: 2,
      name: "أحمد علي",
      email: "ahmed@example.com",
      phone: "01122334455",
      date: "2026-07-21",
      time: "10:30",
      service: "حشو عصب",
      notes: "",
      status: "waiting",
    },

    {
      id: 3,
      name: "محمد سامي",
      email: "mohamed@example.com",
      phone: "01233445566",
      date: "2026-07-22",
      time: "14:30",
      service: "تنظيف الأسنان",
      notes: "",
      status: "pending",
    },
  ];

  const defaultAppointmentsEn = [
    {
      id: 1,
      name: "Rana Hassan",
      email: "rana@example.com",
      phone: "01099342368",
      date: "2026-07-20",
      time: "09:00",
      service: "Dental Checkup",
      notes: "",
      status: "confirmed",
    },

    {
      id: 2,
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      phone: "01122334455",
      date: "2026-07-21",
      time: "10:30",
      service: "Root Canal",
      notes: "",
      status: "waiting",
    },

    {
      id: 3,
      name: "Mohamed Samy",
      email: "mohamed@example.com",
      phone: "01233445566",
      date: "2026-07-22",
      time: "14:30",
      service: "Dental Cleaning",
      notes: "",
      status: "pending",
    },
  ];

  /* =========================================================
     APPOINTMENTS
  ========================================================= */

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem(
      "clinic_appointments_data"
    );

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return localStorage.getItem("clinic_lang") === "ar"
      ? defaultAppointmentsAr
      : defaultAppointmentsEn;
  });

  useEffect(() => {
    localStorage.setItem(
      "clinic_appointments_data",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  /* =========================================================
     NOTIFICATION
  ========================================================= */

  const showNotification = (message, duration = 3500) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, duration);
  };

  /* =========================================================
     ADD APPOINTMENT
  ========================================================= */

  const handleAddAppointment = (newAppointment) => {
    const appointmentExists = appointments.some(
      (appointment) =>
        appointment.date === newAppointment.date &&
        appointment.time === newAppointment.time
    );

    if (appointmentExists) {
      showNotification(
        lang === "ar"
          ? "هذا الموعد محجوز بالفعل، اختاري وقتًا آخر."
          : "This time slot is already booked. Please choose another time."
      );

      return false;
    }

    const appointmentToAdd = {
      ...newAppointment,
      id: Date.now(),
      status: "confirmed",
    };

    setAppointments((prev) => [
      ...prev,
      appointmentToAdd,
    ]);

    showNotification(
      lang === "ar"
        ? "تم حجز الموعد بنجاح!"
        : "Appointment added successfully!"
    );

    return true;
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete = (id) => {
    setAppointments((prev) =>
      prev.filter(
        (appointment) => appointment.id !== id
      )
    );

    showNotification(
      lang === "ar"
        ? "تم حذف الموعد بنجاح!"
        : "Appointment deleted successfully!",
      3000
    );
  };

  /* =========================================================
     REMINDER
  ========================================================= */

  const handleSendReminder = (patientName) => {
    const message =
      lang === "ar"
        ? `تم إرسال تذكير الموعد بنجاح إلى المريض (${patientName})!`
        : `Appointment reminder successfully sent to (${patientName})!`;

    showNotification(message);
  };

  /* =========================================================
     EDIT
  ========================================================= */

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  /* =========================================================
     UPDATE
  ========================================================= */

  const handleUpdateAppointment = (updatedAppointment) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
      )
    );

    showNotification(
      lang === "ar"
        ? "تم تعديل الموعد بنجاح!"
        : "Appointment updated successfully!"
    );

    setIsEditModalOpen(false);
    setSelectedAppointment(null);
  };

  /* =========================================================
     STATUS
  ========================================================= */

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id
          ? {
              ...appointment,
              status: newStatus,
            }
          : appointment
      )
    );

    const statusMessages = {
      confirmed:
        lang === "ar"
          ? "تم تأكيد الموعد"
          : "Appointment confirmed",

      waiting:
        lang === "ar"
          ? "تم تغيير الحالة إلى في الانتظار"
          : "Appointment is now waiting",

      completed:
        lang === "ar"
          ? "تم تسجيل حضور المريض"
          : "Patient marked as completed",

      cancelled:
        lang === "ar"
          ? "تم إلغاء الموعد"
          : "Appointment cancelled",

      "no-show":
        lang === "ar"
          ? "تم تسجيل أن المريض لم يحضر"
          : "Patient marked as no-show",

      pending:
        lang === "ar"
          ? "تم تغيير حالة الموعد إلى جديد"
          : "Appointment marked as new",
    };

    showNotification(
      statusMessages[newStatus] ||
        (lang === "ar"
          ? "تم تحديث حالة الموعد"
          : "Appointment status updated"),
      3000
    );
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const filteredAppointments = appointments.filter(
    (item) => {
      const name =
        item.name?.toLowerCase() || "";

      const phone =
        item.phone?.toLowerCase() || "";

      const service =
        item.service?.toLowerCase() || "";

      const email =
        item.email?.toLowerCase() || "";

      const search =
        searchTerm.toLowerCase().trim();

      return (
        name.includes(search) ||
        phone.includes(search) ||
        service.includes(search) ||
        email.includes(search)
      );
    }
  );

  /* =========================================================
     TRANSLATIONS
  ========================================================= */

  const t = {
    ar: {
      title: "إدارة المواعيد والأيام",

      subtitle:
        "إضافة وتحديد المواعيد لكل يوم بدقة وإرسال التذكيرات",

      addButton: "حجز موعد",

      searchPlaceholder:
        "بحث بالاسم، رقم الهاتف، أو الخدمة...",

      noData:
        "لا توجد مواعيد مسجلة حالياً.",

      noSearchResults:
        "لا توجد نتائج مطابقة لعملية البحث.",

      cards: "بطاقات",

      table: "جدول",

      calendar: "تقويم",

      appointments: "موعد",

      secure: "نظام آمن",

      protected:
        "بيانات المرضى محمية",

      patientPortal: "Patient Portal",

      doctor: "طبيب أسنان",

      online: "ONLINE",

      welcome:
        "إدارة مواعيد العيادة",

      newAppointment:
        "ابدئي بحجز موعد جديد للمريض",

      today: "اليوم",

      total: "إجمالي المواعيد",

      confirmed: "مؤكد",

      waiting: "في الانتظار",
    },

    en: {
      title: "Appointments & Schedule Management",

      subtitle:
        "Add and schedule appointments accurately and send reminders",

      addButton: "Add Appointment",

      searchPlaceholder:
        "Search by name, phone, or service...",

      noData:
        "No appointments registered yet.",

      noSearchResults:
        "No matching appointments found.",

      cards: "Cards",

      table: "Table",

      calendar: "Calendar",

      appointments: "Appointments",

      secure: "Secure System",

      protected:
        "Patient data is protected",

      patientPortal: "Patient Portal",

      doctor: "Dental Doctor",

      online: "ONLINE",

      welcome:
        "Clinic Appointment Management",

      newAppointment:
        "Start by booking a new patient appointment",

      today: "Today",

      total: "Total Appointments",

      confirmed: "Confirmed",

      waiting: "Waiting",
    },
  };

  const currentText = t[lang];

  /* =========================================================
     STATS
  ========================================================= */

  const confirmedCount = appointments.filter(
    (item) => item.status === "confirmed"
  ).length;

  const waitingCount = appointments.filter(
    (item) =>
      item.status === "waiting" ||
      item.status === "pending"
  ).length;

  /* =========================================================
     UI
  ========================================================= */

  return (
    <>
      <style>{`
        .appointments-page {
          min-height: calc(100vh - 20px);
          position: relative;
          overflow: hidden;
          color: #e8f6ff;
          background:
            radial-gradient(
              circle at 15% 10%,
              rgba(0, 183, 255, .09),
              transparent 28%
            ),
            radial-gradient(
              circle at 90% 80%,
              rgba(0, 229, 255, .055),
              transparent 25%
            ),
            #020812;
          border-radius: 26px;
          padding: 26px;
        }

        .appointments-page::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .22;
          background-image:
            linear-gradient(
              rgba(0, 174, 255, .045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 174, 255, .045) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
          mask-image: linear-gradient(
            to bottom,
            black,
            transparent 95%
          );
        }

        .appointments-content {
          position: relative;
          z-index: 2;
          max-width: 1500px;
          margin: auto;
        }

        .glass-panel {
          background:
            linear-gradient(
              145deg,
              rgba(7, 23, 42, .92),
              rgba(2, 12, 25, .94)
            );
          border: 1px solid rgba(61, 181, 255, .20);
          box-shadow:
            0 20px 60px rgba(0,0,0,.28),
            inset 0 1px 0 rgba(255,255,255,.025);
          backdrop-filter: blur(18px);
        }

        .header-panel {
          border-radius: 25px;
          padding: 24px 26px;
        }

        .header-icon {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 17px;
          color: #21d9ff;
          border: 1px solid rgba(20, 206, 255, .38);
          background:
            linear-gradient(
              145deg,
              rgba(0, 187, 255, .17),
              rgba(0, 79, 150, .08)
            );
          box-shadow:
            0 0 30px rgba(0, 188, 255, .10);
        }

        .main-title {
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.15;
          font-weight: 900;
          letter-spacing: -.5px;
          color: #f4fbff;
        }

        .main-subtitle {
          color: #7892aa;
          margin-top: 7px;
          font-size: 14px;
        }

        .add-button {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(76, 219, 255, .48);
          background:
            linear-gradient(
              135deg,
              #08bce9,
              #1478d8
            );
          color: white;
          border-radius: 14px;
          padding: 13px 20px;
          font-weight: 800;
          box-shadow:
            0 10px 35px rgba(0, 166, 255, .17);
          transition: .25s ease;
        }

        .add-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 14px 40px rgba(0, 194, 255, .27);
        }

        .add-button::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 70px;
          transform: skewX(-20deg);
          background: rgba(255,255,255,.14);
          left: -100px;
          transition: .6s;
        }

        .add-button:hover::after {
          left: 130%;
        }

        .success-panel {
          border-radius: 18px;
          padding: 16px 19px;
          display: flex;
          align-items: center;
          gap: 15px;
          background:
            linear-gradient(
              90deg,
              rgba(0, 255, 170, .055),
              rgba(0, 255, 170, .018)
            );
          border: 1px solid rgba(29, 230, 159, .28);
          animation: successIn .3s ease;
        }

        @keyframes successIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .success-icon {
          width: 42px;
          height: 42px;
          min-width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #29e8ad;
          background: rgba(29,230,159,.09);
          border: 1px solid rgba(29,230,159,.3);
          box-shadow:
            0 0 25px rgba(29,230,159,.12);
        }

        .success-title {
          color: #32e8af;
          font-weight: 800;
          font-size: 14px;
        }

        .success-text {
          color: #718ba1;
          font-size: 12px;
          margin-top: 3px;
        }

        .toolbar {
          border-radius: 20px;
          padding: 12px;
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 180px;
          height: 50px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          border-radius: 13px;
          background: rgba(0, 8, 19, .50);
          border: 1px solid rgba(68, 152, 204, .18);
          transition: .25s;
        }

        .search-box:focus-within {
          border-color: rgba(23, 205, 255, .5);
          box-shadow:
            0 0 0 3px rgba(0, 196, 255, .055);
        }

        .search-box input {
          width: 100%;
          background: transparent;
          outline: none;
          color: #dff7ff;
          border: 0;
          font-size: 13px;
        }

        .search-box input::placeholder {
          color: #526b80;
        }

        .view-switcher {
          display: flex;
          gap: 3px;
          padding: 4px;
          border-radius: 13px;
          background: rgba(0, 7, 16, .7);
          border: 1px solid rgba(67, 150, 207, .15);
        }

        .view-button {
          height: 40px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0 13px;
          border-radius: 9px;
          border: 1px solid transparent;
          background: transparent;
          color: #6e879c;
          font-size: 12px;
          font-weight: 800;
          transition: .2s;
        }

        .view-button:hover {
          color: #b9eaff;
        }

        .view-button.active {
          color: #36d8ff;
          background:
            linear-gradient(
              135deg,
              rgba(0, 187, 255, .13),
              rgba(0, 87, 167, .09)
            );
          border-color: rgba(0, 200, 255, .28);
          box-shadow:
            0 0 20px rgba(0, 184, 255, .06);
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 13px;
        }

        .stat-card {
          min-height: 88px;
          border-radius: 17px;
          padding: 15px 17px;
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .stat-icon {
          width: 43px;
          height: 43px;
          min-width: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          color: #28d8ff;
          background: rgba(0, 180, 255, .07);
          border: 1px solid rgba(0, 198, 255, .20);
        }

        .stat-label {
          color: #6f899e;
          font-size: 11px;
          font-weight: 700;
        }

        .stat-value {
          color: #effaff;
          font-size: 22px;
          font-weight: 900;
          margin-top: 2px;
        }

        .appointment-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
        }

        .appointment-card {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          padding: 18px;
          min-height: 285px;
          background:
            radial-gradient(
              circle at 85% 5%,
              rgba(0, 200, 255, .07),
              transparent 25%
            ),
            linear-gradient(
              145deg,
              rgba(7, 25, 45, .95),
              rgba(2, 11, 23, .98)
            );
          border: 1px solid rgba(54, 171, 232, .19);
          box-shadow:
            0 16px 40px rgba(0,0,0,.18);
          transition: .25s ease;
        }

        .appointment-card:hover {
          transform: translateY(-3px);
          border-color: rgba(31, 204, 255, .36);
          box-shadow:
            0 20px 50px rgba(0,0,0,.25),
            0 0 30px rgba(0, 190, 255, .055);
        }

        .appointment-card::before {
          content: "";
          position: absolute;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          right: -70px;
          top: -75px;
          border: 1px solid rgba(0,200,255,.12);
          box-shadow:
            0 0 0 12px rgba(0,200,255,.018),
            0 0 0 25px rgba(0,200,255,.012);
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .date-box {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .date-icon {
          width: 39px;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 11px;
          color: #26d8ff;
          border: 1px solid rgba(30, 198, 255, .24);
          background: rgba(0, 168, 255, .07);
        }

        .time-text {
          color: #f1faff;
          font-size: 14px;
          font-weight: 900;
        }

        .date-text {
          color: #68849b;
          font-size: 11px;
          margin-top: 3px;
        }

        .status-pill {
          border-radius: 999px;
          padding: 6px 10px;
          font-size: 10px;
          font-weight: 900;
          border: 1px solid;
          white-space: nowrap;
        }

        .status-confirmed {
          color: #32e6ac;
          background: rgba(31, 226, 161, .07);
          border-color: rgba(31, 226, 161, .27);
        }

        .status-waiting {
          color: #ffc83d;
          background: rgba(255, 188, 43, .07);
          border-color: rgba(255, 188, 43, .27);
        }

        .status-pending {
          color: #37c8ff;
          background: rgba(0, 181, 255, .07);
          border-color: rgba(0, 181, 255, .27);
        }

        .status-completed {
          color: #8c8cff;
          background: rgba(126, 105, 255, .08);
          border-color: rgba(126, 105, 255, .27);
        }

        .status-cancelled,
        .status-no-show {
          color: #ff6d79;
          background: rgba(255, 70, 90, .07);
          border-color: rgba(255, 70, 90, .25);
        }

        .patient-section {
          margin-top: 24px;
        }

        .patient-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2bddff;
          background:
            linear-gradient(
              145deg,
              rgba(0, 194, 255, .13),
              rgba(0, 69, 133, .10)
            );
          border: 1px solid rgba(24, 207, 255, .3);
          box-shadow:
            0 0 20px rgba(0, 196, 255, .07);
        }

        .patient-name {
          color: #f4fbff;
          font-size: 18px;
          font-weight: 900;
        }

        .service-line {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a1b7c8;
          font-size: 12px;
          margin-top: 6px;
        }

        .service-icon {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          color: #36dcff;
          background: rgba(0, 191, 255, .08);
          border: 1px solid rgba(0, 191, 255, .18);
        }

        .contact-info {
          margin-top: 16px;
          padding-top: 13px;
          border-top: 1px solid rgba(78, 154, 199, .13);
          display: grid;
          gap: 8px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #728ba0;
          font-size: 11px;
        }

        .contact-row svg {
          color: #43cfff;
        }

        .card-actions {
          margin-top: 15px;
          padding-top: 12px;
          border-top: 1px solid rgba(78, 154, 199, .13);
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .action-button {
          width: 37px;
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          background: rgba(0, 8, 17, .5);
          border: 1px solid rgba(77, 157, 205, .18);
          color: #7893a7;
          transition: .2s;
        }

        .action-button:hover {
          transform: translateY(-2px);
        }

        .action-delete:hover {
          color: #ff6674;
          border-color: rgba(255, 76, 91, .4);
          background: rgba(255, 55, 72, .07);
        }

        .action-edit:hover {
          color: #2fd8ff;
          border-color: rgba(25, 205, 255, .4);
          background: rgba(0, 186, 255, .07);
        }

        .action-whatsapp:hover {
          color: #35e6a3;
          border-color: rgba(32, 225, 158, .4);
          background: rgba(32, 225, 158, .07);
        }

        .status-select {
          flex: 1;
          height: 37px;
          padding: 0 9px;
          color: #34d9ff;
          background: rgba(0, 10, 20, .6);
          border: 1px solid rgba(0, 193, 255, .24);
          border-radius: 9px;
          outline: none;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
        }

        .empty-state {
          min-height: 210px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 30px;
        }

        .empty-icon {
          width: 68px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 19px;
          color: #27d8ff;
          border: 1px solid rgba(25, 202, 255, .25);
          background: rgba(0, 190, 255, .055);
          box-shadow:
            0 0 35px rgba(0, 192, 255, .08);
          margin-bottom: 16px;
        }

        .empty-title {
          color: #dff6ff;
          font-size: 17px;
          font-weight: 900;
        }

        .empty-text {
          color: #617c91;
          font-size: 12px;
          margin-top: 6px;
        }

        .secure-bar {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #587286;
          font-size: 10px;
          margin-top: 18px;
          padding: 10px 13px;
          width: fit-content;
          border-radius: 10px;
          border: 1px solid rgba(57, 147, 196, .12);
          background: rgba(0, 10, 20, .35);
        }

        .secure-bar svg {
          color: #22e5b0;
        }

        @media (max-width: 1100px) {
          .appointment-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 800px) {
          .appointments-page {
            padding: 15px;
            border-radius: 18px;
          }

          .header-panel {
            padding: 19px;
          }

          .header-panel > div {
            flex-direction: column;
            align-items: stretch !important;
          }

          .add-button {
            width: 100%;
            justify-content: center;
          }

          .toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .view-switcher {
            justify-content: stretch;
          }

          .view-button {
            flex: 1;
            justify-content: center;
          }

          .stats-row {
            grid-template-columns: 1fr;
          }

          .appointment-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 500px) {
          .main-title {
            font-size: 22px;
          }

          .main-subtitle {
            font-size: 11px;
          }

          .view-button span {
            display: none;
          }

          .appointment-card {
            padding: 15px;
          }
        }
      `}</style>

      <div
        className="appointments-page"
        dir={lang === "ar" ? "rtl" : "ltr"}
      >
        <div className="appointments-content">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="glass-panel header-panel">
            <div className="flex items-center justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="header-icon">
                  <CalendarIcon size={29} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={15}
                      className="text-cyan-400"
                    />

                    <span className="text-[10px] font-black tracking-[2px] text-cyan-400 uppercase">
                      {currentText.welcome}
                    </span>
                  </div>

                  <h1 className="main-title">
                    {currentText.title}
                  </h1>

                  <p className="main-subtitle">
                    {currentText.subtitle}
                  </p>
                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setIsAddModalOpen(true)
                }
                className="add-button flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={19} />

                {currentText.addButton}
              </button>

            </div>
          </div>

          {/* =================================================
              NOTIFICATION
          ================================================= */}

          {notification && (
            <div className="success-panel mt-4">

              <div className="success-icon">
                <CheckCircle2 size={22} />
              </div>

              <div className="flex-1">

                <div className="success-title">
                  {notification}
                </div>

                <div className="success-text">
                  {lang === "ar"
                    ? "تم تحديث جدول المواعيد بنجاح"
                    : "Your appointment schedule has been updated successfully"}
                </div>

              </div>

              <button
                type="button"
                onClick={() => setNotification("")}
                className="text-cyan-300/60 hover:text-cyan-200 cursor-pointer"
              >
                <X size={18} />
              </button>

            </div>
          )}

          {/* =================================================
              STATS
          ================================================= */}

          {appointments.length > 0 && (
            <div className="stats-row mt-4">

              <div className="glass-panel stat-card">
                <div className="stat-icon">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <div className="stat-label">
                    {currentText.total}
                  </div>

                  <div className="stat-value">
                    {appointments.length}
                  </div>
                </div>
              </div>

              <div className="glass-panel stat-card">
                <div
                  className="stat-icon"
                  style={{
                    color: "#35e6ac",
                    borderColor:
                      "rgba(53,230,172,.2)",
                  }}
                >
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <div className="stat-label">
                    {currentText.confirmed}
                  </div>

                  <div className="stat-value">
                    {confirmedCount}
                  </div>
                </div>
              </div>

              <div className="glass-panel stat-card">
                <div
                  className="stat-icon"
                  style={{
                    color: "#ffc83d",
                    borderColor:
                      "rgba(255,200,61,.2)",
                  }}
                >
                  <Clock3 size={20} />
                </div>

                <div>
                  <div className="stat-label">
                    {currentText.waiting}
                  </div>

                  <div className="stat-value">
                    {waitingCount}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =================================================
              SEARCH + VIEW
          ================================================= */}

          {appointments.length > 0 && (
            <div className="glass-panel toolbar mt-4">

              <div className="search-box">

                <Search
                  size={19}
                  className="text-cyan-400/60 shrink-0"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  placeholder={
                    currentText.searchPlaceholder
                  }
                />

              </div>

              <div className="view-switcher">

                <button
                  type="button"
                  onClick={() =>
                    setViewMode("cards")
                  }
                  className={`view-button ${
                    viewMode === "cards"
                      ? "active"
                      : ""
                  }`}
                >
                  <LayoutGrid size={16} />

                  <span>
                    {currentText.cards}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setViewMode("table")
                  }
                  className={`view-button ${
                    viewMode === "table"
                      ? "active"
                      : ""
                  }`}
                >
                  <List size={16} />

                  <span>
                    {currentText.table}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setViewMode("calendar")
                  }
                  className={`view-button ${
                    viewMode === "calendar"
                      ? "active"
                      : ""
                  }`}
                >
                  <CalendarDays size={16} />

                  <span>
                    {currentText.calendar}
                  </span>
                </button>

              </div>
            </div>
          )}

          {/* =================================================
              EMPTY DATA
          ================================================= */}

          {appointments.length === 0 && (
            <div className="glass-panel empty-state mt-4">

              <div className="empty-icon">
                <CalendarIcon size={31} />
              </div>

              <div className="empty-title">
                {currentText.noData}
              </div>

              <div className="empty-text">
                {currentText.newAppointment}
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsAddModalOpen(true)
                }
                className="add-button mt-5 flex items-center gap-2 cursor-pointer"
              >
                <Plus size={17} />

                {currentText.addButton}
              </button>

            </div>
          )}

          {/* =================================================
              NO SEARCH RESULTS
          ================================================= */}

          {appointments.length > 0 &&
            filteredAppointments.length === 0 && (
              <div className="glass-panel empty-state mt-4">

                <div className="empty-icon">
                  <Search size={29} />
                </div>

                <div className="empty-title">
                  {currentText.noSearchResults}
                </div>

                <div className="empty-text">
                  {lang === "ar"
                    ? "جربي البحث باسم أو رقم هاتف مختلف"
                    : "Try searching with another name or phone number"}
                </div>

              </div>
            )}

          {/* =================================================
              CARDS
          ================================================= */}

          {appointments.length > 0 &&
            filteredAppointments.length > 0 &&
            viewMode === "cards" && (

              <div className="appointment-grid mt-4">

                {filteredAppointments.map((item) => (
                  <AppointmentCard
                    key={item.id}
                    appointment={item}
                    onDelete={handleDelete}
                    onReminder={handleSendReminder}
                    onEdit={handleEdit}
                    onStatusChange={
                      handleStatusChange
                    }
                  />
                ))}

              </div>
            )}

          {/* =================================================
              TABLE
          ================================================= */}

          {appointments.length > 0 &&
            filteredAppointments.length > 0 &&
            viewMode === "table" && (

              <div className="mt-4">
                <AppointmentTable
                  appointments={
                    filteredAppointments
                  }
                  onDelete={handleDelete}
                  onReminder={
                    handleSendReminder
                  }
                  onEdit={handleEdit}
                />
              </div>
            )}

          {/* =================================================
              CALENDAR
          ================================================= */}

          {appointments.length > 0 &&
            filteredAppointments.length > 0 &&
            viewMode === "calendar" && (

              <div className="mt-4">
                <AppointmentCalendar
                  appointments={
                    filteredAppointments
                  }
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              </div>
            )}

          {/* =================================================
              SECURE SYSTEM
          ================================================= */}

          <div className="secure-bar">
            <ShieldCheck size={15} />

            <span>
              {currentText.secure} ·{" "}
              {currentText.protected}
            </span>
          </div>

        </div>
      </div>

      {/* =====================================================
          ADD MODAL
      ===================================================== */}

      <AddAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() =>
          setIsAddModalOpen(false)
        }
        onAdd={handleAddAppointment}
      />

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onUpdate={handleUpdateAppointment}
      />
    </>
  );
}