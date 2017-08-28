var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Network = mongoose.model("Network");
var Station = mongoose.model("Station");
var Review = mongoose.model("Review");

/* GET one station given _id. */
router.get("/:_id", function(req, res, next) {
  Station.findById(mongoose.Types.ObjectId(req.params._id), function(
    err,
    station
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(station);
    }
  });
});

/* PUT 
  update one or more of the following attributes in station given _id:
  => empty_slots
  => is_closed
  => is_safe
*/
router.put("/:_id", function(req, res, next) {
  Station.findById(mongoose.Types.ObjectId(req.params._id), function(
    err,
    station
  ) {
    if (
      err ||
      req.body.empty_slots < 0 ||
      (typeof req.body.is_closed !== "boolean" &&
        req.body.is_closed !== undefined) ||
      (typeof req.body.is_safe !== "boolean" && req.body.is_safe !== undefined)
    ) {
      res.status(500).send(err);
    } else {
      if (req.body.empty_slots === undefined) {
        station.empty_slots = station.empty_slots;
      } else {
        station.empty_slots = req.body.empty_slots;
      }
      if (req.body.is_closed === undefined) {
        station.is_closed = station.is_closed;
      } else {
        station.is_closed = req.body.is_closed;
      }
      if (req.body.is_safe === undefined) {
        station.is_safe = station.is_safe;
      } else {
        station.is_safe = req.body.is_safe;
      }

      station.save((err, station) => {
        if (err) {
          res.status(500).send(err);
        }
        res.send(station);
      });
    }
  });
});

module.exports = router;
