
// SELECT ELEMENTS
const local = document.querySelector('.local');
const notification = document.querySelector('.notification');
const todayIcon = document.querySelector('.todayIcon');
const todayDegree = document.querySelector('.todayTemperature p span');
const todayInformations = document.querySelector('.todayTemperature h3 span');
const nextDays = document.querySelector('.nextDays');
const submit = document.querySelector('.fa-search');


// CHECK IF BROWSER SUPPORT GEOLOCATION AND GET IT WHEN PAGE LOADS,
// IF NOT, DISPLAY MESSAGE TO USER TYPE CITY NAME. 
window.addEventListener('load', () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getTodayWeather, displayError);
  }
  else {
    alert("Geolocation is not available");
  }
})

// DAYS OF WEEK ARRAY
const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// FUNCTION WEATHER ON LOAD
const getTodayWeather = () => {
  navigator.geolocation.getCurrentPosition( async position => {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    const coord = {
      lat: lat,
      lon: lon
    }
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coord)
    };

    const response = await fetch('/onload', options);
    const data = await response.json();
    // console.log(data);

    const { temp, humidity } = data.today.main;
    const { icon } = data.today.weather[0];
    const todayData = {
       temperature: Math.round(temp),
       humidity: Math.round(humidity),
       icon: icon
    };
    
    // DISPLAY WEATHER TODAY
    local.textContent = `${data.today.name} - ${data.today.sys.country}`;
    todayDegree.textContent = todayData.temperature;
    todayInformations.textContent = todayData.humidity;
    todayIcon.innerHTML = `<img src="/assets/weather-icons/${icon}.svg" alt="todayicon">`;

    // GET MAX AND MIN TEMP FROM NEXT DAYS
    const arrMaxMin = data.nextDays.daily.map((item, index) => `
      <div>
        <p class="dayOfWeek">${weekDay[new Date(item.dt * 1000).getDay()]}</p>
        <div class="nextDayIcon${index}">
          <img src="/assets/weather-icons/${item.weather[0].icon}.svg"
          alt="nextdaysicons">
        </div>
        <div class="maxmin">
          <i class="fas fa-arrows-alt-v"></i>
          <div>
            <p class="max"><span>${Math.round(item.temp.max)}°C</span></p>
            <p class="min"><span>${Math.round(item.temp.min)}°C</span></p>
          </div>
        </div> 
      </div>
    `).slice(1, 7).join('');
    // console.log(arrMaxMin)
    
    //DISPLAY WEATHER OF NEXT DAYS
    nextDays.innerHTML = arrMaxMin;
  })
};



// FUNCTION WEATHER BY TYPING CITY NAME
const getWeatherByCityName = () => {
  submit.addEventListener('click', async () => {
    const cityNamecountryCode = {
      q: notification.value
    };
    // console.log(cityNamecountryCode);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cityNamecountryCode)
    };
    const response = await fetch('/cityname', options);
    const data = await response.json();
    // console.log(data)

    const { temp, humidity } = data.today.main;
    const { icon } = data.today.weather[0];
    const todayData = {
      temperature: Math.round(temp),
      humidity: Math.round(humidity),
      icon: icon
    };
    // console.log(todayData);

    // DISPLAY WEATHER TODAY TYPING CITY
    local.textContent = `${data.today.name} - ${data.today.sys.country}`;
    todayDegree.textContent = todayData.temperature;
    todayInformations.textContent = todayData.humidity;
    todayIcon.innerHTML = `<img src="/assets/weather-icons/${todayData.icon}.svg" 
      alt="todayicon">`;
    // CLEAR INPUT AFTER SUBMIT
    notification.value = '';

    //  GET MAX AND MIN TEMP FROM EACH DAY TYPING CITY NAME
    const arrMaxMin = data.nextDays.daily.map((item, index) => `
    <div class="day${[index]}">
      <p class="dayOfWeek">${weekDay[new Date(item.dt * 1000).getDay()]}</p>
      <div class="nextDayIcon${index}">
        <img src="/assets/weather-icons/${item.weather[0].icon}.svg"
        alt="nextdaysicons">
      </div>
      <div class="maxmin">
        <i class="fas fa-arrows-alt-v"></i>
        <div>
          <p class="max"><span>${Math.round(item.temp.max)}°C</span></p>
          <p class="min"><span>${Math.round(item.temp.min)}°C</span></p>
        </div>
      </div> 
    </div>
    `).slice(1, 7).join('');
    // console.log(arrMaxMin);

    //DISPLAY WEATHER OF NEXT DAYS TYPING CITY NAME
    nextDays.innerHTML = arrMaxMin;
  });
};
getWeatherByCityName();




//DISPLAY ERROR
const displayError = () => {
  // SHOW ALERT
  alert("Please, use input field to write your city name and get weather info.");
  // REPEAT FUNCTION SHOW WEATHER TYPING CITY NAME
  submit.addEventListener('click', getWeatherByCityName())
};

