import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function RandomChuck() {
  const [joke, setJoke] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setJoke(data.value);
      });
  }, []);

  return (
    <div className="RandomChuckNorrisJoke">
      <button
        className="signupButtonThroughLogin"
        onClick={() => navigate("/home-page")}>Back to Home</button>
      <div className="cardChuck">
        <p>{joke}</p>
      </div>
    </div>
  );
}

export default RandomChuck;
