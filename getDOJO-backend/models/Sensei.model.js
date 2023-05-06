const mongoose = require('mongoose');

const senseiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  ranking: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Sensei', senseiSchema);
