var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Network = mongoose.model('Network');
var Station = mongoose.model('Station');
var Review = mongoose.model('Review');

/* GET one station given _id. */
router.get('/:_id', function(req, res, next) {
  Station.findById(mongoose.Types.ObjectId(req.params._id), function(err, station) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(station);
    }
  });
});

/* GET stations given network _id */
router.get('/network/:network_id', function(req, res, next) {
  Station.find({"network_id": mongoose.Types.ObjectId(req.params.network_id)}, function(err, station) {
    if(err) {
      console.log(err);
    }
    else {
      res.json(station);
    }
  });
});

/* PUT 
  update one or more of the following attributes in station given _id:
  => empty_slots
  => isClosed
  => isSafe
*/
router.put('/:_id', function(req, res, next) {
  Station.findById(mongoose.Types.ObjectId(req.params._id), function(err, station) {
    if(err) {
      res.status(500).send(err);
    }
    else {
      station.empty_slots = req.body.empty_slots || station.empty_slots;
      //TODO: booleans dont change properly, bad input defaults to true (not intended)
      //station.isClosed = req.body.isClosed; 
      //station.isSafe = req.body.isSafe || station.isSafe;

      station.save((err, station) => {
          if(err) {
            res.status(500).send(err);
          }
          res.send(station);
      });
    }
  });
});

module.exports = router;