import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import AppLoader from "./AppLoader";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const hasToken = Boolean(localStorage.getItem("authToken"));

  if (!hasToken) {
    return <Navigate to="/" />;
  }

  // If the authentication is still loading ⏳
  if (isLoading) return <AppLoader label="Preparing your dojo..." />;

  if (!isLoggedIn) {
  // If the user is not logged in ❌
    return <Navigate to="/" />;
  } else {
  // If the user is logged in, allow to see the page ✅
    return children;
  }
}

export default IsPrivate;