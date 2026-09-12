import { useState, useEffect } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";

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
  ChevronRight,
  Sparkles,
  Menu,
  ChevronDown,
} from "lucide-react";

export default function DoctorLayout() {
  const location = useLocation();

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sentEmails = [
    {
      id: 1,
      patientName: "Ahmed Mohamed",
      email: "ahmed.m@example.com",
      appointment: "22 Jul 2026 - 04:00 PM",
      status: "confirmed",
      message: "Root canal appointment invitation sent.",
    },
    {
      id: 2,
      patientName: "Sara Khaled",
      email: "sara.k@example.com",
      appointment: "23 Jul 2026 - 10:30 AM",
      status: "pending",
      message: "Checkup reminder sent, awaiting confirmation.",
    },
    {
      id: 3,
      patientName: "Mahmoud Hassan",
      email: "mahmoud.h@example.com",
      appointment: "25 Jul 2026 - 01:00 PM",
      status: "confirmed",
      message: "Teeth whitening session confirmed.",
    },
  ];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir =
      language === "ar" ? "rtl" : "ltr";

    localStorage.setItem("language", language);

    window.dispatchEvent(new Event("languageChanged"));
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
  };

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
      name:
        language === "ar"
          ? "السجلات الطبية"
          : "Medical Records",
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
      name:
        language === "ar"
          ? "النظام الإكلينيكي"
          : "Clinical Hub",
      path: "/dashboard/clinical-hub",
      icon: Activity,
    },
    {
      name:
        language === "ar"
          ? "المساعد الذكي"
          : "AI Assistant",
      path: "/dashboard/ai-assistant",
      icon: Bot,
    },
    {
      name: language === "ar" ? "الإعدادات" : "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];

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
    <div
      dir={language === "ar" ? "rtl" : "ltr"}
      className="min-h-screen h-screen overflow-hidden text-white font-sans"
      style={{
        background:
          "radial-gradient(circle at 72% 12%, rgba(0,145,255,.055), transparent 25%), radial-gradient(circle at 30% 80%, rgba(0,220,255,.025), transparent 28%), #000813",
      }}
    >
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          top-0
          ${language === "ar" ? "right-0" : "left-0"}
          h-screen
          z-50
          flex
          flex-col
          transition-all
          duration-300
          overflow-hidden
          border-white/[0.055]
          bg-[#010C18]
          ${
            language === "ar"
              ? "border-l"
              : "border-r"
          }
          ${sidebarOpen ? "w-[220px]" : "w-[70px]"}
        `}
      >
        {/* LOGO */}

        <div
          className={`
            h-[58px]
            shrink-0
            flex
            items-center
            ${
              sidebarOpen
                ? "px-4 gap-3"
                : "justify-center"
            }
            border-b
            border-white/[0.05]
          `}
        >
          <div
            className="
              relative
              w-8
              h-8
              shrink-0
              rounded-lg
              flex
              items-center
              justify-center
              bg-[#031521]
              border
              border-cyan-300/20
              text-[#42DFFF]
              shadow-[0_0_22px_rgba(20,220,255,.08)]
            "
          >
            <Stethoscope size={17} />

            <span
              className="
                absolute
                -bottom-0.5
                -right-0.5
                w-2
                h-2
                rounded-full
                bg-[#16E0FF]
                shadow-[0_0_8px_rgba(22,224,255,.9)]
              "
            />
          </div>

          {sidebarOpen && (
            <div>
              <div className="text-[11px] font-bold tracking-[0.12em] text-white">
                DENTAL
              </div>

              <div className="text-[7px] tracking-[0.22em] text-cyan-300/45">
                CLINIC
              </div>
            </div>
          )}
        </div>

        {/* MENU */}

        <div
          className={`
            px-2
            pt-5
            ${sidebarOpen ? "" : "px-1"}
          `}
        >
          {sidebarOpen && (
            <p
              className="
                px-3
                mb-2
                text-[7px]
                font-bold
                tracking-[0.22em]
                text-white/20
              "
            >
              MAIN MENU
            </p>
          )}

          <nav className="space-y-[2px]">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => `
                    group
                    relative
                    flex
                    items-center
                    ${
                      sidebarOpen
                        ? "gap-3 px-3"
                        : "justify-center px-1"
                    }
                    h-[35px]
                    rounded-lg
                    transition-all
                    duration-200
                    ${
                      isActive
                        ? `
                          bg-[#062231]
                          text-[#43E4FF]
                        `
                        : `
                          text-white/35
                          hover:bg-white/[0.025]
                          hover:text-white/75
                        `
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          className="
                            absolute
                            start-0
                            top-1/2
                            -translate-y-1/2
                            w-[2px]
                            h-5
                            rounded-full
                            bg-[#21DEFF]
                            shadow-[0_0_10px_rgba(33,222,255,.8)]
                          "
                        />
                      )}

                      <Icon
                        size={14}
                        strokeWidth={1.7}
                        className={
                          isActive
                            ? "text-[#36DFFF]"
                            : ""
                        }
                      />

                      {sidebarOpen && (
                        <>
                          <span className="text-[10px] font-medium flex-1 truncate">
                            {item.name}
                          </span>

                          {isActive && (
                            <ChevronRight
                              size={11}
                              className="text-cyan-300/35"
                            />
                          )}
                        </>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* DOCTOR */}

        <div className="mt-auto p-2">
          <div
            className={`
              rounded-xl
              bg-[#03131F]
              border
              border-white/[0.05]
              ${
                sidebarOpen
                  ? "p-3"
                  : "p-2 flex justify-center"
              }
            `}
          >
            <div
              className={`
                flex
                items-center
                ${
                  sidebarOpen
                    ? "gap-2.5"
                    : "justify-center"
                }
              `}
            >
              <div
                className="
                  relative
                  w-8
                  h-8
                  shrink-0
                  rounded-lg
                  bg-[#062130]
                  border
                  border-cyan-300/15
                  flex
                  items-center
                  justify-center
                  text-[9px]
                  font-bold
                  text-[#51E5FF]
                "
              >
                DR

                <span
                  className="
                    absolute
                    -bottom-0.5
                    -right-0.5
                    w-2
                    h-2
                    rounded-full
                    bg-emerald-400
                    border
                    border-[#03131F]
                  "
                />
              </div>

              {sidebarOpen && (
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold text-white/80 truncate">
                    Dr. Ahmed
                  </p>

                  <p className="text-[7px] text-white/25 mt-0.5 truncate">
                    Dental Consultant
                  </p>
                </div>
              )}
            </div>
          </div>

          {sidebarOpen && (
            <p className="text-[6px] text-center text-white/15 mt-2 tracking-[0.12em]">
              DENTAL CLINIC SYSTEM • v2.0.4
            </p>
          )}
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main
        className={`
          h-screen
          flex
          flex-col
          transition-all
          duration-300
          ${
            language === "ar"
              ? sidebarOpen
                ? "mr-[220px]"
                : "mr-[70px]"
              : sidebarOpen
              ? "ml-[220px]"
              : "ml-[70px]"
          }
        `}
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header
          className="
            h-[58px]
            shrink-0
            flex
            items-center
            justify-between
            px-4
            lg:px-5
            bg-[#010A14]/90
            backdrop-blur-xl
            border-b
            border-white/[0.05]
          "
        >
          {/* LEFT */}

          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                setSidebarOpen((prev) => !prev)
              }
              className="
                w-7
                h-7
                rounded-md
                flex
                items-center
                justify-center
                text-white/35
                hover:text-cyan-300
                hover:bg-white/[0.04]
                transition
              "
            >
              <Menu size={14} />
            </button>

            <div className="hidden sm:block">
              <p className="text-[8px] text-white/25">
                {language === "ar"
                  ? "مرحباً بك مرة أخرى"
                  : "Welcome back"}
              </p>

              <h2 className="text-[11px] font-semibold text-white/90 mt-0.5">
                {language === "ar"
                  ? "د. أحمد 👋"
                  : "Dr. Ahmed 👋"}
              </h2>
            </div>

            {/* SEARCH */}

            <div className="relative hidden md:block">
              <Search
                size={11}
                className="
                  absolute
                  start-3
                  top-1/2
                  -translate-y-1/2
                  text-white/20
                "
              />

              <input
                type="text"
                placeholder={
                  language === "ar"
                    ? "ابحث عن مريض، موعد..."
                    : "Search patients, appointments..."
                }
                className="
                  w-[220px]
                  lg:w-[270px]
                  h-[29px]
                  ps-8
                  pe-3
                  rounded-lg
                  bg-[#020E1A]
                  border
                  border-white/[0.07]
                  text-[8px]
                  text-white
                  placeholder:text-white/20
                  outline-none
                  focus:border-cyan-300/20
                  focus:bg-[#03121F]
                  transition
                "
              />
            </div>
          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-2">
            {/* NOTIFICATION */}

            <div className="relative">
              <button
                onClick={() =>
                  setIsNotificationsOpen(
                    !isNotificationsOpen
                  )
                }
                className="
                  relative
                  w-7
                  h-7
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-white/35
                  hover:text-cyan-300
                  hover:bg-white/[0.04]
                  transition
                "
              >
                <Bell size={13} />

                <span
                  className="
                    absolute
                    top-1.5
                    end-1.5
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-[#19DFFF]
                    shadow-[0_0_7px_rgba(25,223,255,.9)]
                  "
                />
              </button>

              {isNotificationsOpen && (
                <div
                  className="
                    absolute
                    end-0
                    top-9
                    w-[330px]
                    bg-[#03111D]
                    border
                    border-white/[0.08]
                    rounded-xl
                    shadow-[0_20px_60px_rgba(0,0,0,.7)]
                    overflow-hidden
                    z-[100]
                  "
                >
                  <div
                    className="
                      p-3
                      flex
                      items-center
                      justify-between
                      border-b
                      border-white/[0.05]
                    "
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="
                          w-7
                          h-7
                          rounded-lg
                          bg-cyan-300/10
                          flex
                          items-center
                          justify-center
                          text-cyan-300
                        "
                      >
                        <Mail size={12} />
                      </div>

                      <div>
                        <p className="text-[10px] font-semibold">
                          Notifications
                        </p>

                        <p className="text-[7px] text-white/25">
                          {sentEmails.length} messages
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        setIsNotificationsOpen(false)
                      }
                      className="text-white/25 hover:text-white"
                    >
                      <X size={13} />
                    </button>
                  </div>

                  <div className="p-2 space-y-1.5 max-h-[300px] overflow-y-auto">
                    {sentEmails.map((item) => (
                      <div
                        key={item.id}
                        className="
                          p-2.5
                          rounded-lg
                          bg-white/[0.018]
                          border
                          border-white/[0.04]
                        "
                      >
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="text-[9px] font-semibold text-white/80">
                              {item.patientName}
                            </p>

                            <p className="text-[7px] text-white/20 mt-1">
                              {item.email}
                            </p>
                          </div>

                          {item.status ===
                          "confirmed" ? (
                            <span className="text-[6px] text-emerald-300 bg-emerald-400/10 px-1.5 py-1 rounded-md">
                              Confirmed
                            </span>
                          ) : (
                            <span className="text-[6px] text-amber-300 bg-amber-400/10 px-1.5 py-1 rounded-md">
                              Pending
                            </span>
                          )}
                        </div>

                        <p className="text-[7px] text-cyan-300/45 mt-2">
                          {item.appointment}
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
                h-7
                px-2
                rounded-lg
                flex
                items-center
                gap-1.5
                text-[7px]
                font-semibold
                text-white/35
                hover:text-cyan-300
                hover:bg-white/[0.04]
                transition
              "
            >
              <Globe size={12} />

              {language === "ar"
                ? "English"
                : "العربية"}
            </button>

            <div className="w-px h-5 bg-white/[0.07]" />

            {/* PROFILE */}

            <div className="flex items-center gap-2">
              <div
                className="
                  w-7
                  h-7
                  rounded-lg
                  bg-[#062130]
                  border
                  border-cyan-300/15
                  flex
                  items-center
                  justify-center
                  text-[7px]
                  font-bold
                  text-cyan-300
                "
              >
                DR
              </div>

              <div className="hidden lg:block">
                <p className="text-[8px] font-semibold text-white/75">
                  Dr. Ahmed
                </p>

                <p className="text-[6px] text-white/20">
                  Dental Consultant
                </p>
              </div>

              <ChevronDown
                size={10}
                className="text-white/20"
              />
            </div>
          </div>
        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <section
          className="
            relative
            flex-1
            min-h-0
            overflow-y-auto
            overflow-x-hidden
          "
          style={{
            background:
              "radial-gradient(circle at 75% 10%, rgba(0,157,255,.045), transparent 24%), #000813",
          }}
        >
          {/* BACKGROUND GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              top-0
              right-[12%]
              w-[320px]
              h-[320px]
              rounded-full
              bg-cyan-400/[0.025]
              blur-[110px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-[20%]
              w-[280px]
              h-[280px]
              rounded-full
              bg-blue-500/[0.025]
              blur-[110px]
            "
          />

          <div className="relative p-3 sm:p-4 lg:p-5">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}