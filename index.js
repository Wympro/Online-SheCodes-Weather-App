let now = new Date();
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
let time = document.querySelector("#timeToday");
time.innerHTML = `${day} ${hour}:${minutes}`;
//HMK 5
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureShow = document.querySelector("#currentTemp");
  temperatureShow.innerHTML = `${temperature}`;
  let city = response.data.name;
  let cityNameShow = document.querySelector("h2");
  cityNameShow.innerHTML = `${city}`;
}

function enteringCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#cityEntered");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${cityInput.value}`;
  let apiKey = "f07941ab7a742cad6ad28a820a278bcb";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(showTemperature);
}

let form = document.querySelector("form");
form.addEventListener("submit", enteringCity);

//HMK5GEO

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

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
