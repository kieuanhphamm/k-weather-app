function showCurrentDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let currentDay = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemper",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];

  let currentDate = date.getDate();
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentDay}, ${currentMonth} ${currentDate} | ${currentHour}:${currentMinute}`;
}
let now = new Date();

let present = document.querySelector("#today");
present.innerHTML = showCurrentDate(now);

//City
function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "cc839d6b2e6eab8ff6b88460afc66315";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);

  let currentCity = response.data.name;
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = currentCity;

  let currentTemperature = Math.round(response.data.main.temp);
  let displayTemperature = document.querySelector("#current-degrees");
  displayTemperature.innerHTML = `${currentTemperature}`;

  let currentHumidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity-value");
  displayHumidity.innerHTML = `${currentHumidity}%`;

  let currentWindSpeed = Math.round(response.data.wind.speed);
  let displayWindSpeed = document.querySelector("#wind-speed-value");
  displayWindSpeed.innerHTML = `${currentWindSpeed}m/sec`;

  let currentWeatherDescription = response.data.weather[0].description;
  let displayWeatherDescription = document.querySelector(
    "#weather-description"
  );
  displayWeatherDescription.innerHTML = currentWeatherDescription;
}
let searchCityButton = document.querySelector("#search-form");
searchCityButton.addEventListener("submit", searchButton);

//Geolocation

let currenPositionButton = document.querySelector("#current-location-button");
currenPositionButton.addEventListener("submit", showCurrentPositionWeather);

function showCurrentPositionWeather(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "cc839d6b2e6eab8ff6b88460afc66315";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showCurrentPositionWeather);
