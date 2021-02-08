// API KEY : 197ad8e2bbbe2806e90303bb987dc059
const apiKey = "197ad8e2bbbe2806e90303bb987dc059";

// SELECT ELEMENTS
const local = document.querySelector('.local');
const notification = document.querySelector('.notification');
const todayIcon = document.querySelector('.todayIcon');
const todayDegree = document.querySelector('.todayTemperature p span');
const todayInformations = document.querySelector('.todayTemperature h3 span');
const nextDays = document.querySelector('.nextDays');


// FUNCTION - SHOW WEATHER ON LOAD
const showWeatherOnLoad = () => {
  navigator.geolocation.getCurrentPosition(position => {
    let long = position.coords.longitude;
    let lat = position.coords.latitude;

    // GET REQUEST TODAY WEATHER    
    const api = 'https://api.openweathermap.org/data/2.5/weather?lat='+
    lat+'&lon='+long+'&appid='+apiKey+'&units=metric';

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
          local.textContent = data.name;     // DISPLAY LOCATION
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

    const api2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='+
    lat+'&lon='+long+'&exclude=&appid='+apiKey+'&units=metric';

    const getNextDaysData = async () => {
      try {
        const response2 = await fetch(api2);
        const data2 = await response2.json()
        console.log(data2);

        const daily = data2.daily;
        // GET MAX AND MIN TEMP FROM EACH DAY
        const arrMaxMin = daily.map((item, index) => `
          <div class="day${[index]}">
            <div class="nextDayIcon${index}">
              <img src="../assets/weather-icons/${item.weather[0].icon}.svg" alt="nextdaysicons">
            </div>
            <p class="max">Max <span>${Math.round(item.temp.max)}°C</span></p>
            <p class="min">Min <span>${Math.round(item.temp.min)}°C</span></p>
          </div>
        `).join('');
        // console.log(arrMaxMin)
        
        //DISPLAY WEATHER OF NEXT DAYS
        const displayNextDays = () => {
          
          nextDays.innerHTML = arrMaxMin;
          
        };
        displayNextDays();

        // GET ICON OF EACH DAY
        const arrIconsNextDays = daily.map(item => item.weather[0].icon);
        // console.log(arrIconsNextDays);  

      }
      catch (err) {
        console.log(err);
      }
    }
    getNextDaysData();
  });
};


// GET REQUEST WEATHER BY CITY NAME




// CHECK IF BROWSER SUPPORT GEOLOCATION AND GET IT WHEN PAGE LOADS,
// IF NOT, DISPLAY MESSAGE TO USER TYPE CITY NAME. 
window.addEventListener('load', () => {
  if (navigator.geolocation) {
    showWeatherOnLoad();
  } else {
    // add here message and code to user enter zipcode 
  }
});



// CELSIUS to FAHRENHEIT
 // (temperature * 9/5) + 32

//GET MAX AND MIN TEMP SEPARATELY
// const arrMin = daily.map(item => Math.round(item.temp.min));
// console.log(arrMin);
// const arrMax = daily.map(index => Math.round(index.temp.max));
// console.log(arrMax);


// SHOW A ERROR WHEN HAVE A ISSUE WITH GEOLOCATION SERVICE
// notification.innerHTML = `${error.message}` 