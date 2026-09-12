import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Building2,
  Bell,
  ShieldCheck,
  Palette,
  Database,
  Lock,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
  Check,
  X,
  Monitor,
  Moon,
  Sun,
  Globe,
  Type,
  LogOut,
  Trash2,
  Download,
  Smartphone,
  Laptop,
  Activity,
  KeyRound,
  ChevronRight,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const DEFAULT_SETTINGS = {
  profile: {
    name: "Ahmed Mohamed",
    email: "ahmed@dentalcare.com",
    phone: "+20 100 000 0000",
    role: "Clinic Administrator",
  },

  clinic: {
    name: "Dental Care Clinic",
    address: "Cairo, Egypt",
    phone: "+20 2 1234 5678",
    email: "info@dentalcare.com",
  },

  notifications: {
    appointments: true,
    treatments: true,
    payments: true,
    promotions: false,
    loginAlerts: true,
  },

  security: {
    twoFactor: false,
  },

  appearance: {
    theme: "dark",
    language: "ar",
    fontSize: "medium",
  },

  system: {
    version: "2.4.0",
    database: "Connected",
    lastUpdate: "06 Sep 2026",
    dataUsage: "2.4 GB",
  },
};

const DEFAULT_SESSIONS = [
  {
    id: 1,
    device: "Windows PC",
    type: "desktop",
    browser: "Chrome",
    location: "Cairo, Egypt",
    lastActive: "Active now",
    current: true,
  },
  {
    id: 2,
    device: "Android Phone",
    type: "mobile",
    browser: "Chrome Mobile",
    location: "Cairo, Egypt",
    lastActive: "2 hours ago",
    current: false,
  },
];

