import "./styles.css";

const screenController = () => {
  const key = "MPY6ZZCCS2KYRC8YBYF7H9RXP"; // Pls don't :')
  let city = "london";

  async function getWeather(city, key) {
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`,
        { mode: "cors" },
      );
      const weatherData = await response.json();
      console.log("Fetched the following:", weatherData);
      return weatherData;
    } catch (err) {
      throw err;
    }
  }

  let currentCityWeather = getWeather(city, key);

  const updateDisplay = (currentCityWeather) => {};
};

screenController();
