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
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`,
        { mode: "cors" },
      );
      const weatherData = await response.json();
      console.log("Fetched the following:", weatherData);
      updateDisplay(weatherData, city);
    } catch (err) {
      throw err;
    }
  }

  getWeather(city, key);

  const updateDisplay = (weather, city) => {
    let conditions = weather.currentConditions.conditions;
    let temp = weather.currentConditions.temp;
    celsiusFlag === true ? (temp = (temp - 32) / (9 / 5)) : (temp = temp);
    let cityName = weather.resolvedAddress;

    weatherDisplay.textContent = `${conditions}`;
    tempDisplay.textContent = `${Math.round(temp)}°`;
    // weatherIconDisplay
    cityDisplay.textContent = cityName;
  };

  const updateGradient = (time) => {
    // Convert time to HH format (0 to 23)
    let convertedTime = time;
    const leftChildTop = document.querySelector(".left-child-top");
    leftChildTop.background = `var(--gradient-${convertedTime})`;
  };

  const updateForecasts = (currentCityWeather) => {};

  const setSunriseSunset = () => {};

  const searchCities = () => {};

  const displaySettings = () => {};

  const toggleTempAndWeatherColor = () => {};

  const toggleCityNameColor = () => {};
};

screenController();
