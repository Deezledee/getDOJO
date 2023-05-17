import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005/api"
});

const errorHandler = (err) => {
  throw err;
};

const getTechnique = (id) => {
  return api.get(`/techniques/${id}`)
  .then((res) => res.data)
    .catch(errorHandler);
};

const uploadImage = (file) => {
  console.log(file)
  return api.post("/upload", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createTechnique = (newTechnique) => {
  return api.post("/techniques", newTechnique)
    .then(res => res.data)
    .catch(errorHandler);
};

const createUserDetails = (newUserDetails) => {
  return api.put("/create-profile-page", newUserDetails)
    .then(res => res.data)
    .catch(errorHandler);
};


const updateTechnique = (id, requestBody) => {
  return api.put(`/techniques/${id}`, requestBody)
  .then(res => res.data)
    .catch(errorHandler);
};

export default {
  getTechnique,
  uploadImage,
  createTechnique,
  updateTechnique,
  createUserDetails
};