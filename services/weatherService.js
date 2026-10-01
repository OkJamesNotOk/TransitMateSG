import * as Location from 'expo-location';

// Retrieves current weather and a 3 day forecast using the user's GPS location
export async function getWeather(manualCoord = null) {
  let latitude;
  let longitude;

  if (manualCoord) {
    // use manual coordiantes
    latitude = manualCoord.latitude;
    longitude = manualCoord.longitude;
  }
  else{
    // Get the device's GPS coordinates
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Location permission denied');
    }

    const location = await Location.getCurrentPositionAsync({});
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
  }

  // api reequest current weather and a 3 day forecast from Open-Meteo
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=3&timezone=auto`
  );

  // Stop if the weather request is unsuccessful
  if (!response.ok) {
    throw new Error('Unable to retrieve weather data');
  }

  const data = await response.json();

  // Convert Open-Meteo's daily arrays into objects
  const forecast = data.daily.time.map(
    (date, index) => ({
      date: date,
      max: data.daily.temperature_2m_max[index],
      min: data.daily.temperature_2m_min[index],
      weatherCode: data.daily.weather_code[index],
      rainProbability: data.daily.precipitation_probability_max[index],
    })
  );

  // weather values required by Weather Screen
  return {
    currentTemp: data.current.temperature_2m,
    forecast: forecast,
    feelsLike: data.current.apparent_temperature,
    weatherCode: data.current.weather_code,
    humidity: data.current.relative_humidity_2m,
    windSpeed: data.current.wind_speed_10m,
  };
}