// Open-Meteo weather codes based on WMO interpretation
/* 
0 : clear
1,2 : Partly Cloudy
3 : Cloudy
51-67: rain
80-82: Rain
95+: thunderstorms
*/

// convert weather code into weather condition
const getWeatherCondition = (code) => {
  if (code === 0) return 'Clear';

  if (code === 1 || code === 2)
    return 'Partly Cloudy';

  if (code === 3)
    return 'Cloudy';

  if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  )
    return 'Rain';

  if (code >= 95)
    return 'Thunderstorm';

  return 'Weather';
};

// select icon based on weather code
const getWeatherIcon = (code) => {
  if (code === 0)
    return 'sunny-outline';

  if (code === 1 || code === 2)
    return 'partly-sunny-outline';

  if (code === 3)
    return 'cloudy-outline';

  if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  )
    return 'rainy-outline';

  if (code >= 95)
    return 'thunderstorm-outline';

  return 'partly-sunny-outline';
};

export {
  getWeatherCondition,
  getWeatherIcon,
}