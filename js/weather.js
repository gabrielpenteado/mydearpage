import { apiKey } from '../js/apiKey.js'
// console.log(apiKey);

// SELECT ELEMENTS
const local = document.querySelector('.local');
const notification = document.querySelector('.notification');
const todayIcon = document.querySelector('.todayIcon');
const todayDegree = document.querySelector('.todayTemperature p span');
const todayInformations = document.querySelector('.todayTemperature h3 span');
const nextDays = document.querySelector('.nextDays');
const submit = document.querySelector('.submitButton');


// CHECK IF BROWSER SUPPORT GEOLOCATION AND GET IT WHEN PAGE LOADS,
// IF NOT, DISPLAY MESSAGE TO USER TYPE CITY NAME. 
window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, displayError);
  }
})


// FUNCTION SHOW WEATHER
const showWeather = () => {
  navigator.geolocation.getCurrentPosition(position => {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;

    // GET REQUEST TODAY WEATHER    
    const api = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat +
      '&lon=' + long + '&appid=' + apiKey + '&units=metric';

    const getTodayData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        // console.log(data);

        const { temp, humidity } = data.main;
        const { icon } = data.weather[0];
        const todayData = {
          temperature: Math.round(temp),
          humidity: Math.round(humidity),
          icon: icon
        };

        // DISPLAY WEATHER TODAY
        const displayToday = () => {
          local.textContent = `${data.name} - ${data.sys.country}`;
          todayDegree.textContent = todayData.temperature;
          todayInformations.textContent = todayData.humidity;
          todayIcon.innerHTML = `<img src="../assets/weather-icons/${icon}.svg" 
          alt="todayicon">`;
        };
        displayToday();
      }
      catch (err) {
        console.log(err);
      }
    };
    getTodayData();

    // GET REQUEST NEXT DAYS WEATHER
    const api2 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +
      '&lon=' + long + '&exclude=current,minutely,hourly&appid=' + apiKey +
      '&units=metric';

    const getNextDaysData = async () => {
      try {
        const response2 = await fetch(api2);
        const data2 = await response2.json();
        // console.log(data2);

        const daily = data2.daily;
        // GET MAX AND MIN TEMP FROM EACH DAY
        const arrMaxMin = daily.map((item, index) => `
          <div class="day${[index]}">
            <div class="nextDayIcon${index}">
              <img src="../assets/weather-icons/${item.weather[0].icon}.svg"
              alt="nextdaysicons">
            </div>
            <p class="max">Max <span>${Math.round(item.temp.max)}°C</span></p>
            <p class="min">Min <span>${Math.round(item.temp.min)}°C</span></p>
          </div>
        `).slice(0, 6).join('');
        // console.log(arrMaxMin)

        //DISPLAY WEATHER OF NEXT DAYS
        const displayNextDays = () => {
          nextDays.innerHTML = arrMaxMin;
        };
        displayNextDays();
      }
      catch (err2) {
        console.log(err2);
      }
    }
    getNextDaysData();
  });

  // FUNCTION SHOW WEATHER TYPING THE CITY NAME
  // GET CITY NAME
  submit.addEventListener('click', () => {
    const cityNamecountryCode = notification.value;
    const api3 = 'https://api.openweathermap.org/data/2.5/weather?q='
     + cityNamecountryCode + '&appid=' + apiKey + '&units=metric';

    //GET REQUEST TODAY WEATHER TYPING CITY NAME
    const getTodayWeatherByCity = async () => {
      try {
        const response3 = await fetch(api3);
        const data3 = await response3.json();
        // console.log(data3);

        const { temp, humidity } = data3.main;
        const { icon } = data3.weather[0];
        const todayData3 = {
          temperature: Math.round(temp),
          humidity: Math.round(humidity),
          icon: icon
        };
        // console.log(temp, humidity, icon)

        // DISPLAY WEATHER TODAY TYPING CITY
        local.textContent = `${data3.name} - ${data3.sys.country}`;
        todayDegree.textContent = todayData3.temperature;
        todayInformations.textContent = todayData3.humidity;
        todayIcon.innerHTML = `<img src="../assets/weather-icons/${todayData3.icon}.svg" 
          alt="todayicon">`;
        // CLEAR INPUT AFTER SUBMIT
        notification.value = '';

        // GET REQUEST NEXT DAYS WEATHER TYPING CITY NAME
        const lat1 = data3.coord.lat;
        const long1 = data3.coord.lon;
        const api4 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat1 +
          '&lon=' + long1 + '&exclude=current,minutely,hourly&appid=' + apiKey +
          '&units=metric';

        const getNextDaysByCityName = async () => {
          try {
            const response4 = await fetch(api4);
            const data4 = await response4.json();
            // console.log(data4);

            const daily2 = data4.daily;
            // GET MAX AND MIN TEMP FROM EACH DAY TYPING CITY NAME
            const arrMaxMin2 = daily2.map((item, index) => `
          <div class="day${[index]}">
            <div class="nextDayIcon${index}">
              <img src="../assets/weather-icons/${item.weather[0].icon}.svg"
              alt="nextdaysicons">
            </div>
            <p class="max">Max <span>${Math.round(item.temp.max)}°C</span></p>
            <p class="min">Min <span>${Math.round(item.temp.min)}°C</span></p>
          </div>
          `).slice(0, 6).join('');
            // console.log(arrMaxMin2)

            //DISPLAY WEATHER OF NEXT DAYS TYPING CITY NAME
            const displayNextDays2 = () => {
              nextDays.innerHTML = arrMaxMin2;
            };
            displayNextDays2();
          }
          catch (err4) {
            console.log(err4);
          }
        };
        getNextDaysByCityName();
      }
      catch (err3) {
        console.log(err3);
      }
    }
    getTodayWeatherByCity();
  })
};

