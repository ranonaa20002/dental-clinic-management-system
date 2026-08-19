import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  User,
  Phone,
} from "lucide-react";

export default function AppointmentCalendar({
  appointments = [],
  onEdit,
  onDelete,
}) {
  // =========================
  // Current Date
  // =========================

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    formatDate(today)
  );

  // =========================
  // Helpers
  // =========================

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");
    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // =========================
  // Month Info
  // =========================

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  // =========================
  // Calendar Days
  // =========================

  const calendarDays = [];

  // Empty days before month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // =========================
  // Month Navigation
  // =========================

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  const goToToday = () => {
    const now = new Date();

    setCurrentDate(
      new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      )
    );

    setSelectedDate(formatDate(now));
  };

  // =========================
  // Appointments for Selected Day
  // =========================

  const selectedAppointments = useMemo(() => {
    return appointments
      .filter(
        (appointment) =>
          appointment.date === selectedDate
      )
      .sort((a, b) =>
        a.time.localeCompare(b.time)
      );
  }, [appointments, selectedDate]);

  // =========================
  // Month Name
  // =========================

  const monthName = currentDate.toLocaleDateString(
    "ar-EG",
    {
      month: "long",
      year: "numeric",
    }
  );

  // =========================
  // Appointment Count
  // =========================

  const getDayAppointments = (day) => {
    if (!day) return [];

    const date = formatDate(
      new Date(year, month, day)
    );

    return appointments.filter(
      (appointment) =>
        appointment.date === date
    );
  };

  return (
    <div className="space-y-5">

      {/* =========================
          Calendar
      ========================= */}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">

        {/* Calendar Header */}

        <div className="flex items-center justify-between mb-6">

          <button
            type="button"
            onClick={goToPreviousMonth}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex items-center gap-3">

            <CalendarDays
              size={22}
              className="text-blue-600"
            />

            <h2 className="text-lg font-bold text-gray-800">
              {monthName}
            </h2>

          </div>

          <button
            type="button"
            onClick={goToNextMonth}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition"
          >
            <ChevronLeft size={20} />
          </button>

        </div>

        {/* Today Button */}

        <div className="flex justify-center mb-5">

          <button
            type="button"
            onClick={goToToday}
            className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold hover:bg-blue-100 transition"
          >
            اليوم
          </button>

        </div>

        {/* =========================
            Week Days
        ========================= */}

        <div className="grid grid-cols-7 mb-2">

          {[
            "الأحد",
            "الإثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت",
          ].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold text-gray-400 py-2"
            >
              {day}
            </div>
          ))}

        </div>

        {/* =========================
            Days
        ========================= */}

        <div className="grid grid-cols-7 gap-2">

          {calendarDays.map((day, index) => {

            if (!day) {
              return (
                <div
                  key={`empty-${index}`}
                  className="min-h-[70px]"
                />
              );
            }

            const date = formatDate(
              new Date(year, month, day)
            );

            const dayAppointments =
              getDayAppointments(day);

            const isSelected =
              selectedDate === date;

            const isToday =
              formatDate(today) === date;

            return (
              <button
                key={date}
                type="button"
                onClick={() =>
                  setSelectedDate(date)
                }
                className={`
                  min-h-[70px]
                  rounded-2xl
                  border
                  p-2
                  text-right
                  transition
                  relative
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-100 hover:bg-gray-50"
                  }
                `}
              >

                {/* Day Number */}

                <div
                  className={`
                    text-sm font-bold
                    ${
                      isToday
                        ? "text-blue-600"
                        : "text-gray-700"
                    }
                  `}
                >
                  {day}
                </div>

                {/* Appointment Count */}

                {dayAppointments.length > 0 && (
                  <div className="mt-2">

                    <span className="inline-flex items-center justify-center min-w-6 h-6 px-1 rounded-lg bg-blue-600 text-white text-xs font-bold">
                      {dayAppointments.length}
                    </span>

                  </div>
                )}

              </button>
            );
          })}

        </div>

      </div>

      {/* =========================
          Selected Day
      ========================= */}

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-5">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">

              <CalendarDays
                size={20}
                className="text-blue-600"
              />

              مواعيد اليوم
            </h3>

            <p className="text-xs text-gray-400 mt-1">
              {selectedDate}
            </p>

          </div>

          <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-xs font-bold">
            {selectedAppointments.length} موعد
          </span>

        </div>

        {/* No Appointments */}

        {selectedAppointments.length === 0 ? (

          <div className="text-center py-10">

            <CalendarDays
              size={40}
              className="mx-auto text-gray-200 mb-3"
            />

            <p className="text-gray-400 text-sm">
              لا توجد مواعيد في هذا اليوم
            </p>

          </div>

        ) : (

          <div className="space-y-3">

            {selectedAppointments.map(
              (appointment) => (
                <div
                  key={appointment.id}
                  className="border border-gray-100 rounded-2xl p-4 hover:bg-gray-50 transition"
                >

                  <div className="flex items-center justify-between gap-4">

                    {/* Patient */}

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <User
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div>

                        <h4 className="font-bold text-gray-800">
                          {appointment.name}
                        </h4>

                        <div className="flex items-center gap-3 mt-1">

                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Phone size={12} />
                            {appointment.phone}
                          </span>

                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock size={12} />
                            {appointment.time}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Service */}

                    <span className="bg-purple-50 text-purple-600 px-3 py-1.5 rounded-xl text-xs font-bold">
                      {appointment.service}
                    </span>

                  </div>

                  {/* Actions */}

                  <div className="flex justify-end gap-2 mt-3 pt-3 border-t">

                    <button
                      type="button"
                      onClick={() =>
                        onEdit &&
                        onEdit(appointment)
                      }
                      className="text-xs font-bold text-amber-600 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-xl transition"
                    >
                      تعديل
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete &&
                        onDelete(appointment.id)
                      }
                      className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl transition"
                    >
                      حذف
                    </button>

                  </div>

                </div>
              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}