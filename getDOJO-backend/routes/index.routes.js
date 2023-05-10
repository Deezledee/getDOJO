// index.routes.js

const router = require("express").Router();
const Technique = require("../models/Technique.model");
const Sensei = require("../models/Sensei.model");
const User = require("../models/User.model");
//const { uploader, cloudinary } = require("../config/cloudinary.config")
const axios = require("axios");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.get("/techniques", (req, res, next) => {
  Technique.find()
    .then((allTechniques) => res.json(allTechniques))
    .catch((err) => res.json(err));
});

router.get("/martial-artists", (req, res, next) => {
  Sensei.find()
    .then((allSenseis) => res.json(allSenseis))
    .catch((err) => res.json(err));
});

router.get("/random-chuck", (req, res, next) => {
  axios
    .get("https://api.chucknorris.io/jokes/random")
    .then((response) => {
      const joke = response.data.value;
      res.render("random-chuck", { joke });
    })
    .catch((err) => next(err));
});

router.post("/create-profile-page/:id", (req, res, next) => {
  const { about, picture, termsAccepted } = req.body;
  const {id} = req.params
  
  if (about && picture && termsAccepted, isAuthenticated) {
    User.findByIdAndUpdate(id, {
      about,
      picture,
      termsAccepted,
      profileCreated: true
    }, { new: true })
      .then((user) => {
        user.password = ""
        res.json( { user });
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.json("Please fill in all required fields and accept the terms.");
  }
});



module.exports = router;
