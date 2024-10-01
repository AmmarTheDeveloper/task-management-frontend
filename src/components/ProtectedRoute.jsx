import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectAuthPage = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" /> : children;
};
