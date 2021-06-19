const express = require('express');
const router = express.Router();

const indexRoute = require('./routes/indexRoute')
const weatherRoute = require('./routes/weatherRoute');

router.use('/', indexRoute);
router.use('/', weatherRoute);


module.exports = router;