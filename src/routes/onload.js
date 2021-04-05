//MODULES
const express = require('express');
const router = express.Router();

const getWeatherOnLoad = require('../controllers/onloadWeather')


// ROUTE
router.post('/onload', getWeatherOnLoad); 
 

module.exports = router;