import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


function MartialArtists() {
  const [martialArtists, setMartialArtists] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = process.env.REACT_APP_API_URL

  useEffect(() => {
    axios
      .get(`${API_URL}/api/martial-artists`)
      .then((response) => {
        setMartialArtists(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMartialArtists = martialArtists.filter((martialArtist) =>
    martialArtist.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="martialArtistsPage">
      <Navbar />
      <div>
        <h1 className="hereAreSome">
          Here are some people you may have not known practiced Martial Arts
        </h1>
        <input
          className="searchBarMartialArtists"
          type="text"
          placeholder="Search for a Martial Artist..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <div className="card-container">
          {filteredMartialArtists.map((martialArtist) => (
            <div key={martialArtist._id} className="card">
              <div className="martialArtistsLink">
                <img
                  src={martialArtist.image}
                  alt="martialArtist"
                  width="200"
                  style={{ borderRadius: "10px" }}
                />
                <h3 className="nameMartialArtist">
                  Name: {martialArtist.title}
                </h3>
                <p className="aboutMartialArtist">
                  About: {martialArtist.about}
                </p>
                <p className="ranking">Ranking: {martialArtist.ranking}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/random-chuck">
          <button className="buttonChuck">
            Take me to a random Chuck Norris fact 🤪
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MartialArtists;
