let currentDate = document.querySelector("#current-date");

let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();

currentDate.innerHTML = `${hours}:${minutes}, ${day}, ${month}, ${date}`;

// week 5 search function

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width = "42"
                /> 
                <div class="weather-forecast-temperature"> 
                  <span class="weather-forecast-temperature-max">18° </span>
                  <span class="weather-forecast-temperature-min">12° </span>
                </div>
              </div>
            `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showTemperature(response) {
  console.log(response.data);
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = response.data.name;
  let degreeDisplay = document.querySelector("#temperature");
  degreeDisplay.innerHTML = Math.round(response.data.main.temp);
  let humidityDisplay = document.querySelector("#humidity");
  humidityDisplay.innerHTML = `Humidity ${response.data.main.humidity} %`;
  let windDisplay = document.querySelector("#windspeed");
  windDisplay.innerHTML = `Wind : ${Math.round(response.data.wind.speed)} km/h`;
  let descriptionDisplay = document.querySelector("#description");
  descriptionDisplay.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;
  degreeDisplay.innerHTML = Math.round(celsiusTemperature);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", `${response.data.weather[0].description}`);
}
let degreeDisplay = null;

function searchCity(city) {
  let apiKey = "173ad7f0400a4a67080b878412caf07f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function displayCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search-bar");
  searchCity(searchBar.value);
}

let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", displayCity);

// week 5 use current position display weather and city name

function showPosition(position) {
  let apiKey = "173ad7f0400a4a67080b878412caf07f";
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentlocation");
button.addEventListener("click", getCurrentLocation);

// week 7

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

// week 8

displayForecast();
