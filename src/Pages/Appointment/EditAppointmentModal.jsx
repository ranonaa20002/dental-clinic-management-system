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

  // تحميل بيانات الموعد عند فتح التعديل
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

    if (!name || !phone || !date || !time || !service) {
      return;
    }

    const updatedAppointment = {
      ...appointment,
      name,
      phone,
      date,
      time,
      service,
      notes,
    };

    onUpdate(updatedAppointment);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Calendar
                className="text-blue-600"
                size={22}
              />

              تعديل الموعد
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              تعديل بيانات الموعد
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >
          {/* Patient */}
          <div>
            <h3 className="font-bold text-gray-700 mb-3">
              بيانات المريض
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  اسم المريض
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                    className="w-full border border-gray-200 rounded-xl py-3 pr-10 pl-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  رقم الهاتف
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    required
                    className="w-full border border-gray-200 rounded-xl py-3 pr-10 pl-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Appointment */}
          <div>
            <h3 className="font-bold text-gray-700 mb-3">
              بيانات الموعد
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  التاريخ
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    required
                    className="w-full border border-gray-200 rounded-xl py-3 pr-10 pl-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  الوقت
                </label>

                <div className="relative">
                  <Clock
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    required
                    className="w-full border border-gray-200 rounded-xl py-3 pr-10 pl-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              نوع الجلسة
            </label>

            <div className="relative">
              <Stethoscope
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={service}
                onChange={(e) =>
                  setService(e.target.value)
                }
                required
                className="w-full border border-gray-200 rounded-xl py-3 pr-10 pl-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              ملاحظات
            </label>

            <div className="relative">
              <FileText
                size={18}
                className="absolute right-3 top-3 text-gray-400"
              />

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                placeholder="اكتب ملاحظات..."
                rows="3"
                className="w-full border border-gray-200 rounded-xl py-3 pr-10 pl-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Save size={18} />
              حفظ التعديل
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}