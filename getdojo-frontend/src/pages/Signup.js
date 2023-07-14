import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "./../services/auth.service";
import "../index.css";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="cardSignUp">
      <div className="Signup">
        <h1 className="signuph1">Sign Up</h1>

        <form onSubmit={handleSignupSubmit}>
          <label className="signUpLabel">
            Email:
            <input className="signUpInput"
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
            />
          </label>

          <label className="signUpLabel">
            Password:
            <input className="signUpInput"
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
            />
          </label>

          <label className="signUpLabel">
            Name:
            <input className="signUpInput"
              type="text"
              name="name"
              value={name}
              onChange={handleName}
            />
          </label>

          <button className="SignupThroughSignupButton" type="submit">Sign Up</button>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have an account?</p>
        <button className="login-button" onClick={() => navigate("/login")}>
          {" "}
          Login
        </button>
      </div>
      <img src="https://res.cloudinary.com/iujg6ghfdf/image/upload/v1689279691/7n_shanghaidawnishappening00_fggjye.jpg" alt="jackie-chan-signup" className="jackie-chan-signup" width="400"/>
    </div>
  );
}

export default Signup;
