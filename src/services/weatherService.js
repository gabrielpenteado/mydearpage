require('dotenv').config();

const { fetchWeatherApi } = require('openmeteo');

var qs = require('qs');


// URLs API WEATHER
const url = "https://api.open-meteo.com/v1/forecast";

// Helper function to form time ranges
const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);


// GET WEATHER ON LOAD
const byCoords = async (req, res) => {
    const { lat, lon } = req.body;
    // console.log(lat, lon);

    const params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "relative_humidity_2m", "weather_code"],
        "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min"],
    };

    try {
        const responses1 = await fetchWeatherApi(url, params);
        const response = responses1[0];

        // Attributes for timezone and location
        const current = response.current();
        const daily = response.daily();
        const time = new Date();

        const weatherData = {
            current: {
                dayOfWeek: time.getUTCDay(),
                temperature2m: current.variables(0).value(),
                relativeHumidity2m: current.variables(1).value(),
                weatherCode: current.variables(2).value(),
            },
            daily: {
                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval())
                    .map(
                        (t) => new Date(t * 1000))
                    .filter((date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);  // Zera a hora para comparar apenas a data
                        return date.getUTCFullYear() !== today.getUTCFullYear() ||
                            date.getUTCMonth() !== today.getUTCMonth() ||
                            date.getUTCDate() !== today.getUTCDate();
                    }),
                weatherCode: Object.values(daily.variables(0).valuesArray()),
                temperature2mMax: Object.values(daily.variables(1).valuesArray()),
                temperature2mMin: Object.values(daily.variables(2).valuesArray()),
            },
        };

        const dailyWeather = weatherData.daily.time.map((time, index) => ({
            time: time, // Hora do dia (convertido para Date)
            dayOfWeek: time.getUTCDay(),
            tempMax: weatherData.daily.temperature2mMax[index],
            tempMin: weatherData.daily.temperature2mMin[index],
            weatherCode: weatherData.daily.weatherCode[index],
        }));

        console.log(
            weatherData.current.dayOfWeek,
            weatherData.current.weatherCode,
            weatherData.current.temperature2m,
            weatherData.current.relativeHumidity2m
        );

        for (let i = 0; i < weatherData.daily.time.length; i++) {
            console.log(
                weatherData.daily.time[i].getUTCDay(),
                weatherData.daily.weatherCode[i],
                weatherData.daily.temperature2mMax[i],
                weatherData.daily.temperature2mMin[i]
            );
        }

        const onloadData = {
            today: weatherData.current,
            nextDays: dailyWeather
        };
        //SEND DATA TO CLIENT
        return onloadData;

    } catch (error) {
        console.log(error)
    }
}


// GET WEATHER BY TYPING CITY NAME
const byCity = async (req, res) => {
    const { q: city } = req.body;
    // console.log(city);

    try {
        // Step 1: Get coordinates from Geocoding API
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();
        // console.log(geoData.results[0].name)
        // console.log(geoData.results[0].country_code)
        // console.log(geoData.results[0].latitude)
        // console.log(geoData.results[0].longitude)

        // TODAY WEATHER
        const params = {
            "latitude": geoData.results[0].latitude,
            "longitude": geoData.results[0].longitude,
            "current": ["temperature_2m", "relative_humidity_2m", "weather_code"],
            "daily": ["weather_code", "temperature_2m_max", "temperature_2m_min"],
        };


        // TODAY WEATHER
        const responses1 = await fetchWeatherApi(url, params);
        const response = responses1[0];

        // Attributes for timezone and location
        const current = response.current();
        const daily = response.daily();
        const time = new Date();

        const weatherData = {
            local: {
                city: geoData.results[0].name,
                country: geoData.results[0].country_code
            },
            current: {
                dayOfWeek: time.getDay(),
                temperature2m: current.variables(0).value(),
                relativeHumidity2m: current.variables(1).value(),
                weatherCode: current.variables(2).value(),
            },
            daily: {
                time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval())
                    .map(
                        (t) => new Date(t * 1000))
                    .filter((date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);  // Zera a hora para comparar apenas a data
                        return date.getUTCFullYear() !== today.getUTCFullYear() ||
                            date.getUTCMonth() !== today.getUTCMonth() ||
                            date.getUTCDate() !== today.getUTCDate();
                    }),
                weatherCode: daily.variables(0).valuesArray(),
                temperature2mMax: daily.variables(1).valuesArray(),
                temperature2mMin: daily.variables(2).valuesArray(),
            },

        };

        console.log(weatherData.daily.time);

        const dailyWeather = weatherData.daily.time.map((time, index) => ({
            time: time, // Hora do dia (convertido para Date)
            dayOfWeek: time.getUTCDay(),
            tempMax: weatherData.daily.temperature2mMax[index],
            tempMin: weatherData.daily.temperature2mMin[index],
            weatherCode: weatherData.daily.weatherCode[index],
        }));



        console.log(
            weatherData.current.dayOfWeek,
            weatherData.current.temperature2m,
            weatherData.current.relativeHumidity2m,
            weatherData.current.weatherCode,
        );


        for (let i = 0; i < weatherData.daily.time.length; i++) {
            console.log(
                weatherData.daily.time[i].getUTCDay(),
                weatherData.daily.weatherCode[i],
                weatherData.daily.temperature2mMax[i],
                weatherData.daily.temperature2mMin[i]
            );
        }

        const citynameData = {
            local: weatherData.local,
            today: weatherData.current,
            nextDays: dailyWeather
        };
        // SEND DATA TO CLIENT
        return citynameData;

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    byCoords,
    byCity
};