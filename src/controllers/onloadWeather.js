// MODULES
// const express = require('express');
// const app = express();
const axios = require('axios');
var qs = require('qs');
require('dotenv').config();

//CONFIG
// app.use(express.json({ limit: '1mb' }));

// URLs API WEATHER
const todayURL = 'https://api.openweathermap.org/data/2.5/weather';
const nextDaysURL = 'https://api.openweathermap.org/data/2.5/onecall';


// MIDDLEWARE - GET WEATHER ON LOAD
async function getWeatherOnLoad (req, res, next) {
  const coords = req.body;
  coords.appid = process.env.weatherApiKey;
  const coordsQueryString = qs.stringify(coords);
  // console.log(`${todayURL}?lat=${coordsQueryString}&units=metric`);

  try {
    // TODAY WEATHER
    const response1 = await axios(`${todayURL}?${coordsQueryString}&units=metric`);
    const weatherData1 = await response1.data;
    // NEXTDAYS WEATHER
    const response2 = await axios(`${nextDaysURL}?${coordsQueryString}&exclude=current,minutely,hourly&units=metric`);
    const weatherData2 = await response2.data;

    const onloadData = {
      today: weatherData1,
      nextDays: weatherData2
    };
    //SEND DATA TO CLIENT
    res.send(onloadData);

  } catch (err) {
    console.log(err)
  }

}

module.exports = getWeatherOnLoad;
