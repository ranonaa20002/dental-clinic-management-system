import { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Activity,
} from "lucide-react";

export default function DoctorDashboard() {
  // ================= LANGUAGE =================

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ar"
  );

  // ================= LISTEN TO LANGUAGE CHANGE =================

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem("language") || "ar");
    };

    window.addEventListener("languageChanged", handleLanguageChange);

    return () => {
      window.removeEventListener(
        "languageChanged",
        handleLanguageChange
      );
    };
  }, []);

  // ================= STATS =================

  const stats = [
    {
      title:
        language === "ar"
          ? "إجمالي مرضى اليوم"
          : "Today's Patients",

      value: "24",

      change: "+12%",

      isPositive: true,

      icon: <Users className="text-blue-600" size={24} />,

      bg: "bg-blue-50",
    },

    {
      title:
        language === "ar"
          ? "المواعيد المؤكدة"
          : "Confirmed Appointments",

      value: "18",

      change: "+4%",

      isPositive: true,

      icon: <Calendar className="text-indigo-600" size={24} />,

      bg: "bg-indigo-50",
    },

    {
      title:
        language === "ar"
          ? "أرباح اليوم"
          : "Today's Revenue",

      value: "$1,450",

      change: "+18%",

      isPositive: true,

      icon: <DollarSign className="text-emerald-600" size={24} />,

      bg: "bg-emerald-50",
    },

    {
      title:
        language === "ar"
          ? "حالات الانتظار الحالية"
          : "Current Waiting List",

      value: "3",

      change: "-2",

      isPositive: false,

      icon: <Clock className="text-amber-600" size={24} />,

      bg: "bg-amber-50",
    },
  ];

  // ================= APPOINTMENTS =================

  const [appointments] = useState([
    {
      id: 1,

      patientName:
        language === "ar"
          ? "أحمد محمد علي"
          : "Ahmed Mohamed Ali",

      type:
        language === "ar"
          ? "كشف جديد - حشو عصب"
          : "New Visit - RCT",

      time: "09:30 AM",

      status: "completed",

      room:
        language === "ar"
          ? "عيادة 1"
          : "Room 1",
    },

    {
      id: 2,

      patientName:
        language === "ar"
          ? "سارة خالد"
          : "Sara Khaled",

      type:
        language === "ar"
          ? "متابعة - تقويم أسنان"
          : "Follow-up - Braces",

      time: "11:00 AM",

      status: "in-progress",

      room:
        language === "ar"
          ? "عيادة 2"
          : "Room 2",
    },

    {
      id: 3,

      patientName:
        language === "ar"
          ? "محمود حسن"
          : "Mahmoud Hassan",

      type:
        language === "ar"
          ? "كشف جديد - آلام حادة"
          : "New Visit - Emergency",

      time: "12:30 PM",

      status: "waiting",

      room:
        language === "ar"
          ? "عيادة 1"
          : "Room 1",
    },

    {
      id: 4,

      patientName:
        language === "ar"
          ? "فاطمة إبراهيم"
          : "Fatma Ibrahim",

      type:
        language === "ar"
          ? "متابعة - تركيب تيجان"
          : "Follow-up - Crowns",

      time: "02:00 PM",

      status: "waiting",

      room:
        language === "ar"
          ? "عيادة 2"
          : "Room 2",
    },
  ]);

  return (
    <div className="space-y-8 pb-10">

      {/* =====================================================
          WELCOME
      ===================================================== */}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">

        <div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">

            {language === "ar"
              ? "أهلاً بك، د. أحمد 👋"
              : "Welcome back, Dr. Ahmed 👋"}

          </h1>

          <p className="text-slate-500 text-sm mt-1">

            {language === "ar"
              ? "إليك ملخص سريع لحالة العيادة اليوم وجدول الحجوزات."
              : "Here is a quick summary of your clinic's daily status and schedule."}

          </p>

        </div>

        <div className="flex items-center gap-3">

          <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-bold border border-emerald-100">

            <Activity size={16} />

            {language === "ar"
              ? "العيادة تعمل بكفاءة"
              : "Clinic Open"}

          </span>

        </div>

      </div>

      {/* =====================================================
          STATS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {stats.map((stat, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between"
          >

            <div className="space-y-2">

              <span className="text-xs font-semibold text-slate-400 block">
                {stat.title}
              </span>

              <h3 className="text-2xl font-black text-slate-800">
                {stat.value}
              </h3>

              <span
                className={`inline-flex items-center gap-1 text-xs font-bold ${
                  stat.isPositive
                    ? "text-emerald-600"
                    : "text-rose-600"
                }`}
              >

                <ArrowUpRight size={14} />

                {stat.change}

                {language === "ar"
                  ? " مقارنة بالأمس"
                  : " vs yesterday"}

              </span>

            </div>

            <div
              className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center shrink-0`}
            >
              {stat.icon}
            </div>

          </div>

        ))}

      </div>

      {/* =====================================================
          APPOINTMENTS
      ===================================================== */}

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h2 className="text-lg font-bold text-slate-800">

              {language === "ar"
                ? "جدول المواعيد اليومي"
                : "Daily Appointments Schedule"}

            </h2>

            <p className="text-xs text-slate-400 mt-0.5">

              {language === "ar"
                ? "متابعة حجوزات المرضى وأوقات الانتظار الحالية"
                : "Track patient reservations and current wait times"}

            </p>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-start border-collapse">

            <thead>

              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400">

                <th className="pb-3 text-start">
                  {language === "ar"
                    ? "اسم المريض"
                    : "Patient Name"}
                </th>

                <th className="pb-3 text-start">
                  {language === "ar"
                    ? "نوع الكشف / الإجراء"
                    : "Visit Type"}
                </th>

                <th className="pb-3 text-start">
                  {language === "ar"
                    ? "وقت الموعد"
                    : "Time"}
                </th>

                <th className="pb-3 text-start">
                  {language === "ar"
                    ? "الغرفة"
                    : "Room"}
                </th>

                <th className="pb-3 text-start">
                  {language === "ar"
                    ? "الحالة"
                    : "Status"}
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">

              {appointments.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition"
                >

                  <td className="py-4 font-bold text-slate-800">

                    <div className="flex items-center gap-2.5">

                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold">

                        {item.patientName.charAt(0)}

                      </div>

                      {item.patientName}

                    </div>

                  </td>

                  <td className="py-4 text-slate-600 font-medium">
                    {item.type}
                  </td>

                  <td className="py-4 text-blue-600 font-semibold">
                    📅 {item.time}
                  </td>

                  <td className="py-4 text-slate-500 font-medium">
                    {item.room}
                  </td>

                  <td className="py-4">

                    {item.status === "completed" && (

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold">

                        <CheckCircle2 size={14} />

                        {language === "ar"
                          ? "مكتمل"
                          : "Completed"}

                      </span>

                    )}

                    {item.status === "in-progress" && (

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold animate-pulse">

                        <Activity size={14} />

                        {language === "ar"
                          ? "جاري الكشف"
                          : "In Progress"}

                      </span>

                    )}

                    {item.status === "waiting" && (

                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 rounded-xl text-xs font-bold">

                        <Clock size={14} />

                        {language === "ar"
                          ? "في الانتظار"
                          : "Waiting"}

                      </span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}