const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const networkSchema = new Schema({
  company: {
    type: [String],
    required: true,
  },
  location: {
    city: {
      type: String,
      required: true,
      maxlength: [50, 'City must be less than 50 characters.'],
    },
    country: {
      type: String,
      required: true,
      maxlength: [50, 'Country must be less than 50 characters.'],
    },
    latitude: {
      type: Number,
      required: true,
      min: [0, 'Negative latitude not allowed.'],
      max: [90, 'Greater than 90 latitude not allowed.'],
    },
    longitude: {
      type: Number,
      required: true,
      min: [-180, 'Less than -180 longitude not allowed.'],
      max: [180, 'Greater than 180 longitude not allowed.'],
    },
  },
  name: {
    type: String,
    required: true,
    maxlength: [50, 'Name must be less than 50 characters.'],
  },
});


module.exports = mongoose.model('Network', networkSchema);
