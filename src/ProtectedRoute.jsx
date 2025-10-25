import { Navigate, useLocation } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("authToken"); // example auth check
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
