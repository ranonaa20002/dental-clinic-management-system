import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      dashboard: "Dashboard",
      patients: "Patients",
      appointments: "Appointments",
      medicalRecords: "Medical Records",
      settings: "Settings",
      logout: "Logout",
      search: "Search...",
      welcome: "Welcome Back",
      login: "Login",
      email: "Email Address",
      password: "Password",
      dentalClinic: "Dental Clinic",
      dentist: "Dentist",
    },
  },

  ar: {
    translation: {
      dashboard: "الرئيسية",
      patients: "المرضى",
      appointments: "المواعيد",
      medicalRecords: "السجلات الطبية",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      search: "بحث...",
      welcome: "مرحبًا بعودتك",
      login: "تسجيل الدخول",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      dentalClinic: "عيادة الأسنان",
      dentist: "طبيب أسنان",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;