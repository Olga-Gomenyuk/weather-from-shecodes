let currentTime = new Date();
let dateElement = document.querySelector("#day");
let currentMonthYear = document.querySelector("#month-year");
dateElement.innerHTML = formatDate(currentTime);
currentMonthYear.innerHTML = formatDayMonthYear(currentTime);

document.body.style.background = changeBackground(currentTime);
function changeBackground(date) {
  let month = date.getMonth();
  if (month == 0 || month == 1 || month == 11) {
    document.body.style.background = 'url("../weather-from-shecodes/image/winter.jpg")';
  } else if (month == 2 || month == 3 || month == 4) {
    document.body.style.background = 'url("../weather-from-shecodes/image/spring.jpg")';
  } else if (month == 5 || month == 6 || month == 7) {
    document.body.style.background = 'url("../weather-from-shecodes/image/summer1.jpg")';
  } else {
    document.body.style.background = 'url("../weather-from-shecodes/image/Fall1.jpg")';
  }
}

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day}, ${hours}:${minutes}`;
}

function formatDayMonthYear(date) {
  let dayOfMonth = date.getDate();
  let month = 1 + date.getMonth();
  let year = date.getFullYear();
  if (month < 10) {
    month = `0${month}`;
  }

  if (dayOfMonth < 10) {
    dayOfMonth = `0${dayOfMonth}`;
  }
  return `${dayOfMonth}.${month}.${year}`
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    let forecastValue = `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt = "" width="42"/> 
            <div class="weather-forecast-temperature"> 
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)} °</span> 
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)} °</span> 
            </div>
    </div>`;
    if (index < 6) {
      forecastHTML = forecastHTML + forecastValue;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  let h1 = document.querySelector("h1");
  let curTemp = document.querySelector('#temperature');
  let description = document.querySelector('#description');
  let pressure = document.querySelector('#pressure');
  let humidity = document.querySelector('#humidity');
  let wind = document.querySelector('#wind');
  let icon = document.querySelector('#icon');
  celsiumTemperature = response.data.main.temp; 
  h1.innerHTML = `${response.data.name}`;
  description.innerHTML = `${' ' + response.data.weather[0].description}`;
  curTemp.innerHTML = `${Math.round(celsiumTemperature)}`;
  pressure.innerHTML = `${Math.round(response.data.main.pressure)}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
  icon.setAttribute("src", 
  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", `${response.data.weather[0].description}`);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".form-control").value;
  searchCity(city);
}


function showFahrengeitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector('#temperature');
  celsiumLink.classList.remove('celsium');
  fahrengeitLink.classList.add('celsium');
  let fahrengeitTemperature = (celsiumTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrengeitTemperature);
}

function showCelsiumTemp(event) {
  event.preventDefault();
  celsiumLink.classList.add('celsium');
  fahrengeitLink.classList.remove('celsium');
  let temperatureElement = document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(celsiumTemperature);
}

let celsiumTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrengeitLink = document.querySelector("#fahrengeit-link");
fahrengeitLink.addEventListener("click", showFahrengeitTemp);

let celsiumLink = document.querySelector("#celsium-link");
celsiumLink.addEventListener("click", showCelsiumTemp);

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
searchCity('Kyiv');

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

