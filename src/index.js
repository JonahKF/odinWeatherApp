import "./styles.css";

const screenController = () => {
  const key = "MPY6ZZCCS2KYRC8YBYF7H9RXP"; // Pls don't :')
  let celsiusFlag = true;
  let currentWeather;

  const weatherDisplay = document.querySelector(".weather");
  const tempDisplay = document.querySelector(".temp");
  const cityDisplay = document.querySelector(".city-name");

  async function getWeather(city, key) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`,
      { mode: "cors" },
    );
    const weatherData = await response.json();
    console.log("Fetched the following:", weatherData);
    updateDisplay(weatherData, city);
    currentWeather = weatherData;
  }

  // Default city
  let city = "kamakura";
  getWeather(city, key);

  const updateDisplay = (weather) => {
    let conditions = weather.currentConditions.conditions;
    let temp = weather.currentConditions.temp;
    celsiusFlag === true ? (temp = (temp - 32) / (9 / 5)) : temp;
    let cityName = weather.resolvedAddress
      .split(",")[0]
      .split("-")[0]
      .toUpperCase();

    weatherDisplay.textContent = `${conditions}`;
    tempDisplay.textContent = `${Math.round(temp)}°`;
    const pageIcon = document.querySelector("#master-icon");
    const conditionsIcon = weather.currentConditions.icon;
    changeIcons(weather, pageIcon, conditionsIcon);
    cityDisplay.textContent = cityName;

    let cityField = document.querySelector("#city");
    cityField.placeholder = weather.resolvedAddress.split(",")[0].split("-")[0];

    let localTime = getHours(weather);
    updateTimeVisuals(localTime);

    // Update bottom based on .active button
    updateDailyForecast(weather);
    // updateWeeklyForecast(weather);
  };

  const updateTimeVisuals = (convertedTime) => {
    const childTop = document.querySelector(".child-top");
    const childBottom = document.querySelector(".child-bottom");
    const upperContainer = document.querySelector(".weather-info-container");
    const activeButton = document.querySelector(".active");

    childTop.style.background = `var(--gradient-${convertedTime})`;
    childBottom.style.color = `var(--color-${convertedTime})`;
    activeButton.style.borderBottomColor = `var(--color-${convertedTime})`;

    6 < parseInt(convertedTime) && parseInt(convertedTime) < 12
      ? (upperContainer.style.color = "rgba(0, 0, 0, 0.9)")
      : (upperContainer.style.color = "rgba(255, 255, 255, 0.9)");

    const timedGreeting = document.querySelector(".timed-greeting");
    if (4 < parseInt(convertedTime) && parseInt(convertedTime) < 12) {
      timedGreeting.textContent = "Good morning,";
    } else if (11 < parseInt(convertedTime) && parseInt(convertedTime) < 19) {
      timedGreeting.textContent = "Good afternoon,";
    } else {
      timedGreeting.textContent = "Good evening,";
    }
  };

  const changeIcons = (weatherData, pageIcon, conditions) => {
    const iconFlag = conditions;
    pageIcon.className = "";
    pageIcon.classList.add("fa-solid");

    if (iconFlag === "cloudy") {
      pageIcon.classList.add("fa-cloud");
    } else if (iconFlag === "partly-cloudy-day") {
      pageIcon.classList.add("fa-cloud-sun");
    } else if (iconFlag === "partly-cloudy-night") {
      pageIcon.classList.add("fa-cloud-moon");
    } else if (iconFlag === "clear-day") {
      pageIcon.classList.add("fa-sun");
    } else if (iconFlag === "clear-night") {
      pageIcon.classList.add("fa-moon");
    } else if (iconFlag === "snow") {
      pageIcon.classList.add("fa-snowflake");
    } else if (iconFlag === "rain") {
      pageIcon.classList.add("fa-cloud-rain");
    } else if (iconFlag === "fog") {
      pageIcon.classList.add("fa-smog");
    } else if (iconFlag === "wind") {
      pageIcon.classList.add("fa-wind");
    }
  };

  const getHours = (weatherData) => {
    let time = weatherData.currentConditions.datetime;
    let convertedTime = time.split(":")[0];
    return convertedTime;
  };

  const updateDailyForecast = (weatherData) => {
    let time = getHours(weatherData);
    const forecastCards = document.querySelectorAll(".forecast-card");
    forecastCards.forEach((card, index) => {
      let calcTime = parseInt(time) + index;
      calcTime >= 24 ? (calcTime = calcTime - 24) : calcTime;
      const title = card.querySelector(".title");
      if (index === 0) {
        title.textContent = "Now";
      } else {
        title.textContent = calcTime;
      }

      const iconBox = card.querySelector(".icon");
      const icon = iconBox.querySelector("i");
      const conditionsIcon = weatherData.days[0].hours[calcTime].icon;
      changeIcons(weatherData, icon, conditionsIcon);

      const rainChance = card.querySelector(".rain-chance");
      const dataRainChance = Math.round(
        weatherData.days[0].hours[calcTime].precipprob,
      );
      rainChance.textContent = `${dataRainChance} %`;
    });
  };

  const updateWeeklyForecast = (weatherData) => {
    const forecastCards = document.querySelectorAll(".forecast-card");
    forecastCards.forEach((card, index) => {
      const title = card.querySelector(".title");
      if (index === 0) {
        title.textContent = "Today";
      } else {
        title.textContent = weatherData.days[index].datetime;
      }

      const iconBox = card.querySelector(".icon");
      const icon = iconBox.querySelector("i");
      const conditionsIcon = weatherData.days[index].icon;
      changeIcons(weatherData, icon, conditionsIcon);

      const rainChance = card.querySelector(".rain-chance");
      const dataRainChance = Math.round(weatherData.days[index].precipprob);
      rainChance.textContent = `${dataRainChance} %`;
    });
  };

  const form = document.querySelector("#search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityField = document.querySelector("#city");
    city = cityField.value;
    cityField.value = "";
    getWeather(city, key);
  });

  const dailyForecastToggle = document.querySelector(".today-btn");
  const weeklyForecastToggle = document.querySelector(".week-btn");

  dailyForecastToggle.addEventListener("click", () => {
    dailyForecastToggle.classList.remove("active");
    dailyForecastToggle.classList.add("active");
    weeklyForecastToggle.classList.remove("active");
    weeklyForecastToggle.style.borderBottomColor = "";

    let localTime = getHours(currentWeather);
    updateTimeVisuals(localTime);

    console.log(currentWeather);
    updateDailyForecast(currentWeather);
  });

  weeklyForecastToggle.addEventListener("click", () => {
    weeklyForecastToggle.classList.remove("active");
    weeklyForecastToggle.classList.add("active");
    dailyForecastToggle.classList.remove("active");
    dailyForecastToggle.style.borderBottomColor = "";

    let localTime = getHours(currentWeather);
    updateTimeVisuals(localTime);

    console.log(currentWeather);
    updateWeeklyForecast(currentWeather);
  });

  // const displaySettings = () => {};
};

screenController();
