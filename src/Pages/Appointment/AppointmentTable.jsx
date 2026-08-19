import {
  Calendar,
  Clock,
  User,
  Phone,
  Stethoscope,
  Bell,
  Edit,
  Trash2,
} from "lucide-react";

export default function AppointmentTable({
  appointments = [],
  onDelete,
  onReminder,
  onEdit,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-800">
          جدول المواعيد
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          جميع مواعيد المرضى
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">

          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">

              <th className="px-5 py-4 text-right text-xs font-bold text-gray-500">
                المريض
              </th>

              <th className="px-5 py-4 text-right text-xs font-bold text-gray-500">
                رقم الهاتف
              </th>

              <th className="px-5 py-4 text-right text-xs font-bold text-gray-500">
                التاريخ
              </th>

              <th className="px-5 py-4 text-right text-xs font-bold text-gray-500">
                الوقت
              </th>

              <th className="px-5 py-4 text-right text-xs font-bold text-gray-500">
                نوع الجلسة
              </th>

              <th className="px-5 py-4 text-center text-xs font-bold text-gray-500">
                الإجراءات
              </th>

            </tr>
          </thead>

          <tbody>

            {appointments.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-400 text-sm"
                >
                  لا توجد مواعيد
                </td>
              </tr>

            ) : (

              appointments.map((appointment) => (

                <tr
                  key={appointment.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                >

                  {/* Patient */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <User
                          size={18}
                          className="text-blue-600"
                        />
                      </div>

                      <div>

                        <p className="font-bold text-gray-800 text-sm">
                          {appointment.name}
                        </p>

                        {appointment.email && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {appointment.email}
                          </p>
                        )}

                      </div>

                    </div>

                  </td>

                  {/* Phone */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                      <Phone
                        size={15}
                        className="text-gray-400"
                      />

                      {appointment.phone}

                    </div>

                  </td>

                  {/* Date */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                      <Calendar
                        size={15}
                        className="text-blue-500"
                      />

                      {appointment.date}

                    </div>

                  </td>

                  {/* Time */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-gray-500 text-sm">

                      <Clock
                        size={15}
                        className="text-emerald-500"
                      />

                      {appointment.time}

                    </div>

                  </td>

                  {/* Service */}
                  <td className="px-5 py-4">

                    <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-600 px-3 py-1.5 rounded-xl text-xs font-bold">

                      <Stethoscope size={13} />

                      {appointment.service}

                    </span>

                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">

                    <div className="flex items-center justify-center gap-1">

                      {/* Reminder */}
                      <button
                        type="button"
                        onClick={() =>
                          onReminder?.(
                            appointment.name
                          )
                        }
                        className="p-2 rounded-xl text-blue-500 hover:bg-blue-50 transition"
                        title="إرسال تذكير"
                      >
                        <Bell size={17} />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() =>
                          onEdit?.(appointment)
                        }
                        className="p-2 rounded-xl text-amber-500 hover:bg-amber-50 transition"
                        title="تعديل الموعد"
                      >
                        <Edit size={17} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() =>
                          onDelete?.(
                            appointment.id
                          )
                        }
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition"
                        title="حذف الموعد"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>
      </div>

    </div>
  );
}