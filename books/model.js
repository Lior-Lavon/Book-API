const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookModle = new Schema({
  title: { type: String },
  author: { type: String },
  ganre: { type: String },
  read: { type: Boolean, default: false },
});

const modle = mongoose.model('Book', bookModle);

module.exports = modle;
