const express = require('express');

const router = express.Router();

const flightsController  = require('../controllers/flights')

router.get('/users_flights/:id', flightsController.getData)

router.route('/:database')
    .get(flightsController.getData)
    .post(flightsController.postData)
    .put(flightsController.putFlight);

router.delete('/:database/:id', flightsController.deleteFlight);

module.exports = router;
