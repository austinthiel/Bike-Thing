const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  station_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  network_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  author: {
    type: String,
    required: true,
    maxlength: [50, 'Author must be less than 50 characters.'],
  },
  star_rating: {
    type: Number,
    required: true,
    min: [0, 'Negative star rating not allowed.'],
    max: [5, 'Greater than 5 star rating not allowed.'],
  },
  content: {
    type: String,
    required: true,
    minLength: [140, 'Content must be at least 140 characters.'],
  },
});


module.exports = mongoose.model('Review', reviewSchema);
