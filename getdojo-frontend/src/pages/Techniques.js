import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import service from "../services/api.service";

const API_URL = "http://localhost:5005/api";

function Techniques() {
  const [techniques, setTechniques] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [like, setLike] = useState([]);


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/techniques`)
      .then((response) => {
        console.log("response.data", response.data);
        setTechniques(response.data);
      })
      .catch((error) => console.log(error));
      const storedLikedTechniques = JSON.parse(localStorage.getItem("likedTechniques")) || [];
      setLike(storedLikedTechniques);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/techniques/${id}`)
      .then((response) => {
        console.log(response.data);
        setTechniques(techniques.filter((technique) => technique._id !== id));
      })
      .catch((error) => console.log(error));
  };

  const handleLike = (id) => {
    const updatedLikedTechniques = like.includes(id)
      ? like.filter((likedId) => likedId !== id)
      : [...like, id];
  
    setLike(updatedLikedTechniques);
    localStorage.setItem("likedTechniques", JSON.stringify(updatedLikedTechniques));
  };

  const filteredTechniques = techniques.filter((technique) => {
    return technique.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <Navbar />
      <div>
        <div className="techniquesPage">
          <input
            className="searchBarTechniques"
            type="text"
            placeholder="Search for a technique..."
            onChange={handleSearch}
          />
        </div>
        <div className="cardTechniques">
          {filteredTechniques.map((technique) => (
            <div key={technique._id} className="card">
              <Link
                className="techniquesLink"
                to={`/techniques/${technique._id}`}
              >
                <img src={technique.image} alt="technique" width="200" />
                <h3>{technique.title}</h3>
                <p>{technique.description}</p>
              </Link>
             <div className="editAndDeleteButtons">
             <h2 className="likeButton" onClick={() => handleLike(technique._id)}>
                Like: {like.includes(technique._id) ? "💖" : "♡"}
              </h2>  
              
              <Link to={`/edit-technique/${technique._id}`}>
                <button className="editTechniqueButton">Edit</button>
              </Link>

              <button
                className="deleteTechniqueButton"
                onClick={() => handleDelete(technique._id)}
              >
                Delete
              </button>     
                 
               </div>
              
            </div>
          ))}
          <Link to="/random-chuck">
            <button className="buttonChuck">
              Take me to a random Chuck Norris fact 🤪
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Techniques;
