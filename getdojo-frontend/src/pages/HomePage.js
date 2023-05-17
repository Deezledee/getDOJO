import React from "react";
import "../index.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homePage">
      <Navbar />
      <video className="unsu" autoPlay muted controls style={{ width: "100%", height: "auto", marginBottom: "50px", marginTop: "70px" }}>
        <source src="https://res.cloudinary.com/djzhnyobz/video/upload/v1683799539/1_2_Karate_Japan_vs_Italy._Final_Male_Team_Kata._WKF_World_Karate_Champions_2012._%E7%A9%BA%E6%89%8B%E6%97%A5%E6%9C%AC_xhahjy.mp4" type="video/mp4" />
      </video>
      <Link to="/random-chuck">
        <button className="buttonChuck">
          Take me to a random Chuck Norris fact 🤪
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
