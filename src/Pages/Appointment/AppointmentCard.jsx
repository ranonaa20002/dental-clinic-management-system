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
} from "lucide-react";

export default function AppointmentCard({
  appointment,
  onDelete,
  onReminder,
  onEdit,
  onStatusChange,
}) {
  // =========================
  // Status Configuration
  // =========================

  const statusConfig = {
    confirmed: {
      label: "مؤكد",
      color: "bg-emerald-50 text-emerald-600",
      icon: <CheckCircle2 size={14} />,
    },

    waiting: {
      label: "في الانتظار",
      color: "bg-amber-50 text-amber-600",
      icon: <Clock size={14} />,
    },

    completed: {
      label: "تم الحضور",
      color: "bg-blue-50 text-blue-600",
      icon: <UserCheck size={14} />,
    },

    cancelled: {
      label: "ملغي",
      color: "bg-red-50 text-red-600",
      icon: <XCircle size={14} />,
    },

    "no-show": {
      label: "لم يحضر",
      color: "bg-gray-100 text-gray-600",
      icon: <XCircle size={14} />,
    },
  };

  // لو الموعد مفيهوش status نخليه confirmed
  const currentStatus =
    statusConfig[appointment.status] ||
    statusConfig.confirmed;

  // =========================
  // Change Status
  // =========================

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;

    if (onStatusChange) {
      onStatusChange(
        appointment.id,
        newStatus
      );
    }
  };

  return (
    <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between space-y-4">

      {/* =========================
          Date & Time
      ========================= */}

      <div className="flex justify-between items-center gap-2">

        <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1">
          <Calendar size={12} />

          {appointment.date}
        </span>

        <span className="bg-emerald-50 text-emerald-600 font-bold px-3 py-1 rounded-xl text-xs flex items-center gap-1">
          <Clock size={12} />

          {appointment.time}
        </span>

      </div>

      {/* =========================
          Patient Information
      ========================= */}

      <div className="space-y-2">

        <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">

          <User
            size={18}
            className="text-gray-400"
          />

          {appointment.name}

        </h3>

        <p className="text-gray-500 text-sm flex items-center gap-2">

          <Phone
            size={16}
            className="text-gray-400"
          />

          {appointment.phone}

        </p>

        <p className="text-gray-400 text-xs flex items-center gap-2 truncate">

          <Mail
            size={14}
            className="text-gray-400"
          />

          {appointment.email ||
            "patient@example.com"}

        </p>

      </div>

      {/* =========================
          Service
      ========================= */}

      <div>
        <span className="text-xs text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-lg">
          {appointment.service}
        </span>
      </div>

      {/* =========================
          Status
      ========================= */}

      <div className="flex items-center justify-between gap-2">

        {/* Current Status */}

        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${currentStatus.color}`}
        >
          {currentStatus.icon}

          {currentStatus.label}
        </span>

        {/* Change Status */}

        <select
          value={
            appointment.status ||
            "confirmed"
          }
          onChange={handleStatusChange}
          className="text-xs border border-gray-200 rounded-xl px-2 py-1.5 outline-none bg-white text-gray-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >

          <option value="confirmed">
            مؤكد
          </option>

          <option value="waiting">
            في الانتظار
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

      </div>

      {/* =========================
          Actions
      ========================= */}

      <div className="flex justify-between items-center pt-3 border-t">

        {/* Reminder */}

        <button
          type="button"
          onClick={() =>
            onReminder(appointment.name)
          }
          className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-semibold transition"
        >
          إرسال تذكير
        </button>

        {/* Edit + Delete */}

        <div className="flex items-center gap-2">

          {/* Edit */}

          <button
            type="button"
            onClick={() =>
              onEdit(appointment)
            }
            className="text-amber-500 hover:bg-amber-50 p-2 rounded-xl transition"
            title="تعديل الموعد"
          >
            <Edit size={18} />
          </button>

          {/* Delete */}

          <button
            type="button"
            onClick={() =>
              onDelete(appointment.id)
            }
            className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition"
            title="حذف الموعد"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}