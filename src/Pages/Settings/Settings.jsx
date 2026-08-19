import { useState } from "react";

import {
  Settings as SettingsIcon,
  User,
  Bell,
  Globe,
  Lock,
  ShieldCheck,
  Save,
  Check,
  Mail,
  Smartphone,
} from "lucide-react";

export default function Settings() {
  // ================= LANGUAGE =================

  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ar"
  );

  const isArabic = language === "ar";

  // ================= SAVED =================

  const [saved, setSaved] = useState(false);

  // ================= SETTINGS =================

  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem("clinicSettings");

    if (savedSettings) {
      return JSON.parse(savedSettings);
    }

    return {
      emailNotifications: true,
      appointmentReminders: true,
      smsNotifications: false,
      twoFactor: false,
    };
  });

  // ================= CHANGE SETTING =================

  const handleChange = (name) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));

    setSaved(false);
  };

  // ================= SAVE =================

  const handleSave = () => {
    localStorage.setItem(
      "clinicSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // ================= CHANGE LANGUAGE =================

  const handleLanguageChange = () => {
    const newLanguage = isArabic ? "en" : "ar";

    setLanguage(newLanguage);

    localStorage.setItem("language", newLanguage);

    document.documentElement.lang = newLanguage;
    document.documentElement.dir =
      newLanguage === "ar" ? "rtl" : "ltr";

    // إعادة تحميل الصفحة عشان كل الصفحات تتحدث
    window.location.reload();
  };

  return (
    <div className="space-y-6 pb-10">

      {/* ================= HEADER ================= */}

      <div>
        <div className="flex items-center gap-3">

          <div
            className="
              w-11
              h-11
              rounded-xl
              bg-blue-100
              text-blue-600
              flex
              items-center
              justify-center
            "
          >
            <SettingsIcon size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {isArabic ? "الإعدادات" : "Settings"}
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              {isArabic
                ? "إدارة إعدادات العيادة والحساب"
                : "Manage your clinic and account settings"}
            </p>
          </div>

        </div>
      </div>

      {/* ================= DOCTOR INFORMATION ================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          p-6
        "
      >

        <div className="flex items-center gap-3 mb-6">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-blue-50
              text-blue-600
              flex
              items-center
              justify-center
            "
          >
            <User size={20} />
          </div>

          <div>

            <h2 className="font-bold text-slate-800">
              {isArabic
                ? "معلومات الطبيب"
                : "Doctor Information"}
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {isArabic
                ? "معلومات الحساب الشخصية"
                : "Your personal account information"}
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* NAME */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {isArabic ? "اسم الطبيب" : "Doctor Name"}
            </label>

            <input
              type="text"
              defaultValue="Dr. Ahmed"
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                outline-none
                focus:bg-white
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-100
                transition
              "
            />

          </div>

          {/* SPECIALIZATION */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {isArabic
                ? "التخصص"
                : "Specialization"}
            </label>

            <input
              type="text"
              defaultValue={
                isArabic
                  ? "استشاري أسنان"
                  : "Dental Consultant"
              }
              className="
                w-full
                px-4
                py-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                outline-none
                focus:bg-white
                focus:border-blue-400
                focus:ring-4
                focus:ring-blue-100
                transition
              "
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {isArabic
                ? "البريد الإلكتروني"
                : "Email Address"}
            </label>

            <div className="relative">

              <Mail
                size={17}
                className="
                  absolute
                  start-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                defaultValue="doctor@example.com"
                className="
                  w-full
                  ps-11
                  pe-4
                  py-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
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

          {/* PHONE */}

          <div>

            <label className="block text-sm font-semibold text-slate-700 mb-2">
              {isArabic
                ? "رقم الهاتف"
                : "Phone Number"}
            </label>

            <div className="relative">

              <Smartphone
                size={17}
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
                defaultValue="01000000000"
                className="
                  w-full
                  ps-11
                  pe-4
                  py-3
                  rounded-xl
                  border
                  border-slate-200
                  bg-slate-50
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

        </div>

      </div>

      {/* ================= NOTIFICATIONS ================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          p-6
        "
      >

        <div className="flex items-center gap-3 mb-6">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-amber-50
              text-amber-600
              flex
              items-center
              justify-center
            "
          >
            <Bell size={20} />
          </div>

          <div>

            <h2 className="font-bold text-slate-800">
              {isArabic
                ? "الإشعارات"
                : "Notifications"}
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {isArabic
                ? "تحكم في الإشعارات والتنبيهات"
                : "Control your notifications and alerts"}
            </p>

          </div>

        </div>

        <div className="space-y-4">

          <SettingRow
            icon={<Mail size={18} />}
            title={
              isArabic
                ? "إشعارات البريد الإلكتروني"
                : "Email Notifications"
            }
            description={
              isArabic
                ? "استقبال تحديثات المواعيد عبر البريد"
                : "Receive appointment updates by email"
            }
            enabled={settings.emailNotifications}
            onChange={() =>
              handleChange("emailNotifications")
            }
          />

          <SettingRow
            icon={<Bell size={18} />}
            title={
              isArabic
                ? "تذكير بالمواعيد"
                : "Appointment Reminders"
            }
            description={
              isArabic
                ? "إرسال تذكير قبل موعد المريض"
                : "Send reminders before patient appointments"
            }
            enabled={settings.appointmentReminders}
            onChange={() =>
              handleChange("appointmentReminders")
            }
          />

          <SettingRow
            icon={<Smartphone size={18} />}
            title={
              isArabic
                ? "إشعارات SMS"
                : "SMS Notifications"
            }
            description={
              isArabic
                ? "إرسال تنبيهات للمريض عبر الهاتف"
                : "Send notifications to patients by SMS"
            }
            enabled={settings.smsNotifications}
            onChange={() =>
              handleChange("smsNotifications")
            }
          />

        </div>

      </div>

      {/* ================= LANGUAGE ================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          p-6
        "
      >

        <div className="flex items-center gap-3 mb-6">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-purple-50
              text-purple-600
              flex
              items-center
              justify-center
            "
          >
            <Globe size={20} />
          </div>

          <div>

            <h2 className="font-bold text-slate-800">
              {isArabic ? "اللغة" : "Language"}
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {isArabic
                ? "لغة واجهة النظام"
                : "Application interface language"}
            </p>

          </div>

        </div>

        <div
          className="
            flex
            items-center
            justify-between
            p-4
            rounded-xl
            bg-slate-50
            border
            border-slate-100
          "
        >

          <div className="flex items-center gap-3">

            <Globe
              size={20}
              className="text-blue-600"
            />

            <div>

              <p className="font-semibold text-slate-700">
                {isArabic
                  ? "لغة النظام"
                  : "System Language"}
              </p>

              <p className="text-xs text-slate-400 mt-1">
                {isArabic
                  ? "يمكنك تغيير اللغة من الزر بالأعلى"
                  : "You can change the language from the button above"}
              </p>

            </div>

          </div>

          <button
            onClick={handleLanguageChange}
            className="
              px-4
              py-2
              rounded-xl
              bg-blue-100
              text-blue-700
              text-sm
              font-bold
              hover:bg-blue-200
              transition
            "
          >
            {isArabic ? "English" : "العربية"}
          </button>

        </div>

      </div>

      {/* ================= SECURITY ================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          shadow-sm
          p-6
        "
      >

        <div className="flex items-center gap-3 mb-6">

          <div
            className="
              w-10
              h-10
              rounded-xl
              bg-emerald-50
              text-emerald-600
              flex
              items-center
              justify-center
            "
          >
            <ShieldCheck size={20} />
          </div>

          <div>

            <h2 className="font-bold text-slate-800">
              {isArabic ? "الأمان" : "Security"}
            </h2>

            <p className="text-xs text-slate-400 mt-1">
              {isArabic
                ? "حماية حسابك"
                : "Protect your account"}
            </p>

          </div>

        </div>

        <SettingRow
          icon={<Lock size={18} />}
          title={
            isArabic
              ? "المصادقة الثنائية"
              : "Two-Factor Authentication"
          }
          description={
            isArabic
              ? "إضافة طبقة حماية إضافية للحساب"
              : "Add an extra layer of security to your account"
          }
          enabled={settings.twoFactor}
          onChange={() =>
            handleChange("twoFactor")
          }
        />

      </div>

      {/* ================= SAVE ================= */}

      <div className="flex items-center justify-end gap-3">

        {saved && (
          <div
            className="
              flex
              items-center
              gap-2
              text-emerald-600
              text-sm
              font-semibold
            "
          >
            <Check size={18} />

            {isArabic
              ? "تم حفظ الإعدادات"
              : "Settings saved"}
          </div>
        )}

        <button
          onClick={handleSave}
          className="
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-xl
            bg-blue-600
            text-white
            font-semibold
            hover:bg-blue-700
            active:scale-95
            transition
            shadow-lg
            shadow-blue-200
          "
        >

          <Save size={18} />

          {isArabic
            ? "حفظ الإعدادات"
            : "Save Settings"}

        </button>

      </div>

    </div>
  );
}

/* =====================================================
   SETTING ROW
===================================================== */

function SettingRow({
  icon,
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        p-4
        rounded-xl
        border
        border-slate-100
        hover:bg-slate-50
        transition
      "
    >

      <div className="flex items-center gap-3">

        <div
          className="
            w-9
            h-9
            rounded-lg
            bg-slate-100
            text-slate-600
            flex
            items-center
            justify-center
          "
        >
          {icon}
        </div>

        <div>

          <p className="text-sm font-semibold text-slate-700">
            {title}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {description}
          </p>

        </div>

      </div>

      <button
        type="button"
        onClick={onChange}
        className={`
          relative
          w-12
          h-6
          rounded-full
          transition
          shrink-0
          ${
            enabled
              ? "bg-blue-600"
              : "bg-slate-300"
          }
        `}
      >

        <span
          className={`
            absolute
            top-1
            w-4
            h-4
            bg-white
            rounded-full
            shadow
            transition-all
            ${
              enabled
                ? "end-1"
                : "start-1"
            }
          `}
        />

      </button>

    </div>
  );
}