function showCurrentTime(currentTime) {
  let date = currentTime.getDate();
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = currentTime.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let monthIndex = currentTime.getMonth();
  let months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  let day = days[dayIndex];
  let month = months[monthIndex];
  return `${day} ${date} <br /> ${month}  <br /> <small><small><small>${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
       <div class="weather-forecast-icon forecast-icon">
        </div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min">  ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

  let forecastIcon = document.querySelectorAll(".forecast-icon");
  forecast.forEach((el, index) => {
    if (index < 6) {
      let forecastDescription = el.weather[0].description;
      if (forecastDescription === "clear sky") {
        forecastIcon[index].innerHTML = '<i class="bi bi-sun"></i>';
      }
      if (forecastDescription === "overcast clouds") {
        forecastIcon[index].innerHTML = '<i class="bi bi-clouds"></i>';
      }
      if (forecastDescription === "moderate rain") {
        forecastIcon[index].innerHTML =
          '<i class="bi bi-cloud-rain-heavy"></i>';
      }
      if (forecastDescription === "light rain") {
        forecastIcon[index].innerHTML = '<i class="bi bi-cloud-drizzle"></i>';
      }
      if (forecastDescription === "thunderestorm") {
        forecastIcon[index].innerHTML = '<i class="bi bi-lightning"></i>';
      }
      if (forecastDescription === "fog") {
        forecastIcon[index].innerHTML = '<i class="bi bi-cloud-fog"></i>';
      }
      if (forecastDescription === "wind") {
        forecastIcon[index].innerHTML = '<i class="bi bi-wind"></i>';
      }
      if (forecastDescription === "few clouds") {
        forecastIcon[index].innerHTML = '<i class="bi bi-cloud"></i>';
      }
      if (forecastDescription === "broken clouds") {
        forecastIcon[index].innerHTML = '<i class="bi bi-cloud"></i>';
      }
      if (forecastDescription === "snow") {
        forecastIcon[index].innerHTML = '<i class="bi bi-snow"></i>';
      }
      if (forecastDescription === "drizzle") {
        forecastIcon[index].innerHTML = '<i class="bi bi-cloud-drizzle"></i>';
      }
      if (forecastDescription === "partly cloudy") {
        forecastIcon[index].innerHTML = '<i class="bi bi-cloud-sun"></i>';
      }
      if (forecastDescription === "shower rain") {
        forecastIcon[index].innerHTML =
          '<i class="bi bi-cloud-rain-heavy"></i>';
      }
      if (forecastDescription === "light intensity drizzle") {
        forecastIcon[index].innerHTML = '<i class="bi bi-cloud-drizzle"></i>';
      }
    }
  });
}

function getForecast(coordinates) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = document.querySelector("#city-input").value;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  fahrenheitTemperature = response.data.main.temp;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  fahrenheitTemperature = response.data.main.temp;
  fahrenheitTemperature = response.data.main.temp;

  let cityDescription = response.data.weather[0].description;
  let currentIcon = document.querySelector("#current-icon");
  if (cityDescription === "clear sky") {
    currentIcon.innerHTML = '<i class="bi bi-sun"></i>';
  }
  if (cityDescription === "overcast clouds") {
    currentIcon.innerHTML = '<i class="bi bi-clouds"></i>';
  }
  if (cityDescription === "moderate rain") {
    currentIcon.innerHTML = '<i class="bi bi-cloud-rain-heavy"></i>';
  }
  if (cityDescription === "thunderstorm") {
    currentIcon.innerHTML = '<i class="bi bi-lightning"></i>';
  }
  if (cityDescription === "rain") {
    currentIcon.innerHTML = '<i class="bi bi-cloud-rain-heavy"></i>';
  }
  if (cityDescription === "light rain") {
    currentIcon.innerHTML = '<i class="bi bi-cloud-drizzle"></i>';
  }
  if (cityDescription === "few clouds") {
    currentIcon.innerHTML = '<i class="bi bi-cloud"></i>';
  }
  if (cityDescription === "broken clouds") {
    currentIcon.innerHTML = '<i class="bi bi-cloud"></i>';
  }
  if (cityDescription === "fog") {
    currentIcon.innerHTML = '<i class="bi bi-cloud-fog"></i>';
  }
  if (cityDescription === "wind") {
    currentIcon.innerHTML = '<i class="bi bi-wind"></i>';
  }
  if (cityDescription === "snow") {
    currentIcon.innerHTML = '<i class="bi bi-snow"></i>';
  }
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let dateElement = document.querySelector("#current-date");
let currentTime = new Date();

dateElement.innerHTML = showCurrentTime(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
search("dallas");
