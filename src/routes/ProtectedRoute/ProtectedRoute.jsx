import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // يتحقق مما إذا كان هناك توكن أو مستخدم مسجل في الـ localStorage
  const isAuthenticated = localStorage.getItem("user") || localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}