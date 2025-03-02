import { clearAuthData } from "../utils/constants";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    clearAuthData();
    return <Navigate to="/login" replace />;
  }

  return children;
};  