function loadSettings() {
  try {
    const saved = localStorage.getItem("dental_settings");

    if (!saved) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(saved);

    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      profile: {
        ...DEFAULT_SETTINGS.profile,
        ...(parsed.profile || {}),
      },
      clinic: {
        ...DEFAULT_SETTINGS.clinic,
        ...(parsed.clinic || {}),
      },
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...(parsed.notifications || {}),
      },
      security: {
        ...DEFAULT_SETTINGS.security,
        ...(parsed.security || {}),
      },
      appearance: {
        ...DEFAULT_SETTINGS.appearance,
        ...(parsed.appearance || {}),
      },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function cloneSettings(value) {
  return JSON.parse(JSON.stringify(value));
}

export default function Settings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState(() => loadSettings());
  const [savedSettings, setSavedSettings] = useState(() =>
    loadSettings()
  );

  const [activeSection, setActiveSection] = useState("profile");

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] = useState("");

  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem("dental_sessions");

      if (saved) {
        return JSON.parse(saved);
      }

      return DEFAULT_SESSIONS;
    } catch {
      return DEFAULT_SESSIONS;
    }
  });

  const [saveState, setSaveState] = useState("idle");

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [dangerBusy, setDangerBusy] = useState(false);

  const hasChanges = useMemo(() => {
    return (
      JSON.stringify(settings) !== JSON.stringify(savedSettings)
    );
  }, [settings, savedSettings]);

  useEffect(() => {
    localStorage.setItem(
      "dental_sessions",
      JSON.stringify(sessions)
    );
  }, [sessions]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast((prev) => ({
        ...prev,
        show: false,
      }));
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast.show]);

  function showToast(message, type = "success") {
    setToast({
      show: true,
      type,
      message,
    });
  }

  function updateNested(section, key, value) {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  }

  function handleSave() {
    setSaveState("saving");

    setTimeout(() => {
      const next = cloneSettings(settings);

      localStorage.setItem(
        "dental_settings",
        JSON.stringify(next)
      );

      setSavedSettings(next);

      applyAppearance(next.appearance);

      setSaveState("saved");

      showToast("Settings saved successfully");

      setTimeout(() => {
        setSaveState("idle");
      }, 1800);
    }, 500);
  }

  function handleDiscard() {
    const restored = cloneSettings(savedSettings);

    setSettings(restored);

    applyAppearance(restored.appearance);

    showToast("Changes discarded", "info");
  }

  function applyAppearance(appearance) {
    const root = document.documentElement;

    root.dataset.theme = appearance.theme;

    root.lang = appearance.language;

    root.dir = appearance.language === "ar" ? "rtl" : "ltr";

    const fontMap = {
      small: "14px",
      medium: "16px",
      large: "18px",
    };

    root.style.fontSize =
      fontMap[appearance.fontSize] || "16px";

    if (appearance.theme === "light") {
      document.body.classList.add("dental-light");
    } else if (appearance.theme === "dark") {
      document.body.classList.remove("dental-light");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      document.body.classList.toggle(
        "dental-light",
        !prefersDark
      );
    }
  }

  useEffect(() => {
    applyAppearance(settings.appearance);
  }, []);

  function toggleNotification(key) {
    updateNested(
      "notifications",
      key,
      !settings.notifications[key]
    );
  }

  function validatePassword() {
    setPasswordMessage("");

    if (
      !passwordForm.oldPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setPasswordMessage(
        "Please complete all password fields."
      );
      return false;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordMessage(
        "New password must contain at least 8 characters."
      );
      return false;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      setPasswordMessage(
        "New password and confirmation do not match."
      );
      return false;
    }

    return true;
  }

  function handlePasswordChange() {
    if (!validatePassword()) {
      return;
    }

    localStorage.setItem(
      "dental_password_changed",
      new Date().toISOString()
    );

    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage(
      "Password updated locally. Connect this action to your backend API for real account password changes."
    );

    showToast("Password settings updated");
  }

  function handleSignOutSession(id) {
    setSessions((prev) =>
      prev.filter((session) => session.id !== id)
    );

    showToast("Session signed out");
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    sessionStorage.clear();

    showToast("Signing out...");

    setTimeout(() => {
      navigate("/login");
    }, 700);
  }

  function handleExportSettings() {
    const data = {
      exportedAt: new Date().toISOString(),
      settings,
      sessions,
    };

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "dental-settings.json";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);

    showToast("Settings exported");
  }

  function handleDeleteAccount() {
    setDangerBusy(true);

    setTimeout(() => {
      localStorage.removeItem("dental_settings");
      localStorage.removeItem("dental_sessions");
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      sessionStorage.clear();

      setDangerBusy(false);

      showToast(
        "Local account data deleted. Real database deletion requires your backend endpoint."
      );

      setDeleteConfirm(false);

      setTimeout(() => {
        navigate("/login");
      }, 900);
    }, 800);
  }

  const sections = [
    {
      id: "profile",
      label: "Profile",
      icon: UserRound,
    },
    {
      id: "clinic",
      label: "Clinic",
      icon: Building2,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "security",
      label: "Security",
      icon: ShieldCheck,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: Palette,
    },
    {
      id: "system",
      label: "System",
      icon: Database,
    },
  ];

  return (
    <div className="settings-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .settings-page {
          min-height: 100vh;
          padding: 28px;
          color: #eaf7ff;
          background:
            radial-gradient(circle at 80% 5%, rgba(0, 229, 255, .12), transparent 25%),
            radial-gradient(circle at 15% 90%, rgba(45, 108, 255, .10), transparent 28%),
            #030912;
          font-family:
            Inter,
            Cairo,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          position: relative;
          overflow: hidden;
        }

        .settings-page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: .22;
          background-image:
            linear-gradient(rgba(0, 229, 255, .035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 229, 255, .035) 1px, transparent 1px);
          background-size: 42px 42px;
        }

        .settings-shell {
          position: relative;
          z-index: 2;
          max-width: 1450px;
          margin: 0 auto;
        }

        .settings-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .settings-kicker {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #49eaff;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #42f5a7;
          box-shadow: 0 0 14px #42f5a7;
        }

        .settings-title {
          margin: 0;
          font-size: clamp(28px, 3vw, 42px);
          font-weight: 850;
          letter-spacing: -1px;
        }

        .settings-subtitle {
          margin: 7px 0 0;
          color: #70879b;
          font-size: 13px;
        }

        .save-indicator {
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 42px;
          padding: 0 15px;
          border: 1px solid rgba(0, 229, 255, .14);
          border-radius: 13px;
          background: rgba(6, 19, 30, .7);
          color: #8299aa;
          font-size: 12px;
        }

        .save-indicator.changed {
          color: #ffd166;
          border-color: rgba(255, 209, 102, .25);
        }

        .save-indicator.saved {
          color: #42f5a7;
          border-color: rgba(66, 245, 167, .25);
        }

        .settings-layout {
          display: grid;
          grid-template-columns: 225px minmax(0, 1fr);
          gap: 18px;
        }

        .settings-nav {
          height: fit-content;
          padding: 10px;
          border: 1px solid rgba(112, 163, 190, .13);
          border-radius: 20px;
          background: rgba(6, 15, 25, .84);
          backdrop-filter: blur(18px);
          box-shadow: 0 20px 70px rgba(0,0,0,.28);
        }

        .nav-label {
          padding: 11px 12px;
          color: #536b7e;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .nav-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px;
          margin-bottom: 4px;
          border: 1px solid transparent;
          border-radius: 12px;
          background: transparent;
          color: #8298aa;
          cursor: pointer;
          transition: .2s ease;
          text-align: start;
          font-size: 12px;
          font-weight: 700;
        }

        .nav-button:hover {
          color: #eaffff;
          background: rgba(0, 229, 255, .05);
        }

        .nav-button.active {
          color: #58edff;
          border-color: rgba(0, 229, 255, .18);
          background:
            linear-gradient(
              90deg,
              rgba(0,229,255,.12),
              rgba(0,229,255,.025)
            );
          box-shadow:
            inset 3px 0 0 #28d9ef,
            0 0 28px rgba(0,229,255,.05);
        }

        .nav-icon {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(255,255,255,.025);
        }

        .nav-button.active .nav-icon {
          background: rgba(0,229,255,.09);
        }

        .settings-content {
          min-width: 0;
        }

        .section-panel {
          border: 1px solid rgba(112, 163, 190, .13);
          border-radius: 22px;
          background:
            linear-gradient(
              135deg,
              rgba(10, 27, 42, .88),
              rgba(4, 13, 22, .88)
            );
          box-shadow:
            0 30px 100px rgba(0,0,0,.25),
            inset 0 1px 0 rgba(255,255,255,.025);
          overflow: hidden;
        }

        .panel-header {
          padding: 21px 23px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(112,163,190,.10);
        }

        .panel-title-wrap {
          display: flex;
          align-items: center;
          gap: 13px;
        }

        .panel-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          color: #50eaff;
          border: 1px solid rgba(0,229,255,.16);
          border-radius: 13px;
          background: rgba(0,229,255,.055);
          box-shadow: 0 0 28px rgba(0,229,255,.06);
        }

        .panel-title {
          margin: 0;
          font-size: 16px;
          font-weight: 800;
        }

        .panel-description {
          margin: 4px 0 0;
          color: #627a8d;
          font-size: 11px;
        }

        .panel-body {
          padding: 23px;
        }

        .profile-layout {
          display: grid;
          grid-template-columns: 1fr 290px;
          gap: 20px;
        }

        .profile-card {
          padding: 22px;
          border: 1px solid rgba(0,229,255,.12);
          border-radius: 18px;
          background: rgba(1,9,16,.42);
        }

        .profile-head {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 22px;
        }

        .avatar {
          width: 62px;
          height: 62px;
          display: grid;
          place-items: center;
          border-radius: 18px;
          color: #051018;
          background:
            linear-gradient(135deg,#6af4ff,#3c8fff);
          box-shadow:
            0 0 35px rgba(0,229,255,.2);
          font-size: 22px;
          font-weight: 900;
        }

        .profile-name {
          margin: 0;
          font-size: 18px;
          font-weight: 850;
        }

        .profile-role {
          color: #6d8496;
          margin-top: 4px;
          font-size: 11px;
        }

        .active-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
          padding: 5px 8px;
          border-radius: 8px;
          color: #42f5a7;
          background: rgba(66,245,167,.08);
          border: 1px solid rgba(66,245,167,.15);
          font-size: 9px;
          font-weight: 800;
        }

        .fields {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        .field-label {
          color: #6e8597;
          font-size: 10px;
          font-weight: 700;
        }

        .field-input,
        .field-select {
          width: 100%;
          height: 44px;
          padding: 0 13px;
          border: 1px solid rgba(116,156,180,.14);
          border-radius: 11px;
          outline: none;
          background: rgba(1,8,14,.75);
          color: #eaf8ff;
          font-size: 12px;
          transition: .2s ease;
        }

        .field-input:focus,
        .field-select:focus {
          border-color: rgba(0,229,255,.45);
          box-shadow: 0 0 0 3px rgba(0,229,255,.06);
        }

        .field-select option {
          background: #07131e;
          color: white;
        }

        .visual-panel {
          min-height: 300px;
          position: relative;
          display: grid;
          place-items: center;
          overflow: hidden;
          border: 1px solid rgba(0,229,255,.12);
          border-radius: 18px;
          background:
            radial-gradient(
              circle at center,
              rgba(0,229,255,.10),
              transparent 58%
            ),
            rgba(1,9,16,.42);
        }

        .visual-grid {
          position: absolute;
          inset: 0;
          opacity: .25;
          background-image:
            linear-gradient(rgba(0,229,255,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,.07) 1px, transparent 1px);
          background-size: 28px 28px;
        }

        .orbit {
          position: absolute;
          width: 205px;
          height: 82px;
          border: 1px solid rgba(70,231,255,.32);
          border-radius: 50%;
          transform: rotate(-24deg);
          box-shadow: 0 0 25px rgba(0,229,255,.06);
        }

        .orbit.two {
          width: 165px;
          height: 250px;
          transform: rotate(26deg);
        }

        .tooth-wrap {
          position: relative;
          z-index: 2;
          width: 115px;
          height: 115px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: #5eeeff;
          background: rgba(0,229,255,.055);
          border: 1px solid rgba(0,229,255,.3);
          box-shadow:
            0 0 25px rgba(0,229,255,.16),
            inset 0 0 35px rgba(0,229,255,.07);
        }

        .tooth-wrap svg {
          filter: drop-shadow(0 0 10px rgba(0,229,255,.75));
        }

        .visual-caption {
          position: absolute;
          bottom: 18px;
          z-index: 3;
          text-align: center;
        }

        .visual-caption strong {
          display: block;
          font-size: 11px;
          letter-spacing: 1.5px;
        }

        .visual-caption span {
          color: #587285;
          font-size: 9px;
        }

        .notification-list {
          display: grid;
          gap: 10px;
        }

        .setting-row {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 14px 16px;
          border: 1px solid rgba(112,163,190,.10);
          border-radius: 14px;
          background: rgba(1,9,16,.35);
          transition: .2s ease;
        }

        .setting-row:hover {
          border-color: rgba(0,229,255,.18);
          background: rgba(0,229,255,.025);
        }

        .setting-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .setting-symbol {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          color: #6beeff;
          border-radius: 10px;
          background: rgba(0,229,255,.06);
        }

        .setting-name {
          margin: 0;
          font-size: 12px;
          font-weight: 800;
        }

        .setting-description {
          margin: 3px 0 0;
          color: #5e7587;
          font-size: 10px;
        }

        .toggle {
          width: 46px;
          height: 25px;
          padding: 3px;
          border: 0;
          border-radius: 30px;
          background: #182733;
          cursor: pointer;
          transition: .2s ease;
        }

        .toggle span {
          display: block;
          width: 19px;
          height: 19px;
          border-radius: 50%;
          background: #718291;
          transition: .2s ease;
        }

        .toggle.on {
          background: rgba(0,229,255,.35);
          box-shadow: 0 0 17px rgba(0,229,255,.15);
        }

        .toggle.on span {
          transform: translateX(21px);
          background: #57eaff;
          box-shadow: 0 0 12px rgba(0,229,255,.65);
        }

        .security-grid {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 16px;
        }

        .security-card {
          padding: 19px;
          border: 1px solid rgba(112,163,190,.10);
          border-radius: 16px;
          background: rgba(1,9,16,.35);
        }

        .security-card h3 {
          margin: 0 0 5px;
          font-size: 13px;
        }

        .security-card p {
          color: #60778a;
          font-size: 10px;
          margin: 0 0 17px;
        }

        .password-field {
          position: relative;
        }

        .password-field .field-input {
          padding-right: 43px;
        }

        .password-eye {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          border: 0;
          background: transparent;
          color: #637b8d;
          cursor: pointer;
        }

        .password-actions {
          margin-top: 14px;
          display: flex;
          justify-content: flex-end;
        }

        .primary-small {
          height: 39px;
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(0,229,255,.24);
          border-radius: 10px;
          background: rgba(0,229,255,.08);
          color: #59edff;
          cursor: pointer;
          font-size: 11px;
          font-weight: 800;
        }

        .primary-small:hover {
          background: rgba(0,229,255,.15);
        }

        .message {
          margin-top: 12px;
          color: #42f5a7;
          font-size: 10px;
          line-height: 1.6;
        }

        .message.error {
          color: #ff7288;
        }

        .session-list {
          display: grid;
          gap: 9px;
        }

        .session {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          padding: 12px;
          border: 1px solid rgba(112,163,190,.09);
          border-radius: 12px;
          background: rgba(255,255,255,.015);
        }

        .session-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .session-icon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 9px;
          color: #6beeff;
          background: rgba(0,229,255,.06);
        }

        .session-name {
          font-size: 11px;
          font-weight: 800;
        }

        .session-meta {
          margin-top: 3px;
          color: #536b7c;
          font-size: 9px;
        }

        .session-action {
          border: 0;
          background: transparent;
          color: #74899a;
          cursor: pointer;
          font-size: 9px;
        }

        .session-action:hover {
          color: #ff7186;
        }

        .current-session {
          color: #42f5a7;
          font-size: 8px;
          font-weight: 800;
        }

        .appearance-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .appearance-card {
          padding: 17px;
          border: 1px solid rgba(112,163,190,.10);
          border-radius: 15px;
          background: rgba(1,9,16,.35);
        }

        .appearance-card h3 {
          margin: 0 0 13px;
          font-size: 12px;
        }

        .theme-options {
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 8px;
        }

        .theme-option {
          min-height: 72px;
          display: grid;
          place-items: center;
          gap: 6px;
          border: 1px solid rgba(112,163,190,.12);
          border-radius: 11px;
          background: rgba(255,255,255,.018);
          color: #6f8495;
          cursor: pointer;
          font-size: 9px;
        }

        .theme-option.active {
          color: #59edff;
          border-color: rgba(0,229,255,.32);
          background: rgba(0,229,255,.07);
          box-shadow: 0 0 22px rgba(0,229,255,.05);
        }

        .system-grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 12px;
        }

        .system-card {
          min-height: 115px;
          padding: 16px;
          border: 1px solid rgba(112,163,190,.10);
          border-radius: 15px;
          background: rgba(1,9,16,.35);
        }

        .system-card svg {
          color: #50eaff;
          margin-bottom: 12px;
        }

        .system-label {
          color: #587083;
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: .7px;
        }

        .system-value {
          margin-top: 5px;
          color: #e9f9ff;
          font-size: 13px;
          font-weight: 850;
        }

        .connected {
          color: #42f5a7;
        }

        .danger {
          margin-top: 15px;
          border-color: rgba(255,86,112,.16);
          background:
            linear-gradient(
              135deg,
              rgba(80,12,24,.23),
              rgba(20,5,10,.28)
            );
        }

        .danger .panel-icon {
          color: #ff7288;
          border-color: rgba(255,86,112,.18);
          background: rgba(255,86,112,.05);
        }

        .danger-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .danger-button {
          height: 40px;
          padding: 0 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255,86,112,.22);
          border-radius: 10px;
          color: #ff7d91;
          background: rgba(255,86,112,.06);
          cursor: pointer;
          font-size: 10px;
          font-weight: 800;
        }

        .danger-button:hover {
          background: rgba(255,86,112,.12);
        }

        .bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 18px;
          padding: 13px;
          border: 1px solid rgba(112,163,190,.12);
          border-radius: 17px;
          background: rgba(5,15,24,.88);
          backdrop-filter: blur(15px);
        }

        .bottom-status {
          color: #60778a;
          font-size: 10px;
        }

        .bottom-actions {
          display: flex;
          gap: 9px;
        }

        .button {
          height: 42px;
          padding: 0 16px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 10px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 850;
        }

        .secondary-button {
          border: 1px solid rgba(112,163,190,.15);
          color: #8397a7;
          background: rgba(255,255,255,.025);
        }

        .secondary-button:hover {
          color: #e7faff;
          background: rgba(255,255,255,.05);
        }

        .save-button {
          min-width: 145px;
          justify-content: center;
          border: 1px solid rgba(0,229,255,.32);
          color: #031017;
          background:
            linear-gradient(
              135deg,
              #62efff,
              #39bfff
            );
          box-shadow:
            0 0 28px rgba(0,229,255,.15);
        }

        .save-button:disabled {
          opacity: .45;
          cursor: not-allowed;
        }

        .toast {
          position: fixed;
          z-index: 100;
          right: 24px;
          bottom: 24px;
          min-width: 260px;
          padding: 13px 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(66,245,167,.2);
          border-radius: 13px;
          color: #ddfff0;
          background: rgba(5,24,21,.95);
          box-shadow: 0 20px 60px rgba(0,0,0,.4);
          font-size: 11px;
        }

        .toast.info {
          border-color: rgba(0,229,255,.2);
          background: rgba(4,20,28,.96);
        }

        .modal-backdrop {
          position: fixed;
          z-index: 200;
          inset: 0;
          display: grid;
          place-items: center;
          padding: 20px;
          background: rgba(0,0,0,.72);
          backdrop-filter: blur(10px);
        }

        .confirm-modal {
          width: min(430px, 100%);
          padding: 25px;
          border: 1px solid rgba(255,86,112,.22);
          border-radius: 20px;
          background:
            linear-gradient(
              145deg,
              #0b1824,
              #040a11
            );
          box-shadow: 0 30px 100px rgba(0,0,0,.55);
        }

        .confirm-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          color: #ff7288;
          background: rgba(255,86,112,.08);
          border: 1px solid rgba(255,86,112,.16);
          margin-bottom: 15px;
        }

        .confirm-modal h3 {
          margin: 0;
          font-size: 17px;
        }

        .confirm-modal p {
          color: #72899a;
          line-height: 1.7;
          font-size: 11px;
          margin: 9px 0 20px;
        }

        .confirm-actions {
          display: flex;
          justify-content: flex-end;
          gap: 9px;
        }

        .delete-confirm {
          height: 40px;
          padding: 0 15px;
          border: 0;
          border-radius: 10px;
          background: #ff5e77;
          color: white;
          cursor: pointer;
          font-size: 10px;
          font-weight: 850;
        }

        @media (max-width: 1050px) {
          .profile-layout,
          .security-grid {
            grid-template-columns: 1fr;
          }

          .system-grid {
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media (max-width: 800px) {
          .settings-page {
            padding: 16px;
          }

          .settings-layout {
            grid-template-columns: 1fr;
          }

          .settings-nav {
            display: flex;
            overflow-x: auto;
            gap: 5px;
          }

          .nav-label {
            display: none;
          }

          .nav-button {
            min-width: 130px;
            margin: 0;
          }

          .fields,
          .appearance-grid {
            grid-template-columns: 1fr;
          }

          .field.full {
            grid-column: auto;
          }

          .settings-top {
            align-items: flex-start;
            flex-direction: column;
          }
        }

        @media (max-width: 560px) {
          .panel-header,
          .panel-body {
            padding: 16px;
          }

          .system-grid {
            grid-template-columns: 1fr;
          }

          .theme-options {
            grid-template-columns: 1fr;
          }

          .bottom-bar {
            flex-direction: column;
            align-items: stretch;
          }

          .bottom-actions {
            width: 100%;
          }

          .bottom-actions .button {
            flex: 1;
            justify-content: center;
          }
        }

        body.dental-light .settings-page {
          background:
            radial-gradient(circle at 80% 5%, rgba(0, 180, 220, .13), transparent 25%),
            #eef7fb;
          color: #102431;
        }

        body.dental-light .settings-page::before {
          opacity: .12;
        }

        body.dental-light .settings-nav,
        body.dental-light .section-panel,
        body.dental-light .bottom-bar {
          background: rgba(255,255,255,.86);
          border-color: rgba(15,80,110,.12);
        }

        body.dental-light .nav-button {
          color: #607889;
        }

        body.dental-light .nav-button.active {
          color: #008ea8;
          background: rgba(0,180,220,.07);
        }

        body.dental-light .profile-card,
        body.dental-light .visual-panel,
        body.dental-light .setting-row,
        body.dental-light .security-card,
        body.dental-light .appearance-card,
        body.dental-light .system-card {
          background: rgba(242,250,253,.82);
          border-color: rgba(15,80,110,.10);
        }

        body.dental-light .field-input,
        body.dental-light .field-select {
          background: white;
          color: #142b38;
          border-color: rgba(15,80,110,.15);
        }

        body.dental-light .panel-description,
        body.dental-light .settings-subtitle,
        body.dental-light .field-label,
        body.dental-light .setting-description,
        body.dental-light .system-label {
          color: #708795;
        }
      `}</style>

      <div className="settings-shell">

        {/* HEADER */}
        <header className="settings-top">
          <div>
            <div className="settings-kicker">
              <span className="online-dot" />
              DENTAL CONTROL CENTER
            </div>

            <h1 className="settings-title">
              Settings
            </h1>

            <p className="settings-subtitle">
              Manage your clinic system, account, security and preferences.
            </p>
          </div>

          <div
            className={`save-indicator ${
              hasChanges
                ? "changed"
                : saveState === "saved"
                ? "saved"
                : ""
            }`}
          >
            {hasChanges ? (
              <>
                <RefreshCw size={14} />
                Unsaved changes
              </>
            ) : saveState === "saved" ? (
              <>
                <CheckCircle2 size={14} />
                All changes saved
              </>
            ) : (
              <>
                <Activity size={14} />
                System synchronized
              </>
            )}
          </div>
        </header>

        <div className="settings-layout">

          {/* NAVIGATION */}
          <aside className="settings-nav">
            <div className="nav-label">
              Control Panel
            </div>

            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  key={section.id}
                  className={`nav-button ${
                    activeSection === section.id
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setActiveSection(section.id)
                  }
                >
                  <span className="nav-icon">
                    <Icon size={16} />
                  </span>

                  <span>{section.label}</span>

                  {activeSection === section.id && (
                    <ChevronRight
                      size={13}
                      style={{
                        marginInlineStart: "auto",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </aside>

          {/* CONTENT */}
          <main className="settings-content">

            {/* PROFILE */}
            {activeSection === "profile" && (
              <section className="section-panel">
                <PanelHeader
                  icon={<UserRound size={19} />}
                  title="Profile Overview"
                  description="Manage your personal account information."
                />

                <div className="panel-body">
                  <div className="profile-layout">

                    <div className="profile-card">
                      <div className="profile-head">
                        <div className="avatar">
                          {settings.profile.name
                            .split(" ")
                            .map((word) => word[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>

                        <div>
                          <h2 className="profile-name">
                            {settings.profile.name ||
                              "Your Name"}
                          </h2>

                          <div className="profile-role">
                            {settings.profile.role}
                          </div>

                          <div className="active-badge">
                            <Check size={11} />
                            ACCOUNT ACTIVE
                          </div>
                        </div>
                      </div>

                      <div className="fields">
                        <Field
                          label="Full Name"
                          value={settings.profile.name}
                          onChange={(value) =>
                            updateNested(
                              "profile",
                              "name",
                              value
                            )
                          }
                        />

                        <Field
                          label="Role"
                          value={settings.profile.role}
                          onChange={(value) =>
                            updateNested(
                              "profile",
                              "role",
                              value
                            )
                          }
                        />

                        <Field
                          label="Email"
                          type="email"
                          value={settings.profile.email}
                          onChange={(value) =>
                            updateNested(
                              "profile",
                              "email",
                              value
                            )
                          }
                        />

                        <Field
                          label="Phone"
                          value={settings.profile.phone}
                          onChange={(value) =>
                            updateNested(
                              "profile",
                              "phone",
                              value
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="visual-panel">
                      <div className="visual-grid" />

                      <div className="orbit" />
                      <div className="orbit two" />

                      <div className="tooth-wrap">
                        <ToothIcon size={72} />
                      </div>

                      <div className="visual-caption">
                        <strong>SMART DENTAL CORE</strong>
                        <span>ACCOUNT PROFILE MODULE</span>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            )}

            {/* CLINIC */}
            {activeSection === "clinic" && (
              <section className="section-panel">
                <PanelHeader
                  icon={<Building2 size={19} />}
                  title="Clinic Information"
                  description="Update the information displayed across your clinic system."
                />

                <div className="panel-body">
                  <div className="fields">

                    <Field
                      label="Clinic Name"
                      value={settings.clinic.name}
                      onChange={(value) =>
                        updateNested(
                          "clinic",
                          "name",
                          value
                        )
                      }
                    />

                    <Field
                      label="Clinic Phone"
                      value={settings.clinic.phone}
                      onChange={(value) =>
                        updateNested(
                          "clinic",
                          "phone",
                          value
                        )
                      }
                    />

                    <Field
                      label="Clinic Email"
                      type="email"
                      value={settings.clinic.email}
                      onChange={(value) =>
                        updateNested(
                          "clinic",
                          "email",
                          value
                        )
                      }
                    />

                    <Field
                      label="Location"
                      value={settings.clinic.address}
                      onChange={(value) =>
                        updateNested(
                          "clinic",
                          "address",
                          value
                        )
                      }
                    />

                  </div>

                  <div
                    style={{
                      marginTop: 18,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(3, 1fr)",
                      gap: 10,
                    }}
                  >
                    <InfoMini
                      icon={<MapPin size={15} />}
                      title="Location"
                      value={
                        settings.clinic.address
                      }
                    />

                    <InfoMini
                      icon={<Phone size={15} />}
                      title="Phone"
                      value={
                        settings.clinic.phone
                      }
                    />

                    <InfoMini
                      icon={<Mail size={15} />}
                      title="Email"
                      value={
                        settings.clinic.email
                      }
                    />
                  </div>
                </div>
              </section>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === "notifications" && (
              <section className="section-panel">
                <PanelHeader
                  icon={<Bell size={19} />}
                  title="Notification Preferences"
                  description="Control which notifications the clinic system sends."
                />

                <div className="panel-body">
                  <div className="notification-list">

                    <SettingRow
                      icon={<Bell size={17} />}
                      title="Appointment Reminders"
                      description="Receive reminders for upcoming appointments."
                      enabled={
                        settings.notifications.appointments
                      }
                      onToggle={() =>
                        toggleNotification(
                          "appointments"
                        )
                      }
                    />

                    <SettingRow
                      icon={<Activity size={17} />}
                      title="Treatment Updates"
                      description="Receive updates about treatment progress."
                      enabled={
                        settings.notifications.treatments
                      }
                      onToggle={() =>
                        toggleNotification(
                          "treatments"
                        )
                      }
                    />

                    <SettingRow
                      icon={<Database size={17} />}
                      title="Payment Alerts"
                      description="Get notified about new and pending payments."
                      enabled={
                        settings.notifications.payments
                      }
                      onToggle={() =>
                        toggleNotification(
                          "payments"
                        )
                      }
                    />

                    <SettingRow
                      icon={<Mail size={17} />}
                      title="Promotions & Offers"
                      description="Receive clinic promotions and special offers."
                      enabled={
                        settings.notifications.promotions
                      }
                      onToggle={() =>
                        toggleNotification(
                          "promotions"
                        )
                      }
                    />

                    <SettingRow
                      icon={<ShieldCheck size={17} />}
                      title="Login Alerts"
                      description="Receive security alerts for new logins."
                      enabled={
                        settings.notifications.loginAlerts
                      }
                      onToggle={() =>
                        toggleNotification(
                          "loginAlerts"
                        )
                      }
                    />

                  </div>
                </div>
              </section>
            )}

            {/* SECURITY */}
            {activeSection === "security" && (
              <section className="section-panel">
                <PanelHeader
                  icon={<ShieldCheck size={19} />}
                  title="Security Settings"
                  description="Protect your account and manage active sessions."
                />

                <div className="panel-body">
                  <div className="security-grid">

                    <div className="security-card">
                      <h3>
                        Change Password
                      </h3>

                      <p>
                        Use a strong password with at least
                        8 characters.
                      </p>

                      <div
                        style={{
                          display: "grid",
                          gap: 11,
                        }}
                      >
                        <PasswordField
                          label="Current Password"
                          value={
                            passwordForm.oldPassword
                          }
                          visible={
                            showPassword.old
                          }
                          onChange={(value) =>
                            setPasswordForm(
                              (prev) => ({
                                ...prev,
                                oldPassword:
                                  value,
                              })
                            )
                          }
                          onToggle={() =>
                            setShowPassword(
                              (prev) => ({
                                ...prev,
                                old:
                                  !prev.old,
                              })
                            )
                          }
                        />

                        <PasswordField
                          label="New Password"
                          value={
                            passwordForm.newPassword
                          }
                          visible={
                            showPassword.new
                          }
                          onChange={(value) =>
                            setPasswordForm(
                              (prev) => ({
                                ...prev,
                                newPassword:
                                  value,
                              })
                            )
                          }
                          onToggle={() =>
                            setShowPassword(
                              (prev) => ({
                                ...prev,
                                new:
                                  !prev.new,
                              })
                            )
                          }
                        />

                        <PasswordField
                          label="Confirm New Password"
                          value={
                            passwordForm.confirmPassword
                          }
                          visible={
                            showPassword.confirm
                          }
                          onChange={(value) =>
                            setPasswordForm(
                              (prev) => ({
                                ...prev,
                                confirmPassword:
                                  value,
                              })
                            )
                          }
                          onToggle={() =>
                            setShowPassword(
                              (prev) => ({
                                ...prev,
                                confirm:
                                  !prev.confirm,
                              })
                            )
                          }
                        />
                      </div>

                      <div className="password-actions">
                        <button
                          className="primary-small"
                          onClick={
                            handlePasswordChange
                          }
                        >
                          <KeyRound size={14} />
                          Change Password
                        </button>
                      </div>

                      {passwordMessage && (
                        <div
                          className={`message ${
                            passwordMessage.includes(
                              "must"
                            ) ||
                            passwordMessage.includes(
                              "match"
                            ) ||
                            passwordMessage.includes(
                              "complete"
                            )
                              ? "error"
                              : ""
                          }`}
                        >
                          {passwordMessage}
                        </div>
                      )}
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gap: 12,
                      }}
                    >
                      <div className="security-card">
                        <SettingRow
                          icon={
                            <ShieldCheck size={17} />
                          }
                          title="Two-Factor Authentication"
                          description="Add another security layer."
                          enabled={
                            settings.security
                              .twoFactor
                          }
                          onToggle={() =>
                            updateNested(
                              "security",
                              "twoFactor",
                              !settings.security
                                .twoFactor
                            )
                          }
                        />
                      </div>

                      <div className="security-card">
                        <h3>
                          Active Sessions
                        </h3>

                        <p>
                          Devices currently signed into your
                          account.
                        </p>

                        <div className="session-list">
                          {sessions.length === 0 ? (
                            <div
                              style={{
                                color:
                                  "#607789",
                                fontSize: 10,
                              }}
                            >
                              No active sessions.
                            </div>
                          ) : (
                            sessions.map(
                              (session) => (
                                <div
                                  className="session"
                                  key={
                                    session.id
                                  }
                                >
                                  <div className="session-left">
                                    <div className="session-icon">
                                      {session.type ===
                                      "mobile" ? (
                                        <Smartphone
                                          size={16}
                                        />
                                      ) : (
                                        <Laptop
                                          size={16}
                                        />
                                      )}
                                    </div>

                                    <div>
                                      <div className="session-name">
                                        {
                                          session.device
                                        }
                                      </div>

                                      <div className="session-meta">
                                        {
                                          session.browser
                                        }{" "}
                                        ·{" "}
                                        {
                                          session.location
                                        }
                                      </div>

                                      {session.current && (
                                        <div className="current-session">
                                          CURRENT SESSION
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {!session.current && (
                                    <button
                                      className="session-action"
                                      onClick={() =>
                                        handleSignOutSession(
                                          session.id
                                        )
                                      }
                                    >
                                      Sign out
                                    </button>
                                  )}
                                </div>
                              )
                            )
                          )}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            )}

            {/* APPEARANCE */}
            {activeSection === "appearance" && (
              <section className="section-panel">
                <PanelHeader
                  icon={<Palette size={19} />}
                  title="Appearance"
                  description="Customize how the dental system looks and behaves."
                />

                <div className="panel-body">
                  <div className="appearance-grid">

                    <div className="appearance-card">
                      <h3>Theme</h3>

                      <div className="theme-options">

                        <ThemeButton
                          active={
                            settings.appearance
                              .theme === "dark"
                          }
                          icon={<Moon size={18} />}
                          label="Dark"
                          onClick={() =>
                            updateNested(
                              "appearance",
                              "theme",
                              "dark"
                            )
                          }
                        />

                        <ThemeButton
                          active={
                            settings.appearance
                              .theme === "light"
                          }
                          icon={<Sun size={18} />}
                          label="Light"
                          onClick={() =>
                            updateNested(
                              "appearance",
                              "theme",
                              "light"
                            )
                          }
                        />

                        <ThemeButton
                          active={
                            settings.appearance
                              .theme === "system"
                          }
                          icon={
                            <Monitor size={18} />
                          }
                          label="System"
                          onClick={() =>
                            updateNested(
                              "appearance",
                              "theme",
                              "system"
                            )
                          }
                        />

                      </div>
                    </div>

                    <div className="appearance-card">
                      <h3>Language</h3>

                      <select
                        className="field-select"
                        value={
                          settings.appearance
                            .language
                        }
                        onChange={(e) => {
                          updateNested(
                            "appearance",
                            "language",
                            e.target.value
                          );

                          applyAppearance({
                            ...settings.appearance,
                            language:
                              e.target.value,
                          });
                        }}
                      >
                        <option value="ar">
                          العربية
                        </option>

                        <option value="en">
                          English
                        </option>
                      </select>
                    </div>

                    <div className="appearance-card">
                      <h3>
                        <Type
                          size={14}
                          style={{
                            verticalAlign:
                              "middle",
                            marginInlineEnd:
                              6,
                          }}
                        />
                        Font Size
                      </h3>

                      <select
                        className="field-select"
                        value={
                          settings.appearance
                            .fontSize
                        }
                        onChange={(e) => {
                          updateNested(
                            "appearance",
                            "fontSize",
                            e.target.value
                          );

                          applyAppearance({
                            ...settings.appearance,
                            fontSize:
                              e.target.value,
                          });
                        }}
                      >
                        <option value="small">
                          Small
                        </option>

                        <option value="medium">
                          Medium
                        </option>

                        <option value="large">
                          Large
                        </option>
                      </select>
                    </div>

                    <div className="visual-panel">
                      <div className="visual-grid" />

                      <div className="orbit" />
                      <div className="orbit two" />

                      <div className="tooth-wrap">
                        <ToothIcon size={70} />
                      </div>

                      <div className="visual-caption">
                        <strong>
                          VISUAL INTERFACE
                        </strong>

                        <span>
                          LIVE PREVIEW
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            )}

            {/* SYSTEM */}
            {activeSection === "system" && (
              <>
                <section className="section-panel">
                  <PanelHeader
                    icon={<Database size={19} />}
                    title="System Information"
                    description="Technical information about your dental management system."
                  />

                  <div className="panel-body">
                    <div className="system-grid">

                      <SystemCard
                        icon={<Activity size={17} />}
                        label="Version"
                        value={
                          settings.system.version
                        }
                      />

                      <SystemCard
                        icon={
                          <Database size={17} />
                        }
                        label="Database"
                        value={
                          settings.system.database
                        }
                        valueClass="connected"
                      />

                      <SystemCard
                        icon={
                          <RefreshCw size={17} />
                        }
                        label="Last Update"
                        value={
                          settings.system
                            .lastUpdate
                        }
                      />

                      <SystemCard
                        icon={
                          <Download size={17} />
                        }
                        label="Data Usage"
                        value={
                          settings.system
                            .dataUsage
                        }
                      />

                    </div>
                  </div>
                </section>

                <section className="section-panel danger">
                  <PanelHeader
                    icon={<AlertTriangle size={19} />}
                    title="Danger Zone"
                    description="Actions here can affect your account and local session."
                  />

                  <div className="panel-body">
                    <div className="danger-actions">

                      <button
                        className="danger-button"
                        onClick={handleSignOut}
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>

                      <button
                        className="danger-button"
                        onClick={() =>
                          setDeleteConfirm(true)
                        }
                      >
                        <Trash2 size={14} />
                        Delete Account
                      </button>

                      <button
                        className="danger-button"
                        onClick={
                          handleExportSettings
                        }
                      >
                        <Download size={14} />
                        Export Settings
                      </button>

                    </div>
                  </div>
                </section>
              </>
            )}

            {/* BOTTOM SAVE */}
            <div className="bottom-bar">
              <div className="bottom-status">
                {hasChanges
                  ? "You have unsaved changes."
                  : "Your settings are synchronized."}
              </div>

              <div className="bottom-actions">

                <button
                  className="button secondary-button"
                  onClick={handleDiscard}
                  disabled={!hasChanges}
                >
                  <RotateCcw size={14} />
                  Discard
                </button>

                <button
                  className="button save-button"
                  onClick={handleSave}
                  disabled={
                    !hasChanges ||
                    saveState === "saving"
                  }
                >
                  {saveState === "saving" ? (
                    <>
                      <RefreshCw
                        size={14}
                        className="spin"
                      />
                      Saving...
                    </>
                  ) : saveState === "saved" ? (
                    <>
                      <Check size={15} />
                      Saved
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      Save Changes
                    </>
                  )}
                </button>

              </div>
            </div>

          </main>
        </div>
      </div>

      {/* TOAST */}
      {toast.show && (
        <div
          className={`toast ${
            toast.type === "info"
              ? "info"
              : ""
          }`}
        >
          {toast.type === "info" ? (
            <Activity size={16} />
          ) : (
            <CheckCircle2 size={16} />
          )}

          {toast.message}
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteConfirm && (
        <div className="modal-backdrop">
          <div className="confirm-modal">

            <div className="confirm-icon">
              <Trash2 size={21} />
            </div>

            <h3>
              Delete Account?
            </h3>

            <p>
              This will remove the local account settings,
              saved sessions and authentication data from
              this browser. A real database account deletion
              must be connected to your backend API.
            </p>

            <div className="confirm-actions">

              <button
                className="button secondary-button"
                onClick={() =>
                  setDeleteConfirm(false)
                }
              >
                <X size={14} />
                Cancel
              </button>

              <button
                className="delete-confirm"
                onClick={handleDeleteAccount}
                disabled={dangerBusy}
              >
                {dangerBusy
                  ? "Deleting..."
                  : "Yes, Delete"}
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   COMPONENTS
========================= */

function PanelHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="panel-header">
      <div className="panel-title-wrap">
        <div className="panel-icon">
          {icon}
        </div>

        <div>
          <h2 className="panel-title">
            {title}
          </h2>

          <p className="panel-description">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
      </span>

      <input
        className="field-input"
        type={type}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
      />
    </label>
  );
}

function PasswordField({
  label,
  value,
  visible,
  onChange,
  onToggle,
}) {
  return (
    <label className="field">
      <span className="field-label">
        {label}
      </span>

      <div className="password-field">
        <input
          className="field-input"
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="••••••••"
        />

        <button
          type="button"
          className="password-eye"
          onClick={onToggle}
        >
          {visible ? (
            <EyeOff size={15} />
          ) : (
            <Eye size={15} />
          )}
        </button>
      </div>
    </label>
  );
}

function SettingRow({
  icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="setting-row">
      <div className="setting-info">
        <div className="setting-symbol">
          {icon}
        </div>

        <div>
          <h3 className="setting-name">
            {title}
          </h3>

          <p className="setting-description">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        className={`toggle ${
          enabled ? "on" : ""
        }`}
        onClick={onToggle}
        aria-label={title}
        aria-pressed={enabled}
      >
        <span />
      </button>
    </div>
  );
}

function ThemeButton({
  icon,
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      className={`theme-option ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>

      {active && (
        <Check size={11} />
      )}
    </button>
  );
}

function SystemCard({
  icon,
  label,
  value,
  valueClass = "",
}) {
  return (
    <div className="system-card">
      {icon}

      <div className="system-label">
        {label}
      </div>

      <div
        className={`system-value ${valueClass}`}
      >
        {value}
      </div>
    </div>
  );
}

function InfoMini({
  icon,
  title,
  value,
}) {
  return (
    <div
      style={{
        padding: "14px",
        border:
          "1px solid rgba(112,163,190,.10)",
        borderRadius: "13px",
        background:
          "rgba(1,9,16,.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          color: "#54eaff",
          fontSize: 10,
          fontWeight: 800,
          marginBottom: 7,
        }}
      >
        {icon}
        {title}
      </div>

      <div
        style={{
          color: "#91a5b4",
          fontSize: 10,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* =========================
   CUSTOM TOOTH ICON
========================= */

function ToothIcon({
  size = 70,
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="
          M32 14
          C23 10 14 15 13 25
          C12 34 18 42 20 50
          C22 59 20 71 26 82
          C29 88 35 89 39 84
          C43 79 42 69 50 69
          C58 69 57 79 61 84
          C65 89 71 88 74 82
          C80 71 78 59 80 50
          C82 42 88 34 87 25
          C86 15 77 10 68 14
          C61 17 57 20 50 20
          C43 20 39 17 32 14Z
        "
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />

      <path
        d="M30 31C35 25 42 24 50 25C58 24 65 25 70 31"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".8"
      />

      <path
        d="M37 43C41 40 45 39 50 40C55 39 59 40 63 43"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity=".55"
      />

      <circle
        cx="50"
        cy="53"
        r="4"
        fill="currentColor"
      />

      <circle
        cx="50"
        cy="53"
        r="13"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".3"
      />
    </svg>
  );
}