//DISPLAY ERROR
const displayError = () => {
  // SHOW ALERT
  alert("Write (cityname or cityname,countryabbreviation or only) to show weather. Remove parentheses and don't forget of the comma between cityname,countryabbreviation.");
  // REPEAT FUNCTION SHOW WEATHER TYPING CITY NAME
  submit.addEventListener('click', () => {
    const cityNamecountryCode1 = notification.value;
    const api5 = 'https://api.openweathermap.org/data/2.5/weather?q=' 
      + cityNamecountryCode1 + '&appid=' + apiKey + '&units=metric';

    //GET REQUEST TODAY WEATHER TYPING CITY NAME
    const errorgetTodayWeatherByCity = async () => {
      try {
        const response5 = await fetch(api5);
        const data5 = await response5.json();
        console.log(data5);

        const { temp, humidity } = data5.main;
        const { icon } = data5.weather[0];
        const todayData5 = {
          temperature: Math.round(temp),
          humidity: Math.round(humidity),
          icon: icon
        };
        // console.log(temp, humidity, icon)

        // DISPLAY WEATHER TODAY TYPING CITY
        local.textContent = `${data5.name} - ${data5.sys.country}`;
        todayDegree.textContent = todayData5.temperature;
        todayInformations.textContent = todayData5.humidity;
        todayIcon.innerHTML = `<img src="../assets/weather-icons/${todayData5.icon}.svg" 
          alt="todayicon">`;
        // CLEAR INPUT AFTER SUBMIT
        notification.value = '';

        // GET REQUEST NEXT DAYS WEATHER TYPING CITY NAME
        const lat2 = data5.coord.lat;
        const long2 = data5.coord.lon;
        const api6 = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat2 +
          '&lon=' + long2 + '&exclude=current,minutely,hourly&appid=' + apiKey +
          '&units=metric';

        const getNextDaysByCityName = async () => {
          try {
            const response6 = await fetch(api6);
            const data6 = await response6.json();
            // console.log(data6);

            const daily3 = data6.daily;
            // GET MAX AND MIN TEMP FROM EACH DAY TYPING CITY NAME
            const arrMaxMin3 = daily3.map((item, index) => `
            <div class="day${[index]}">
            <div class="nextDayIcon${index}">
              <img src="../assets/weather-icons/${item.weather[0].icon}.svg"
              alt="nextdaysicons">
            </div>
            <p class="max">Max <span>${Math.round(item.temp.max)}°C</span></p>
            <p class="min">Min <span>${Math.round(item.temp.min)}°C</span></p>
            </div>
            `).slice(0, 6).join('');
            // console.log(arrMaxMin3)

            //DISPLAY WEATHER OF NEXT DAYS TYPING CITY NAME
            const displayNextDays3 = () => {
              nextDays.innerHTML = arrMaxMin3;
            };
            displayNextDays3();
          }
          catch (err6) {
            console.log(err6);
          }
        };
        getNextDaysByCityName();
      }
      catch (err5) {
        console.log(err5);
      }
    }
    errorgetTodayWeatherByCity();
  })
};