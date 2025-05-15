import { Navigate } from "react-router-dom";

// check if the user logged in has a token
export default function ProtectedRoutes({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
