const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  about: String,
  termsAccepted: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/djzhnyobz/image/upload/v1684081363/karate-gallery/tz70lr2l35bttpa7w8wm.jpg",
  },
  profileCreated: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;
