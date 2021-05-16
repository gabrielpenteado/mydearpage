//MODULES
const express = require('express');
const router = express.Router();

const getWeatherByCity = require('../controllers/citynameWeather')


// ROUTE
router.post('/cityname', getWeatherByCity); 
 

module.exports = router;