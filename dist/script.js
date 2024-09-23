// API key for OpenWeatherMap API
const apiKey = "bd5e378503939ddaee76f12ad7a97608";
// Base API URL for weather data
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?appid=" +
  apiKey +
  "&units=metric";

// Function to get weather data for a given city
function getWeather() {
  // Get the city name from input
  const city = document.getElementById("city").value.trim();

  // Validate if the city name is empty
  if (!city) {
    displayError("Please enter a city name."); // Display error message
    return; // Exit the function if input is empty
  }

  const url = apiUrl + "&q=" + city;

  // Fetch weather data from the API
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Check if the city was found
      if (data.cod === 200) {
        displayWeather(data); // Display weather data
        storeRecentCity(city); // Store the searched city
      } else {
        displayError("City not found."); // Display error if city not found
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error); // Log error
      displayError("City not found or network error."); // Display general error
    });
}


// Function to get the current location using geolocation
function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    displayError("Geolocation is not supported by this browser.");
  }
}

// Function to handle the current position
function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const url = apiUrl + "&lat=" + latitude + "&lon=" + longitude;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      displayError("Network error.");
    });
}

// Function to handle geolocation errors
function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      displayError("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      displayError("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      displayError("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      displayError("An unknown error occurred.");
      break;
  }
}

// Function to display the weather data
function displayWeather(data) {
  const weatherInfo = document.getElementById("weather-info");
  const forecast = document.getElementById("forecast");

  weatherInfo.innerHTML = "";
  forecast.innerHTML = "";

  const city = data.name;
  const temperature = data.main.temp;
  const windSpeed = data.wind.speed;
  const humidity = data.main.humidity;
  const iconCode = data.weather[0].icon;
  const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

  const cityElement = document.createElement("div");
  cityElement.classList.add("city");
  cityElement.textContent = city;

  const detailsElement = document.createElement("div");
  detailsElement.classList.add("details");
  detailsElement.innerHTML = `
                <p>Temperature: ${temperature}°C</p>
                <p>Wind: ${windSpeed} M/S</p>
                <p>Humidity: ${humidity}%</p>
            `;

  const iconElement = document.createElement("img");
  iconElement.classList.add("icon");
  iconElement.src = iconUrl;
  iconElement.alt = data.weather[0].description;

  weatherInfo.appendChild(iconElement);
  weatherInfo.appendChild(cityElement);
  weatherInfo.appendChild(detailsElement);

  // Display 5-day forecast (same as before)
  const forecastDays = 5;
  for (let i = 1; i <= forecastDays; i++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("forecast-day");

    const forecastDate = new Date();
    forecastDate.setDate(forecastDate.getDate() + i);
    const formattedDate = forecastDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

    const forecastUrl =
      "https://api.openweathermap.org/data/2.5/forecast?appid=" +
      apiKey +
      "&units=metric&q=" +
      data.name;

    fetch(forecastUrl)
      .then((response) => response.json())
      .then((forecastData) => {
        const forecastDay = forecastData.list.find((item) => {
          const itemDate = new Date(item.dt * 1000);
          itemDate.setHours(0, 0, 0, 0);
          const forecastDate = new Date();
          forecastDate.setDate(forecastDate.getDate() + i);
          forecastDate.setHours(0, 0, 0, 0);
          return itemDate.getTime() === forecastDate.getTime();
        });

        if (forecastDay) {
          const forecastTemp = forecastDay.main.temp;
          const forecastWind = forecastDay.wind.speed;
          const forecastHumidity = forecastDay.main.humidity;
          const forecastIconCode = forecastDay.weather[0].icon;
          const forecastIconUrl =
            "http://openweathermap.org/img/wn/" + forecastIconCode + "@2x.png";

          dayElement.innerHTML = `
                                <h3>${formattedDate}</h3>
                                <img src="${forecastIconUrl}" alt="${forecastDay.weather[0].description}">
                                <p>Temp: ${forecastTemp}°C</p>
                                <p>Wind: ${forecastWind} M/S</p>
                                <p>Humidity: ${forecastHumidity}%</p>
                            `;
          forecast.appendChild(dayElement);
        }
      })
      .catch((error) => {
        console.error("Error fetching forecast data:", error);
        dayElement.innerHTML = "Error fetching forecast data.";
        forecast.appendChild(dayElement);
      });
  }
}

// Function to store the recent city in localStorage
function storeRecentCity(city) {
  let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];

  if (!recentCities.includes(city)) {
    recentCities.push(city);
    if (recentCities.length > 5) {
      recentCities.shift(); // Remove the oldest city
    }
    localStorage.setItem("recentCities", JSON.stringify(recentCities));
    updateRecentCitiesDropdown();
  }
}

// Function to update the dropdown with recently searched cities
function updateRecentCitiesDropdown() {
  const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
  const dropdown = document.getElementById("recent-cities");

  dropdown.innerHTML = '<option value="">Select a recently searched city</option>';

  recentCities.forEach((city) => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    dropdown.appendChild(option);
  });

  if (recentCities.length > 0) {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
}

// Function to handle when a city is selected from the dropdown
function selectRecentCity(selectElement) {
  const city = selectElement.value;
  if (city) {
    document.getElementById("city").value = city;
    getWeather();
  }
}

// Function to display error messages
function displayError(message) {
  const weatherInfo = document.getElementById("weather-info");
  weatherInfo.innerHTML = `<p>${message}</p>`;
}

// On page load, update the dropdown with stored recent cities
window.onload = function() {
  updateRecentCitiesDropdown();
};
