// script.js

const weatherApi = {
  key: "4eb3703790b356562054106543b748b2",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

// Weather condition to background image map
const weatherBackgrounds = {
  Clear: "https://source.unsplash.com/400x400/?clear-sky",
  Clouds: "https://source.unsplash.com/400x400/?clouds",
  Rain: "https://source.unsplash.com/400x400/?rain",
  Snow: "https://source.unsplash.com/400x400/?snow",
  Thunderstorm: "https://source.unsplash.com/400x400/?thunderstorm",
  Drizzle: "https://source.unsplash.com/400x400/?drizzle",
  Mist: "https://source.unsplash.com/400x400/?mist",
};

document.getElementById("search-btn").addEventListener("click", () => {
  const location = document.getElementById("location-input").value.trim();
  if (location) {
    fetchWeather(location);
  } else {
    alert("Please enter a valid city name.");
  }
});

document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("location-input").value = "";
});

// Fetch Weather Data
async function fetchWeather(location) {
  const apiUrl = `${weatherApi.baseUrl}?q=${location}&units=metric&appid=${weatherApi.key}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found.");
    }
    const data = await response.json();
    displayWeather(data, location);
  } catch (error) {
    alert(error.message);
  }
}

// Display Weather in Popup
function displayWeather(data, location) {
  const weatherCondition = data.weather[0].main;
  const backgroundImage = weatherBackgrounds[weatherCondition] || weatherBackgrounds["Clear"];
  
  const heading = `Hey user, the weather condition of <b>${location}</b> is as follows:`;
  document.getElementById("popup-heading").innerHTML = heading;

  document.getElementById("temperature").textContent = `Temperature: ${data.main.temp} °C`;
  document.getElementById("atmospheric-phenomenon").textContent = `Weather: ${data.weather[0].description}`;
  document.getElementById("min-temp").textContent = `Min Temp: ${data.main.temp_min} °C`;
  document.getElementById("max-temp").textContent = `Max Temp: ${data.main.temp_max} °C`;
  document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("pressure").textContent = `Pressure: ${data.main.pressure} hPa`;
  document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;

  document.getElementById("popup-content").style.backgroundImage = `url(${backgroundImage})`;
  document.getElementById("popup").classList.remove("hidden");
}
