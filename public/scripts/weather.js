
// SELECT ELEMENTS
const local = document.querySelector('.local');
const inputCityName = document.querySelector('.inputCityName');
const todayIcon = document.querySelector('.todayIcon');
const todayDegree = document.querySelector('.todayTemperature p span');
const todayInformations = document.querySelector('.todayTemperature h3 span');
const nextDays = document.querySelector('.nextDays');
const submit = document.querySelector('.fa-search');
const spin = document.querySelector('.fa-spin');
const alertPopUp = document.querySelector('.alertPopUp');
const alertMessage = document.querySelector('.alertPopUp span');
const alertClose = document.querySelector('.alertPopUp a');
const handAlertIcon = document.querySelector('.fa-hand-paper');

// DAYS OF WEEK ARRAY
const weekDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// FUNCTION CLEAR INPUT CITY AND TURN OFF LOADING SPIN
const resetCity = () => {
  inputCityName.value = '';
  submit.style.visibility = 'visible';
  spin.style.visibility = 'hidden';
};


// CHECK IF BROWSER SUPPORT GEOLOCATION AND GET IT WHEN PAGE LOADS,
// IF NOT, DISPLAY MESSAGE TO USER TYPE CITY NAME. 
window.addEventListener('load', () => {
  // SPIN LOADING ON
  submit.style.visibility = 'hidden';
  spin.style.visibility = 'visible';

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getTodayWeather, displayError);
  } else {
    alert("Geolocation is not supported.");
  }
})

// FUNCTION WEATHER ON LOAD
const getTodayWeather = () => {
  navigator.geolocation.getCurrentPosition(async position => {
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

    // HANDLE REQUEST ERRORS
    if (data.cod === '404' || data.cod === '400') {
      handAlertIcon.style.display = 'none';

      alertPopUp.style.display = 'flex';
      alertMessage.innerHTML = `<h1>${data.cod} - ${data.message}.
       Please, type city name again.</h1>`;

      resetCity();

      alertClose.addEventListener('click', () => {
        alertPopUp.style.display = 'none';
      })
    }

    const { temp, humidity } = data.today.main;
    const { icon } = data.today.weather[0];
    const todayData = {
      temperature: Math.round(temp),
      humidity: Math.round(humidity),
      icon: icon
    };

    // SPIN LOADING OFF
    submit.style.visibility = 'visible';
    spin.style.visibility = 'hidden';

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
const getWeatherByCityName = async (event) => {
  if (event.key === "Enter" || event.type === 'click') {
    // SPIN LOADING ON
    submit.style.visibility = 'hidden';
    spin.style.visibility = 'visible';
    const cityNamecountryCode = {
      q: inputCityName.value
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
    // console.log(data);

    // HANDLE REQUEST ERRORS
    if (data.cod === '404' || data.cod === '400') {
      handAlertIcon.style.display = 'none';

      alertPopUp.style.display = 'flex';
      alertMessage.innerHTML = `<h1>${data.cod} - ${data.message}.
          Please, type city name again.</h1>`;

      resetCity();

      alertClose.addEventListener('click', () => {
        alertPopUp.style.display = 'none';
      })
    }

    const { temp, humidity } = data.today.main;
    const { icon } = data.today.weather[0];
    const todayData = {
      temperature: Math.round(temp),
      humidity: Math.round(humidity),
      icon: icon
    };
    // console.log(todayData);

    // SPIN LOADING OFF
    submit.style.visibility = 'visible';
    spin.style.visibility = 'hidden';
    // DISPLAY WEATHER TODAY TYPING CITY
    local.textContent = `${data.today.name} - ${data.today.sys.country}`;
    todayDegree.textContent = todayData.temperature;
    todayInformations.textContent = todayData.humidity;
    todayIcon.innerHTML = `<img src="/assets/weather-icons/${todayData.icon}.svg" 
        alt="todayicon">`;
    // CLEAR INPUT AFTER SUBMIT
    inputCityName.value = '';

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
  }
};

// HANDLE ENTER KEY AND MOUSE CLICK EVENTS
inputCityName.addEventListener('keyup', getWeatherByCityName);
submit.addEventListener('click', getWeatherByCityName);



//DISPLAY ERROR
const displayError = () => {
  // SHOW ALERT
  handAlertIcon.style.display = 'none';

  alertPopUp.style.display = 'flex';
  alertMessage.innerHTML = "<h2>Your geolocation is not enabled or is not supported by your browser."
    + " Please, use input field to write your city name and get weather info.</h2>";

  submit.style.visibility = 'visible';
  spin.style.visibility = 'hidden';

  alertClose.addEventListener('click', () => {
    alertPopUp.style.display = 'none';
  })
};

