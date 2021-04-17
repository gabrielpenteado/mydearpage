const axios = require('axios');
var qs = require('qs');
require('dotenv').config();

// URLs API WEATHER
const todayURL = 'https://api.openweathermap.org/data/2.5/weather';
const nextDaysURL = 'https://api.openweathermap.org/data/2.5/onecall';

// MIDDLEWARE - GET WEATHER BY TYPING CUITY NAME
async function getWeatherByCity (req, res, next) {
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
    console.log(err.response.data);
    res.json(err.response.data);
  }
}

module.exports = getWeatherByCity;