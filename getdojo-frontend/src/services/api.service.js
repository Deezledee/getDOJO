import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL


const api = axios.create({
  baseURL: `${API_URL}`
});

const errorHandler = (err) => {
  throw err;
};

const getTechnique = (id) => {
  return api.get(`/api/techniques/${id}`)
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
  return api.post("/api/techniques", newTechnique)
    .then(res => res.data)
    .catch(errorHandler);
};

const createUserDetails = (newUserDetails) => {
  return api.put("/create-profile-page", newUserDetails)
    .then(res => res.data)
    .catch(errorHandler);
};


const updateTechnique = (id, requestBody) => {
  return api.put(`/api/techniques/${id}`, requestBody)
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