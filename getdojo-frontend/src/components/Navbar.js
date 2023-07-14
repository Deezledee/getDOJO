import { useContext, useState, useEffect, React } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import axios from "axios";


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [picture, setPicture] = useState("");
  const API_URL = process.env.REACT_APP_API_URL


  useEffect(() => {
    axios
      .get(`${API_URL}/api/create-profile-page/${user._id}`)
      .then((response) => {
        setPicture(response.data.picture);

        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]); 


  return (
    <nav>
      {isLoggedIn && (
        <>
          <img
            src="https://res.cloudinary.com/iujg6ghfdf/image/upload/v1689337930/getdojo-logo_xqikq7.png"
            alt="getDOJO-logo"
            className="getDOJO-logo"
            width={85}
          />

          <Link to="/home-page">
            <button>Home</button>
          </Link>

          <Link to="/techniques">
            <button>Techniques</button>
          </Link>

          <Link to="/add-technique">
            <button>Add Your Own Technique</button>
          </Link>

          <Link to="/martial-artists">
            <button>Martial Artists</button>
          </Link>

          <Link to="/quiz">
            <button>Try this Quiz</button>
          </Link>

          <div className="usernameLogOut">
          <span className="userPictureTopScreen">

          {picture && <img className="userPictureOnNavbar" src={picture} alt="User" width={35} />}

            </span>
            <span className="usernameTopScreen">{user && user.name}</span>
        
            <Link to="/create-profile-page">
              <button>My Profile</button>
            </Link>
            <button onClick={logOutUser}>Logout</button>
          </div>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
