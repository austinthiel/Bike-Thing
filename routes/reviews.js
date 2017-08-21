const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Review = mongoose.model('Review');

/* POST add a review for a given station _id */
router.post('/', (req, res) => {
  const newReview = new Review({
    station_id: mongoose.Types.ObjectId(req.body.station_id),
    network_id: mongoose.Types.ObjectId(req.body.network_id),
    author: req.body.author,
    star_rating: req.body.star_rating,
    content: req.body.content,
  });
  newReview.save((err, review) => {
    if (err) {
      res.json({
        status: 'ERROR',
        result: err,
      });
    } else {
      res.json({
        status: 'OK',
        result: review,
      });
    }
  });
});

/* GET all reviews given station_id. */
router.get('/:station_id', (req, res) => {
  Review.find({ station_id: mongoose.Types.ObjectId(req.params.station_id) }, (err, reviews) => {
    if (err) {
      res.json({
        status: 'ERROR',
        result: err,
      });
    } else if (!reviews) {
      res.json({
        status: 'ERROR',
        result: 'No reviews exist under that station',
      });
    } else {
      res.json({
        status: 'OK',
        result: reviews,
      });
    }
  },
  );
});

module.exports = router;
