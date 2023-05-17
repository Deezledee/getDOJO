import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import Navbar from "../components/Navbar";
import axios from "axios";
import service from "../services/api.service";

function CreateProfile() {
  const [isChecked, setIsChecked] = useState(false);
  const [about, setAbout] = useState("");
  const [picture, setPicture] = useState("");
  const { user } = useContext(AuthContext);

  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/create-profile-page/${user._id}`)
      .then((response) => {
        setAbout(response.data.about);
        setPicture(response.data.picture);
        setIsChecked(response.data.termsAccepted);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAboutChange = (event) => {
    setAbout(event.target.value);
  };

  const handlePictureChange = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", event.target.files[0]);

    service
      .uploadImage(formData)
      .then((response) => {
        setPicture(response.fileUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`http://localhost:5005/api/create-profile-page/${user._id}`, {
        about: about,
        termsAccepted: isChecked,
        picture: picture,
      })
      .then((response) => {
        window.location.reload();
        // navigate("/create-profile-page");
      })
      .catch((error) => {
        console.log(error);
        alert("Error updating details.");
      });
  };

  return (
    <div className="createProfilePage">
      <Navbar />
      <div className="cardsFormContainer">
        <div className="containerCreateProfile">
          <div className="oneCardCreate">
            <h1 className="heyThere">
              Hey there,{" "}
              <span className="userNameCreate">{user && user.name} 🥋</span>
              <span>{user && user.picture}</span>
            </h1>
            <form className="formCreate" onSubmit={handleSubmit}>
              <br />
              <label className="userAboutMe" htmlFor="about">
                About me 🔷:
              </label>
              <textarea
                className="aboutMeBox"
                id="about"
                name="about"
                value={about}
                onChange={handleAboutChange}
              ></textarea>
              <br />
              <div className="termsAndUploadContainer">
                <label htmlFor="termsAccepted">
                  <input
                    type="checkbox"
                    id="terms-checkbox"
                    name="termsAccepted"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <Link
                    to="/privacy-policy-page"
                    target="_blank"
                    className="termsAndConditionsLink"
                  >
                    Terms & Conditions
                  </Link>
                </label>
                <div className="uploadContainer">
                  <label htmlFor="picture" className="uploadButton">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    id="picture"
                    name="picture"
                    onChange={handlePictureChange}
                  />
                </div>
                <button className="saveChangesCreateButton" type="submit">
                  Save Changes 🥊
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="secondCardCreate">
          <div className="postedForm">
            <h1 className="aboutMeChangeTitle">About me 🔷:</h1>
            <p className="aboutMeChangeDescription">{about}</p>
            <p>{isChecked}</p>
            {picture && (
              <img className="newuserImage" src={picture} alt="" width="300" height="350" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
