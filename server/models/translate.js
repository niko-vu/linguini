const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  phrase: {
    type: String,
    required: true,
  },
  translatedPhrase: {
    type: String,
    required: true,
  },
  targetLanguage: {
    type: Schema.Types.ObjectId,
    ref: 'Language',
    required: true,
  },
  // You can include additional note-related fields here
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;