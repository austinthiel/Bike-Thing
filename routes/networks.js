const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Network = mongoose.model('Network');

/* GET all networks. */
router.get('/', (req, res) => {
  Network.find({}, (err, networks) => {
    if (err) {
      res.json({
        status: 'ERROR',
        result: err,
      });
    } else if (!networks) {
      res.json({
        status: 'ERROR',
        result: 'No networks found',
      });
    } else {
      res.json({
        status: 'OK',
        result: networks,
      });
    }
  });
});

/* GET one network given _id. */
router.get('/:id', (req, res) => {
  Network.findById(mongoose.Types.ObjectId(req.params.id), (err, network) => {
    if (err) {
      res.json({
        status: 'ERROR',
        result: err,
      });
    } else if (!network) {
      res.json({
        status: 'ERROR',
        result: 'No network exists under that ID',
      });
    } else {
      res.json({
        status: 'OK',
        result: network,
      });
    }
  });
});

module.exports = router;
