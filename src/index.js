//let now = new Date();
//let dayToday = document.querySelector("#day");
//let date = now.getDate();
/*let month = 1 + now.getMonth();
let year = now.getFullYear();*/
//dayToday.innerHTML = `${date}.${month}.${year}`;

let currentTime = new Date();
let dateElement = document.querySelector("#day");
dateElement.innerHTML = formatDate(currentTime);

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

function displayForecast() {
  let forecastElement = document.querySelector('#forecast');
  let forecastHTML = `<div class="row">`;
  let days = ['Thu', 'Fri', 'Sut', 'Sun', 'Mon', 'Tue'];
  days.forEach(function(day) {
    forecastHTML = forecastHTML + `
      <div class="col-2">
        <div class="weather-forecast-date">
        ${day}
        </div>
        <img src="#" alt = "" width="42"/>
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">
          18 °</span>
          <span class="weather-forecast-temperature-min">
          12 °</span>
        </div>
    </div>
  `
  })
  forecastHTML += `</div>`;
  
  forecastElement.innerHTML = forecastHTML;
          
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
}

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  
  axios.get(url).then(showWeather);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

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

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
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

displayForecast();

//let currentLocationButton = document.querySelector(".current-location");
//currentLocationButton.addEventListener("click", getCurrentLocation);

