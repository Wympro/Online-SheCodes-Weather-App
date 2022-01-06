function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hour}:${minutes}`;
}

function showForecast() {
  let forecastShow = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
  <div class="weatherForcastDate">${day}</div>
  <img src="#"/>
  <div class="weatherForcastTemp">
    <span class="weatherForcastTempMax"> 80° | </span>
    <span class="weatherForcastTempMin"> 30° </span>
  </div>
</div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastShow.innerHTML = forecastHTML;
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureShow = document.querySelector("#currentTemp");
  temperatureShow.innerHTML = `${temperature}`;

  fahrenheitTemp = Math.round(response.data.main.temp);
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let city = response.data.name;
  let cityNameShow = document.querySelector("h2");
  cityNameShow.innerHTML = `${city}`;
  let description = response.data.weather[0].description;
  let descriptionShow = document.querySelector("#description");
  descriptionShow.innerHTML = `${description}`;

  let wind = Math.round(response.data.wind.speed);
  let windShow = document.querySelector("#wind");
  windShow.innerHTML = `${wind}`;
  let humidity = response.data.main.humidity;
  let humidityShow = document.querySelector("#humidity");
  humidityShow.innerHTML = `${humidity}`;
  let feels = Math.round(response.data.main.feels_like);
  let feelsShow = document.querySelector("#feels");
  feelsShow.innerHTML = `${feels}`;
  let timeShow = document.querySelector("#timeToday");
  timeShow.innerHTML = formatDate(response.data.dt * 1000);
  let iconShow = document.querySelector("#Currenticon");
  iconShow.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`
  );
}

function search(city) {
  let apiKey = "f07941ab7a742cad6ad28a820a278bcb";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(showTemperature);
}

function enteringCity(event) {
  event.preventDefault();
  let city = document.querySelector("#cityEntered").value;
  search(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", enteringCity);

//GEO

function retrievePosition(position) {
  let apiKey = "f07941ab7a742cad6ad28a820a278bcb";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentLocationButton");
button.addEventListener("click", getCurrentPosition);

search("San Diego");

//Unit conversion

function showFahrenheitTemp(event) {
  event.preventDefault();
  let currentTempDisplay = document.querySelector("#currentTemp");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  currentTempDisplay.innerHTML = fahrenheitTemp;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let currentTempDisplay = document.querySelector("#currentTemp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = (fahrenheitTemp - 32) / 1.8;
  currentTempDisplay.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitTemp = null;

let fahrenheitLink = document.querySelector("#degreeTypeF");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#degreeTypeC");
celsiusLink.addEventListener("click", showCelsiusTemp);

//Forecast

showForecast();
