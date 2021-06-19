//MODULES
const express = require('express');
const router = express.Router();

const weatherController = require('../controllers/weatherController');

// ROUTE
router.post('/onload', weatherController.byGeolocation);
router.post('/cityname', weatherController.byCityName); 

 
module.exports = router;