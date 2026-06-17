import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";
import AppLoader from "./AppLoader";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const hasToken = Boolean(localStorage.getItem("authToken"));

  // If the authentication is still loading ⏳
  if (isLoading && !hasToken) return children;
  if (isLoading) return <AppLoader label="Checking your session..." />;

  if (isLoggedIn) {
    // If the user is logged in, navigate to home page ❌    
    return <Navigate to="/home-page" />;
  } else {
    // If the user is not logged in, allow to see the page ✅
    return children;
  }
}

export default IsAnon;