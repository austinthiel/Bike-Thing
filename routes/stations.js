const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Station = mongoose.model('Station');

/* GET one station given _id. */
router.get('/:_id', (req, res) => {
  Station.findById(mongoose.Types.ObjectId(req.params.id), (err, station) => {
    if (err) {
      res.json({
        status: 'ERROR',
        result: err,
      });
    } else if (!station) {
      res.json({
        status: 'ERROR',
        result: 'No station exists under that ID',
      });
    } else {
      res.json({
        status: 'OK',
        result: station,
      });
    }
  });
});

/* PUT 
  update one or more of the following attributes in station given _id:
  => empty_slots
  => isClosed
  => isSafe
*/
// router.put('/:id', (req, res) => {
//   Station.findById(mongoose.Types.ObjectId(req.params.id), (err, station) => {
//     if (err) {
//       res.json({
//         status: 'ERROR',
//         result: err,
//       });
//     } else if (!station) {
//       res.json({
//         status: 'ERROR',
//         result: 'No station exists under that ID',
//       });
//     } else {
//       station.empty_slots = req.body.empty_slots || station.empty_slots;
//       // TODO: booleans dont change properly, bad input defaults to true (not intended)
//       // station.isClosed = req.body.isClosed;
//       // station.isSafe = req.body.isSafe || station.isSafe;

//       station.save((err, station) => {
//         if (err) {
//           res.json({
//             status: 'ERROR',
//             result: err,
//           });
//         }
//         res.json({
//           status: 'OK',
//           result: station,
//         });
//       });
//     }
//   });
// });

module.exports = router;
