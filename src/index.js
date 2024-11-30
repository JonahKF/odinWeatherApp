import "./styles.css";

const screenController = () => {
  const key = "MPY6ZZCCS2KYRC8YBYF7H9RXP"; // Pls don't :')
  let celsiusFlag = true;

  const weatherDisplay = document.querySelector(".weather");
  const tempDisplay = document.querySelector(".temp");
  const weatherIconDisplay = document.querySelector(".weather-icon");
  const cityDisplay = document.querySelector(".city-name");

  // Default city
  let city = "kamakura";

  async function getWeather(city, key) {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`,
      { mode: "cors" },
    );
    const weatherData = await response.json();
    console.log("Fetched the following:", weatherData);
    updateDisplay(weatherData, city);
  }

  getWeather(city, key);

  const updateDisplay = (weather, city) => {
    let conditions = weather.currentConditions.conditions;
    let temp = weather.currentConditions.temp;
    celsiusFlag === true ? (temp = (temp - 32) / (9 / 5)) : temp;
    let cityName = weather.resolvedAddress
      .split(",")[0]
      .split("-")[0]
      .toUpperCase();

    weatherDisplay.textContent = `${conditions}`;
    tempDisplay.textContent = `${Math.round(temp)}°`;
    // weatherIconDisplay
    cityDisplay.textContent = cityName;

    let cityField = document.querySelector("#city");
    cityField.placeholder = weather.resolvedAddress.split(",")[0].split("-")[0];

    let localTime = weather.currentConditions.datetime;
    updateGradient(localTime);
  };

  const updateGradient = (time) => {
    console.log(time);
    let convertedTime = time.split(":")[0];
    const childTop = document.querySelector(".child-top");
    const childBottom = document.querySelector(".child-bottom");
    childTop.style.background = `var(--gradient-${convertedTime})`;
    childBottom.style.color = `var(--color-${convertedTime})`;
  };

  const updateForecasts = (currentCityWeather) => {};

  const setSunriseSunset = () => {};

  const form = document.querySelector("#search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityField = document.querySelector("#city");
    let searchTerm = cityField.value;
    cityField.value = "";
    getWeather(searchTerm, key);
  });

  // const searchCities = (city) => {};

  const displaySettings = () => {};
};

screenController();
