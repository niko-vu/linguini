const mongoose = require('mongoose');

const { Schema } = mongoose;

const translationSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  language: {
    type: String,
    required: true,
    trim: true
  },
});

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;