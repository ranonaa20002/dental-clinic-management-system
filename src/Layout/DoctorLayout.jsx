import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  Bot,
  Globe,
  Bell,
  Search,
  Mail,
  CheckCircle2,
  Clock,
  X,
  Activity,
  CreditCard,
  Pill,
  BarChart3,
  Stethoscope,
} from "lucide-react";

export default function DoctorLayout() {
  const location = useLocation();

  // ================= LANGUAGE =================

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ar"
  );

  // ================= NOTIFICATIONS =================

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [sentEmails] = useState([
    {
      id: 1,
      patientName:
        language === "ar" ? "أحمد محمد علي" : "Ahmed Mohamed Ali",

      email: "ahmed.m@example.com",

      appointment: "22 Jul 2026 - 04:00 PM",

      status: "confirmed",

      message:
        language === "ar"
          ? "تم إرسال دعوة لموعد حشو العصب."
          : "Root canal appointment invitation sent.",
    },

    {
      id: 2,
      patientName:
        language === "ar" ? "سارة خالد" : "Sara Khaled",

      email: "sara.k@example.com",

      appointment: "23 Jul 2026 - 10:30 AM",

      status: "pending",

      message:
        language === "ar"
          ? "تم إرسال تذكير بالفحص الدوري، بانتظار التأكيد."
          : "Checkup reminder sent, awaiting confirmation.",
    },

    {
      id: 3,
      patientName:
        language === "ar" ? "محمود حسن" : "Mahmoud Hassan",

      email: "mahmoud.h@example.com",

      appointment: "25 Jul 2026 - 01:00 PM",

      status: "confirmed",

      message:
        language === "ar"
          ? "تم تأكيد جلسة تبييض الأسنان."
          : "Teeth whitening session confirmed.",
    },
  ]);

  // ================= LANGUAGE EFFECT =================

  useEffect(() => {
    document.documentElement.lang = language;

    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    localStorage.setItem("language", language);
  }, [language]);

  // ================= TOGGLE LANGUAGE =================

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

  // ================= NAVIGATION =================

  const navItems = [
    {
      name: language === "ar" ? "الرئيسية" : "Dashboard",
      path: "/dashboard",
      end: true,
      icon: LayoutDashboard,
    },

    {
      name: language === "ar" ? "المرضى" : "Patients",
      path: "/dashboard/patients",
      icon: Users,
    },

    {
      name: language === "ar" ? "المواعيد" : "Appointments",
      path: "/dashboard/appointments",
      icon: Calendar,
    },

    {
      name: language === "ar" ? "السجلات الطبية" : "Medical Records",
      path: "/dashboard/records",
      icon: FileText,
    },

    {
      name: language === "ar" ? "المدفوعات" : "Payments",
      path: "/dashboard/payments",
      icon: CreditCard,
    },

    {
      name: language === "ar" ? "الروشتات" : "Prescriptions",
      path: "/dashboard/prescription",
      icon: Pill,
    },

    {
      name: language === "ar" ? "التقارير" : "Reports",
      path: "/dashboard/reports",
      icon: BarChart3,
    },

    {
      name: language === "ar" ? "النظام الإكلينيكي" : "Clinical Hub",
      path: "/dashboard/clinical-hub",
      icon: Activity,
    },

    {
      name: language === "ar" ? "المساعد الذكي" : "AI Assistant",
      path: "/dashboard/ai-assistant",
      icon: Bot,
    },

    {
      name: language === "ar" ? "الإعدادات" : "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

  // ================= PAGE TITLE =================

  const getPageTitle = () => {
    const currentPage = navItems.find((item) => {
      if (item.end) {
        return location.pathname === item.path;
      }

      return location.pathname.startsWith(item.path);
    });

    return (
      currentPage?.name ||
      (language === "ar" ? "لوحة التحكم" : "Dashboard")
    );
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

     <aside
  className="
    w-72
    h-screen
    bg-gradient-to-b
    from-[#0759d7]
    via-[#0875e8]
    to-[#08a9e8]
    text-white
    flex
    flex-col
    p-5
    shadow-2xl
    z-20
    overflow-y-auto
  "
>
      

        {/* ================= TOP ================= */}

        <div>

          {/* LOGO */}

          <div className="flex items-center gap-3 px-2 mb-8">

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-white/15
                backdrop-blur-md
                border
                border-white/20
                flex
                items-center
                justify-center
                shadow-lg
              "
            >
              <Stethoscope size={26} />
            </div>

            <div>

              <h1 className="text-xl font-bold tracking-tight">
                {language === "ar"
                  ? "عيادة الأسنان"
                  : "Dental Clinic"}
              </h1>

              <p className="text-[11px] text-blue-100 mt-1">
                {language === "ar"
                  ? "لوحة التحكم الطبية"
                  : "Medical Dashboard"}
              </p>

            </div>

          </div>

          {/* DIVIDER */}

          <div className="h-px bg-white/15 mb-6" />

          {/* MENU TITLE */}

          <div className="px-3 mb-3">

            <span className="text-[10px] uppercase tracking-widest font-bold text-blue-100">
              {language === "ar"
                ? "القائمة الرئيسية"
                : "MAIN MENU"}
            </span>

          </div>

          {/* NAVIGATION */}

          <nav className="space-y-1.5">

            {navItems.map((item) => {

              const Icon = item.icon;

              const isCurrent =
                item.end
                  ? location.pathname === item.path
                  : location.pathname.startsWith(item.path);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          bg-white
                          text-[#0759d7]
                          shadow-lg
                        `
                        : `
                          text-blue-50
                          hover:bg-white/10
                          hover:text-white
                        `
                    }
                    `
                  }
                >

                  {/* ICON */}

                  <div
                    className={`
                      w-9
                      h-9
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      transition-all

                      ${
                        isCurrent
                          ? "bg-blue-50"
                          : "bg-white/10"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </div>

                  {/* TEXT */}

                  <span className="text-sm">
                    {item.name}
                  </span>

                </NavLink>
              );
            })}

          </nav>

        </div>

        {/* =====================================================
            SIDEBAR FOOTER
        ===================================================== */}

        <div>

          <div
            className="
              rounded-2xl
              bg-white/10
              border
              border-white/15
              backdrop-blur-md
              p-4
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-white
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  font-bold
                  shadow
                "
              >
                DR
              </div>

              <div>

                <p className="text-sm font-bold">
                  Dr. Ahmed
                </p>

                <p className="text-[10px] text-blue-100 mt-0.5">
                  {language === "ar"
                    ? "استشاري أسنان"
                    : "Dental Consultant"}
                </p>

              </div>

            </div>

          </div>

          <p className="text-[9px] text-center text-blue-100 mt-3">
            Smart Clinic System • v2.0.4
          </p>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <header
          className="
            h-[76px]
            bg-white
            border-b
            border-slate-200
            flex
            items-center
            justify-between
            px-8
            shadow-sm
            z-30
          "
        >

          {/* ================= LEFT ================= */}

          <div className="flex items-center gap-5">

            {/* PAGE TITLE */}

            <div>

              <p className="text-[10px] text-slate-400 font-medium">
                {language === "ar"
                  ? "أهلاً بك في العيادة"
                  : "Welcome back to your clinic"}
              </p>

              <h2 className="text-lg font-bold text-slate-800">
                {getPageTitle()}
              </h2>

            </div>

            {/* SEARCH */}

            <div className="relative hidden lg:block">

              <Search
                size={18}
                className="
                  absolute
                  start-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="text"
                placeholder={
                  language === "ar"
                    ? "بحث عن مريض أو موعد..."
                    : "Search patient or appointment..."
                }
                className="
                  w-[300px]
                  ps-11
                  pe-4
                  py-2.5
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-xl
                  text-sm
                  outline-none
                  focus:bg-white
                  focus:border-blue-400
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
              />

            </div>

          </div>

          {/* ================= RIGHT ================= */}

          <div className="flex items-center gap-3">

            {/* NOTIFICATIONS */}

            <div className="relative">

              <button
                onClick={() =>
                  setIsNotificationsOpen(
                    !isNotificationsOpen
                  )
                }
                className="
                  relative
                  w-10
                  h-10
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  flex
                  items-center
                  justify-center
                  text-slate-600
                  hover:text-blue-600
                  hover:bg-blue-50
                  transition
                "
              >

                <Bell size={18} />

                {sentEmails.length > 0 && (
                  <span
                    className="
                      absolute
                      top-2
                      end-2
                      w-2
                      h-2
                      bg-red-500
                      rounded-full
                      ring-2
                      ring-white
                    "
                  />
                )}

              </button>

              {/* NOTIFICATION DROPDOWN */}

              {isNotificationsOpen && (

                <div
                  className="
                    absolute
                    end-0
                    top-12
                    w-[370px]
                    max-w-[90vw]
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-slate-200
                    overflow-hidden
                    z-50
                  "
                >

                  {/* HEADER */}

                  <div
                    className="
                      p-4
                      bg-slate-50
                      border-b
                      border-slate-100
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-9
                          h-9
                          rounded-xl
                          bg-blue-100
                          text-blue-600
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Mail size={17} />
                      </div>

                      <div>

                        <h3 className="font-bold text-sm text-slate-800">
                          {language === "ar"
                            ? "الإشعارات"
                            : "Notifications"}
                        </h3>

                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {sentEmails.length}{" "}
                          {language === "ar"
                            ? "رسائل"
                            : "messages"}
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() =>
                        setIsNotificationsOpen(false)
                      }
                      className="
                        w-8
                        h-8
                        rounded-lg
                        hover:bg-white
                        flex
                        items-center
                        justify-center
                        text-slate-400
                      "
                    >
                      <X size={17} />
                    </button>

                  </div>

                  {/* NOTIFICATIONS LIST */}

                  <div
                    className="
                      max-h-[350px]
                      overflow-y-auto
                      p-3
                      space-y-2
                    "
                  >

                    {sentEmails.map((item) => (

                      <div
                        key={item.id}
                        className="
                          p-3
                          rounded-xl
                          border
                          border-slate-100
                          hover:bg-slate-50
                          transition
                        "
                      >

                        <div className="flex items-start justify-between gap-2">

                          <div>

                            <p className="text-sm font-bold text-slate-800">
                              {item.patientName}
                            </p>

                            <p className="text-[10px] text-slate-400 mt-1">
                              {item.email}
                            </p>

                          </div>

                          {item.status === "confirmed" ? (

                            <span
                              className="
                                flex
                                items-center
                                gap-1
                                text-[9px]
                                font-bold
                                text-emerald-600
                                bg-emerald-50
                                px-2
                                py-1
                                rounded-lg
                              "
                            >

                              <CheckCircle2 size={11} />

                              {language === "ar"
                                ? "مؤكد"
                                : "Confirmed"}

                            </span>

                          ) : (

                            <span
                              className="
                                flex
                                items-center
                                gap-1
                                text-[9px]
                                font-bold
                                text-amber-600
                                bg-amber-50
                                px-2
                                py-1
                                rounded-lg
                              "
                            >

                              <Clock size={11} />

                              {language === "ar"
                                ? "معلق"
                                : "Pending"}

                            </span>

                          )}

                        </div>

                        <div
                          className="
                            mt-2
                            text-[10px]
                            text-blue-600
                            bg-blue-50
                            rounded-lg
                            px-2
                            py-1.5
                          "
                        >
                          📅 {item.appointment}
                        </div>

                        <p className="text-[10px] text-slate-500 mt-2">
                          {item.message}
                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              )}

            </div>

            {/* LANGUAGE */}

            <button
              onClick={toggleLanguage}
              className="
                flex
                items-center
                gap-2
                px-3.5
                py-2.5
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-600
                hover:bg-slate-50
                transition
                text-xs
                font-semibold
              "
            >

              <Globe
                size={16}
                className="text-blue-600"
              />

              {language === "ar"
                ? "English"
                : "العربية"}

            </button>

            {/* DIVIDER */}

            <div className="h-7 w-px bg-slate-200" />

            {/* PROFILE */}

            <div className="flex items-center gap-3">

              <div
                className="
                  w-10
                  h-10
                  rounded-xl
                  bg-gradient-to-br
                  from-blue-600
                  to-indigo-600
                  text-white
                  flex
                  items-center
                  justify-center
                  font-bold
                  text-sm
                  shadow-md
                "
              >
                DR
              </div>

              <div className="hidden sm:block">

                <p className="text-xs font-bold text-slate-800">
                  Dr. Ahmed
                </p>

                <p className="text-[10px] text-slate-400 mt-0.5">
                  {language === "ar"
                    ? "استشاري أسنان"
                    : "Dental Consultant"}
                </p>

              </div>

            </div>

          </div>

        </header>

        {/* =====================================================
            PAGE CONTENT
        ===================================================== */}

        <section className="flex-1 overflow-y-auto">

          <div className="p-6 lg:p-8">

            <Outlet />

          </div>

        </section>

      </main>

    </div>
  );
}