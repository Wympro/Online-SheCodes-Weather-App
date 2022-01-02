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

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureShow = document.querySelector("#currentTemp");
  temperatureShow.innerHTML = `${temperature}`;
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

search("New York");
