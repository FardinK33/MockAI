import React from "react";
import { useAuthContext } from "../../context/auth-context";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { authUser } = useAuthContext();

  return !authUser ? children : <Navigate to="/" replace />;
};

export default PublicRoute;
