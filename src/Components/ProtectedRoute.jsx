import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // مؤقتًا أثناء التطوير
  return children;

  // هنرجع الكود ده لما نضيف نظام Login الحقيقي
  /*
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
  */
}