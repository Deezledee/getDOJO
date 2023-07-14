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
      "https://res.cloudinary.com/iujg6ghfdf/image/upload/v1689337572/cartoon-martial-arts_oud1rp.jpg",
  },
  profileCreated: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;
