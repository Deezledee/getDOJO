import { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/api.service";
import Navbar from "../components/Navbar";

function AddTechnique() {
  const [title, setTitle] = useState("");
  const [image, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    service
      .uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.fileUrl);
      })
      .catch((err) =>
        console.log("Error while uploading the file: ", err)
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    service
      .createTechnique({ title, image, description })
      .then((res) => {
        setTitle("");
        setImageUrl("");
        setDescription("");
        navigate("/techniques");
      })
      .catch((err) =>
        console.log("Error while adding the new technique: ", err)
      );
  };

  return (
    <div className="addTechnique">
      <div className="addTechniqueCard">
          <Navbar />
           <h2 className="addYouOwn">Add Your Own Technique</h2>
          <form className="addTechniqueForm" onSubmit={handleSubmit}>
            <label className="titleAddTechnique">Title</label>
            <input
            className="addTitleBox"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label className="descriptionAddTechnique">Description</label>
            <textarea
            className="addTechniqueBox"
              type="text"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="uploadButtonAddTechnique">
              Upload Image
              <input type="file" required onChange={(e) => handleFileUpload(e)} style={{ display: "none" }} />
            </label>

            <button type="submit" className="saveNewAddedTechnique">Save New Technique</button>
           
          </form>
      </div>
    </div>
  );
}

export default AddTechnique;
