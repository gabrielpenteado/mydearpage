//IMPORTS
const express = require('express');
const app = express();
const path = require('path');
const axios = require('axios');
var qs = require('qs');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// STATIC FILES
app.use(express.static('public'));

// PARSE INCOMING DATA AS JSON
app.use(express.json({limit: '1mb'}));

// URLs API WEATHER
const todayURL = 'https://api.openweathermap.org/data/2.5/weather';
const nextDaysURL = 'https://api.openweathermap.org/data/2.5/onecall';



// MIDDLEWARES
function sendHTML (req, res) {
  res.sendFile(path.join(__dirname, '/views/index.html'))
}



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
  next();  
}



async function getWeatherByCity (req, res) {
  const cityName = req.body;
  // console.log(cityName);
  cityName.appid = process.env.weatherApiKey;
  const citynameQueryString1 = qs.stringify(cityName);
  // console.log(`${todayURL}?${citynameQueryString1}&units=metric`);

  try {
    // TODAY WEATHER
    const response1 = await axios(`${todayURL}?${citynameQueryString1}&units=metric`);
    const weatherData1 = await response1.data;

    // NEXT DAYS WEATHER
    const latlon = {
      lat: weatherData1.coord.lat,
      lon: weatherData1.coord.lon
    };
    latlon.appid = process.env.weatherApiKey;
    const citynameQueryString2 = qs.stringify(latlon);
    // console.log(citynameQueryString2);

    const response2 = await axios(`${nextDaysURL}?${citynameQueryString2}&exclude=current,minutely,hourly&units=metric`);
    const weatherData2 = await response2.data;

    const citynameData = {
      today: weatherData1,
      nextDays: weatherData2
    };
    // SEND DATA TO CLIENT
    res.send(citynameData);

  } catch (err) {
    console.log(err);
  }
}


//ROUTES
app.get('/', sendHTML);
app.post('/onload', getWeatherOnLoad);
app.post('/cityname', getWeatherByCity);



// LISTEN ON ${PORT}
app.listen(PORT, () => console.log(`Server is ON. Access http://localhost:${PORT}`))