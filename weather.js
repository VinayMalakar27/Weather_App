/*
Location-based weather App
=> carete a simple weather application that fetches the user's location using the geolocation API and then uses that location use to display the current  weather from a weather API (such as openWeatherMap), The user should be able to see their city name, tempreature, and weather description based on theair curent location.
//steps:
1. use the geolocation API to get the user's current lattitude and longitude. 
2. fetch weather data from a weather API (like openWeatherMap) using the fecth API and the coordinates.
3. Display the weather data on the top
*/

const API_KEY = "3447e701c10cfbb2ac27190d2a9bb0a2";

function getWeather() {
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerHTML = "";
  const error = document.getElementById("error");
  error.innerHTML = "";

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeatherData, showError);
  } else {
    error.innerHTML = "Geolocation is not supported this browser";
  }
}

async function fetchWeatherData(position) {
  try {
    console.log(position);

    const { latitude, longitude } = position.coords;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

    const responce = await fetch(apiUrl);
    const data = await responce.json();
    console.log(data);

    const weatherDescription = data.weather[0].description;
    const temperature = data.main.temp;
    const city = data.name;
    const iconCode = data.weather[0].icon;
    changeBackground(iconCode); // 
    const weatheInfo = `📍<strong>City:</strong> ${city}<br>
  🌡️ <strong>Temperature:</strong> ${temperature}°C<br>
  🌤️ <strong>Weather:</strong> ${weatherDescription}`;

    const weatherInfoData = document.getElementById("weatherInfo");
    weatherInfoData.innerHTML = weatheInfo;

    const error = document.getElementById("error");
    error.innerHTML = "";
  } catch (error) {
    const errorText = document.getElementById("error");
    errorText.innerHTML = "Failed to fetch Weather Data.";
  }
}

function showError(error) {
  const err = document.getElementById("error");
  console.log(error);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      err.innerHTML = "User denied the request for Geolocation";
      break;
    case error.PERMISSION_UNAVAILABLE:
      err.innerHTML = "Location Information is unavailable";
      break;
    case error.TIMEOUT:
      err.innerHTML = "Geolocation request time out";
      break;
    case error.UNKNOWN_ERROR:
      err.innerHTML = "Unknown error occured";
      break;
    default:
      err.innerHTML = "Something went wrong! try again later";
  }
}

function changeBackground(icon) {
  const body = document.body;

  if (icon.includes('d')) {
    
    body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
  } else {
    body.style.background = "linear-gradient(to right, #141e30, #243b55)";
  }

  body.style.transition = "background 1s ease-in-out";
}
