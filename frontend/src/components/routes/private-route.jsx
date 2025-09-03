import React from "react";
import { useAuthContext } from "../../context/auth-context";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { authUser } = useAuthContext();
  return authUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
