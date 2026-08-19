import { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Search,
  Plus,
  LayoutGrid,
  List,
  CalendarDays,
} from "lucide-react";

import AppointmentTable from "./AppointmentTable";
import AddAppointmentModal from "./AddAppointmentModal";
import AppointmentCard from "./AppointmentCard";
import EditAppointmentModal from "./EditAppointmentModal";
import AppointmentCalendar from "./AppointmentCalendar";

export default function Appointment() {
  // =========================
  // Language
  // =========================

  const [lang, setLang] = useState(
    () => localStorage.getItem("clinic_lang") || "en"
  );

  const [notification, setNotification] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // =========================
  // View
  // =========================

  const [viewMode, setViewMode] = useState("cards");

  // =========================
  // Add Modal
  // =========================

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // =========================
  // Edit Modal
  // =========================

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // =========================
  // Language Sync
  // =========================

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
    }, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [lang]);

  // =========================
  // Default Appointments
  // =========================

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
  ];

  // =========================
  // Appointments State
  // =========================

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("clinic_appointments_data");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }

    return lang === "ar"
      ? defaultAppointmentsAr
      : defaultAppointmentsEn;
  });

  // =========================
  // Save Appointments
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "clinic_appointments_data",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  // =========================
  // Add Appointment
  // =========================

  const handleAddAppointment = (newAppointment) => {
    const appointmentExists = appointments.some(
      (appointment) =>
        appointment.date === newAppointment.date &&
        appointment.time === newAppointment.time
    );

    if (appointmentExists) {
      setNotification(
        lang === "ar"
          ? "هذا الموعد محجوز بالفعل، اختاري وقتًا آخر."
          : "This time slot is already booked. Please choose another time."
      );

      setTimeout(() => {
        setNotification("");
      }, 3500);

      return false;
    }

    const appointmentToAdd = {
      ...newAppointment,
      id: Date.now(),
      status: "confirmed",
    };

    setAppointments((prevAppointments) => [
      ...prevAppointments,
      appointmentToAdd,
    ]);

    setNotification(
      lang === "ar"
        ? "تم حجز الموعد بنجاح!"
        : "Appointment added successfully!"
    );

    setTimeout(() => {
      setNotification("");
    }, 3500);

    return true;
  };

  // =========================
  // Delete Appointment
  // =========================

  const handleDelete = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter(
        (appointment) => appointment.id !== id
      )
    );

    setNotification(
      lang === "ar"
        ? "تم حذف الموعد بنجاح!"
        : "Appointment deleted successfully!"
    );

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  // =========================
  // Send Reminder
  // =========================

  const handleSendReminder = (patientName) => {
    const message =
      lang === "ar"
        ? `تم إرسال تذكير الموعد بنجاح إلى المريض (${patientName})!`
        : `Appointment reminder successfully sent to (${patientName})!`;

    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 3500);
  };

  // =========================
  // Open Edit Modal
  // =========================

  const handleEdit = (appointment) => {
    setSelectedAppointment(appointment);
    setIsEditModalOpen(true);
  };

  // =========================
  // Update Appointment
  // =========================

  const handleUpdateAppointment = (updatedAppointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === updatedAppointment.id
          ? updatedAppointment
          : appointment
      )
    );

    setNotification(
      lang === "ar"
        ? "تم تعديل الموعد بنجاح!"
        : "Appointment updated successfully!"
    );

    setIsEditModalOpen(false);
    setSelectedAppointment(null);

    setTimeout(() => {
      setNotification("");
    }, 3500);
  };

  // =========================
  // Change Appointment Status
  // =========================

  const handleStatusChange = (id, newStatus) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
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
    };

    setNotification(statusMessages[newStatus]);

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  // =========================
  // Search
  // =========================

  const filteredAppointments = appointments.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const phone = item.phone || "";
    const service = item.service?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    return (
      name.includes(search) ||
      phone.includes(searchTerm) ||
      service.includes(search)
    );
  });

  // =========================
  // Translations
  // =========================

  const t = {
    ar: {
      title: "إدارة المواعيد والأيام",

      subtitle:
        "إضافة وتحديد المواعيد لكل يوم بدقة وإرسال التذكيرات",

      addButton: "حجز موعد",

      searchPlaceholder:
        "بحث بالاسم، رقم الهاتف، أو الخدمة...",

      noData: "لا توجد مواعيد مسجلة حالياً.",

      noSearchResults:
        "لا توجد نتائج مطابقة لعملية البحث.",

      cards: "بطاقات",

      table: "جدول",

      calendar: "تقويم",
    },

    en: {
      title: "Appointments & Schedule Management",

      subtitle:
        "Add and schedule appointments accurately and send reminders",

      addButton: "Add Appointment",

      searchPlaceholder:
        "Search by name, phone, or service...",

      noData: "No appointments registered yet.",

      noSearchResults:
        "No matching appointments found.",

      cards: "Cards",

      table: "Table",

      calendar: "Calendar",
    },
  };

  const currentText = t[lang];

  // =========================
  // UI
  // =========================

  return (
    <div
      key={lang}
      className={`space-y-6 ${
        lang === "ar" ? "text-right" : "text-left"
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      {/* =========================
          Header
      ========================= */}

      <div className="bg-white p-6 rounded-3xl shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CalendarIcon className="text-blue-600" />

              {currentText.title}
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              {currentText.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition cursor-pointer"
          >
            <Plus size={18} />

            {currentText.addButton}
          </button>
        </div>
      </div>

      {/* =========================
          Notification
      ========================= */}

      {notification && (
        <div className="bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 animate-pulse">
          <CheckCircle2 size={26} className="shrink-0" />

          <span className="font-bold text-base">
            {notification}
          </span>
        </div>
      )}

      {/* =========================
          Search + View Switcher
      ========================= */}

      {appointments.length > 0 && (
        <div className="bg-white p-4 rounded-3xl shadow-sm flex items-center justify-between gap-4">
          {/* Search */}

          <div className="flex items-center gap-3 flex-1">
            <Search size={20} className="text-gray-400" />

            <input
              type="text"
              placeholder={currentText.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none text-sm bg-transparent text-gray-700"
            />
          </div>

          {/* View Buttons */}

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {/* Cards */}

            <button
              type="button"
              onClick={() => setViewMode("cards")}
              className={`
                flex items-center gap-1.5
                px-3 py-2
                rounded-lg
                text-xs font-bold
                transition
                ${
                  viewMode === "cards"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
              title={currentText.cards}
            >
              <LayoutGrid size={15} />

              <span className="hidden md:block">
                {currentText.cards}
              </span>
            </button>

            {/* Table */}

            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`
                flex items-center gap-1.5
                px-3 py-2
                rounded-lg
                text-xs font-bold
                transition
                ${
                  viewMode === "table"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
              title={currentText.table}
            >
              <List size={15} />

              <span className="hidden md:block">
                {currentText.table}
              </span>
            </button>

            {/* Calendar */}

            <button
              type="button"
              onClick={() => setViewMode("calendar")}
              className={`
                flex items-center gap-1.5
                px-3 py-2
                rounded-lg
                text-xs font-bold
                transition
                ${
                  viewMode === "calendar"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }
              `}
              title={currentText.calendar}
            >
              <CalendarDays size={15} />

              <span className="hidden md:block">
                {currentText.calendar}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* =========================
          Content
      ========================= */}

      {appointments.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm py-16 text-center">
          <CalendarIcon
            size={45}
            className="mx-auto text-gray-200 mb-4"
          />

          <p className="text-gray-400">
            {currentText.noData}
          </p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm py-16 text-center">
          <Search
            size={45}
            className="mx-auto text-gray-200 mb-4"
          />

          <p className="text-gray-400">
            {currentText.noSearchResults}
          </p>
        </div>
      ) : (
        <>
          {/* =========================
              Cards
          ========================= */}

          {viewMode === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAppointments.map((item) => (
                <AppointmentCard
                  key={item.id}
                  appointment={item}
                  onDelete={handleDelete}
                  onReminder={handleSendReminder}
                  onEdit={handleEdit}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}

          {/* =========================
              Table
          ========================= */}

          {viewMode === "table" && (
            <AppointmentTable
              appointments={filteredAppointments}
              onDelete={handleDelete}
              onReminder={handleSendReminder}
              onEdit={handleEdit}
            />
          )}

          {/* =========================
              Calendar
          ========================= */}

          {viewMode === "calendar" && (
            <AppointmentCalendar
              appointments={filteredAppointments}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          )}
        </>
      )}

      {/* =========================
          Add Appointment Modal
      ========================= */}

      <AddAppointmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAppointment}
      />

      {/* =========================
          Edit Appointment Modal
      ========================= */}

      <EditAppointmentModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        onUpdate={handleUpdateAppointment}
      />
    </div>
  );
}