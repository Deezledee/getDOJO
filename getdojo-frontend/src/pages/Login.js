import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import authService from "./../services/auth.service";
import axios from "axios"
import "../index.css";



function Login(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, setIsLoading, setIsLoggedIn, setUser } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API_URL
  console.log("api url ", API_URL)

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    // axios.post(`${API_URL}/auth/login`, requestBody

    authService.login(requestBody)
      .then((response) => {
        
        storeToken(response.data.authToken);

        const storedToken = localStorage.getItem("authToken");
        axios.get(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}`} })
        .then((response) => {
          const user = response.data;
        // Update state variables        
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);

          navigate("/create-profile-page")
      })
      .catch((error) => {
        console.log("error happened")
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        })
  })
  }
  
  return (
    <div className="cardLogin">


    <div className="Login">
      <h1 className="loginh1">Login</h1>
     
      <form onSubmit={handleLoginSubmit}>
        <label className="loginLabel">Email:</label>
        <input className="loginInput" type="email" name="email" value={email} onChange={handleEmail} />

        <label className="loginLabel">Password:</label>
        <input className="loginInput" type="password" name="password" value={password} onChange={handlePassword} />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button className="loginButtonThroughLogin" type="submit">Login</button>
        </div>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <button className="signupButtonThroughLogin" onClick={() => navigate("/signup")}>
      {" "}
          Sign up
        </button>
    </div>
    <img src="https://res.cloudinary.com/djzhnyobz/image/upload/v1683748476/chuck-norris2_kuq28z.jpg" alt="chuck-norris-login" className="chuck-norris-login"/>

    </div>

  )
}

export default Login;
