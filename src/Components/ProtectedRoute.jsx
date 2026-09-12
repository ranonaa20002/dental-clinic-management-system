import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // مفيش Login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // نوع الحساب
  const accountType = String(
    user?.AccountType || user?.accountType || ""
  ).toLowerCase();

  // لو Route محدد بصلاحيات
  if (
    allowedRoles.length > 0 &&
    !allowedRoles
      .map((role) => role.toLowerCase())
      .includes(accountType)
  ) {
    // Doctor → Dashboard
    if (accountType === "doctor") {
      return <Navigate to="/dashboard" replace />;
    }

    // Patient → Care
    if (accountType === "patient") {
      return <Navigate to="/care" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}