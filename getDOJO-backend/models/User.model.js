const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  interests: [String],
  about: String,
  termsAccepted: {
    type: Boolean,
    default: false,
  },
  picture: {
    type: String,
    default:
      "https://res.cloudinary.com/djzhnyobz/image/upload/v1683477630/Karate-Assets/cartoon-martial-arts_ztvol8.jpg",
  },
  profileCreated: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;
