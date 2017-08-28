var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var stationSchema = new Schema({
    empty_slots: {
        type: Number,
        required: true,
        min: [0, 'Negative empty slots not allowed.']
    },
    free_bikes: {
        type: Number,
        required: true,
        min: [0, 'Free bikes not allowed.']
    },
    latitude: {
        type: Number,
        required: true,
        min: [0, 'Negative latitude not allowed.'],
        max: [90, 'Greater than 90 latitude not allowed.']
    },
    longitude: {
        type: Number,
        required: true,
        min: [-180, 'Less than -180 longitude not allowed.'],
        max: [180, 'Greater than 180 longitude not allowed.']
    },
    name: {
        type: String,
        required: true,
        maxlength: [50, 'Name must be less than 50 characters.']
    },
    network_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    is_closed: {
        type: Boolean,
        required: true
    },
    is_safe: {
        type: Boolean,
        required: true
    }
});


module.exports = mongoose.model('Station', stationSchema);
