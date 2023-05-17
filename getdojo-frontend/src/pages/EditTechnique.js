import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import service from "../services/api.service";


function EditTechnique(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate =  useNavigate();
  const { techniqueId } = useParams();
  
  

  const handleFormSubmit = (e) => {
    e.preventDefault();


    service
      .updateTechnique(techniqueId, { title, description })
      .then((res) => {
        setTitle("");
        setDescription("");
        navigate("/techniques");
      })
      .catch((err) =>
        console.log("Error while editing the new technique: ", err)
      );
  };

  
  

  return (
      
    <div className="editTechniquePage">
      <h3 className="editTechniqueTitle">Edit this Technique 📝</h3>

      <form className="editTechniqueCard" onSubmit={handleFormSubmit}>
        <label className="editTitle">Title:</label>
        <input
        className="editTechniqueTitleBox"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label className="editDescription">Description:</label>
        <textarea
        className="editTechniqueDescriptionBox"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="updateTechniqueButton" type="submit">Update Technique</button>
      </form>
    </div>
  );
}

export default EditTechnique;

