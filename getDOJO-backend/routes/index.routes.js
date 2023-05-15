
const router = require("express").Router();
const Technique = require("../models/Technique.model");
const Sensei = require("../models/Sensei.model");
const User = require("../models/User.model");
const axios = require("axios");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const fileUploader = require("../config/cloudinary.config");
const mongoose = require("mongoose");



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
  const { about, termsAccepted } = req.body;
  const {id} = req.params
  console.log("data ", req.body)
  if (about && termsAccepted, isAuthenticated) {
    User.findByIdAndUpdate(id, {
      about,
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

//Working with Cloudinary on the Techniques - Will try to implement it on the User model in case I have time left.

router.post("/upload", fileUploader.single("image"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

router.post("/upload", fileUploader.single("picture"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});
 
router.post('/techniques', (req, res, next) => {
  Technique.create(req.body)
    .then(createdUserImage => {
      res.status(200).json(createdUserImage);
    })
    .catch(err => next(err));
});


router.put("/techniques/:techniqueId", (req, res, next) => {
  const { techniqueId } = req.params;

  console.log(techniqueId)

  if (!mongoose.Types.ObjectId.isValid(techniqueId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Technique.findByIdAndUpdate(techniqueId, req.body, { new: true })
    .then((updatedTechnique) => res.json(updatedTechnique))
    .catch((error) => res.json(error));
});


router.delete('/techniques/:id', (req, res, next) => {
  const { id } = req.params;

  Technique.findByIdAndDelete(id)
    .then(deletedTechnique => {
      if (deletedTechnique) {
        res.json({ message: `Technique with id ${id} was deleted successfully.` });
      } else {
        res.json({ message: `No technique found with id ${id}.` });
      }
    })
    .catch(err => next(err));
});


module.exports = router;
