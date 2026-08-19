import { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Stethoscope,
  FileText,
  Plus,
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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !date || !time || !service) {
      return;
    }

    const newAppointment = {
      id: Date.now(),
      name,
      phone,
      date,
      time,
      service,
      notes,
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-4">

      {/* Modal */}
      <div className="bg-white w-full max-w-xl max-h-[92vh] rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">

          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Calendar
                className="text-blue-600"
                size={20}
              />

              حجز موعد جديد
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              إضافة موعد جديد للمريض
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
          >
            <X size={20} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 overflow-y-auto max-h-[calc(92vh-75px)]"
        >

          {/* Patient Information */}
          <div>

            <h3 className="font-bold text-gray-700 text-sm mb-2">
              بيانات المريض
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  اسم المريض
                </label>

                <div className="relative">

                  <User
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="اسم المريض"
                    required
                    className="w-full h-11 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  رقم الهاتف
                </label>

                <div className="relative">

                  <Phone
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="01XXXXXXXXX"
                    required
                    className="w-full h-11 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>
              </div>

            </div>
          </div>

          {/* Appointment Information */}
          <div>

            <h3 className="font-bold text-gray-700 text-sm mb-2">
              بيانات الموعد
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {/* Date */}
              <div>

                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  التاريخ
                </label>

                <div className="relative">

                  <Calendar
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    required
                    className="w-full h-11 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />

                </div>

              </div>

              {/* Time */}
              <div>

                <label className="block text-xs font-medium text-gray-600 mb-1.5">
                  الوقت
                </label>

                <div className="relative">

                  <Clock
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    required
                    className="w-full h-11 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                  />

                </div>

              </div>

            </div>
          </div>

          {/* Service */}
          <div>

            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              نوع الجلسة
            </label>

            <div className="relative">

              <Stethoscope
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={service}
                onChange={(e) =>
                  setService(e.target.value)
                }
                required
                className="w-full h-11 border border-gray-200 rounded-xl py-2 pr-9 pl-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
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

            <label className="block text-xs font-medium text-gray-600 mb-1.5">
              ملاحظات
            </label>

            <div className="relative">

              <FileText
                size={16}
                className="absolute right-3 top-3 text-gray-400"
              />

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                placeholder="اكتب أي ملاحظات عن الموعد..."
                rows="2"
                className="w-full border border-gray-200 rounded-xl py-2.5 pr-9 pl-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />

            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t">

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50 transition"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Plus size={17} />
              حجز الموعد
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}