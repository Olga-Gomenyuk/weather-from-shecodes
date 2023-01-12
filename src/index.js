function showWeather(response) {
  let h1 = document.querySelector("h1");
  let curTemp = document.querySelector('#temperature');
  let description = document.querySelector('#description');
  let pressure = document.querySelector('#pressure');
  let humidity = document.querySelector('#humidity');
  let wind = document.querySelector('#wind');
  h1.innerHTML = `${response.data.name}`;
  description.innerHTML = `${' ' + response.data.weather[0].description}`;
  curTemp.innerHTML = `${Math.round(response.data.main.temp)}`;
  pressure.innerHTML = `${Math.round(response.data.main.pressure)}`;
  humidity.innerHTML = `${Math.round(response.data.main.humidity)}`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
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

/*let apiKey = 'fbd35e7c668oa65a028e4a41408b3tcf';
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;


axios.get(url).then(displayTemperature);
*/