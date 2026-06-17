import React, { useState, useEffect, useCallback } from "react";
import authService from "../services/auth.service";


const VERIFY_TIMEOUT_MS = 4500;

const withTimeout = (promise, timeoutMs) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error("Verify request timed out"));
    }, timeoutMs);

    promise
      .then((value) => {
        clearTimeout(timeoutId);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timeoutId);
        reject(error);
      });
  });
};


const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = useCallback(() => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }, []);
    
  const authenticateUser = useCallback(() => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    setIsLoading(true);
    
    // If the token exists in the localStorage
    if (storedToken) {
      // axios.get(
      //  `${API_URL}/auth/verify`, 
      //  { headers: { Authorization: `Bearer ${storedToken}`} }
      // )

      withTimeout(authService.verify(), VERIFY_TIMEOUT_MS)
        .then((response) => {
          const user = response.data;
        // Update state variables        
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          // Update state variables        
          removeToken();
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });

    } else {
      // If the token is not available
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }, [removeToken]);
  
  const logOutUser = () => {
    removeToken();
    authenticateUser();

  };


  useEffect(() => {

    authenticateUser();
  }, [authenticateUser]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser, setIsLoading, setIsLoggedIn, setUser }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };