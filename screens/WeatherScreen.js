import {
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import ForecastCard from '../components/ForecastCard';
import { getWeather } from '../services/weatherService';
import styles from '../css/WeatherScreenStyles';
import COLORS from '../css/colors';
import { getWeatherCondition, getWeatherIcon } from '../uitilities/weatherFunctions';
import useResponsiveSpacing from '../uitilities/useResponsiveSpacing';

export default function WeatherScreen({selectedCoordinates, locationMode}) {
  // store current weather and forecast data
  const [currentTemp, setCurrentTemp] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [feelsLike, setFeelsLike] = useState(null);
  const [weatherCode, setWeatherCode] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);

  // load current weather and forecast data
  const loadWeather = async () => {
    try {
      let coordinates = null;

      if (locationMode === 'manual') {
        if (!selectedCoordinates) {
          return;
        }

        coordinates = selectedCoordinates;
      }

      const weather = await getWeather(coordinates);

      setCurrentTemp(weather.currentTemp);
      setFeelsLike(weather.feelsLike);
      setWeatherCode(weather.weatherCode);
      setForecast(weather.forecast);
      setHumidity(weather.humidity);
      setWindSpeed(weather.windSpeed);

    } catch (error) {
      console.log(error);
    }
  };


  // load or reload weather when location changes
  useEffect(() => {
    if (locationMode === 'manual' && !selectedCoordinates) {
      return;
    }

    loadWeather();
  }, [locationMode, selectedCoordinates]);

  // select tip based on weather condition
  const getWeatherTip = (code) => {
    if (
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82) ||
      code >= 95
    ) {
      return 'Bring an umbrella for your journey.';
    }

    if (
      code === 0 ||
      code === 1 ||
      code === 2
    ) {
      return 'Stay hydrated during your journey.';
    }

    // default tip for other weather conditions
    return 'Have a comfortable journey.';
  };

  // select icon for the weather tip
  const getWeatherTipIcon = (code) => {
    if (
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82) ||
      code >= 95
    ) {
      return 'umbrella-outline';
    }

    if (
      code === 0 ||
      code === 1 ||
      code === 2
    ) {
      return 'water-outline';
    }

    // default icon for other weather conditions
    return 'partly-sunny-outline';
  };

  // select background color based on weather condition
  const getWeatherBackground = (code) => {
    if (code === 0)
      return COLORS.weatherClear;

    if (code === 1 || code === 2)
      return COLORS.weatherPartlyCloudy;

    if (code === 3)
      return COLORS.weatherCloudy;

    if (
      (code >= 51 && code <= 67) ||
      (code >= 80 && code <= 82)
    )
      return COLORS.weatherRain;

    if (code >= 95)
      return COLORS.weatherThunderstorm;

    // fall back if code is invalid
    return COLORS.weatherClear;
  };

  const {screenPaddingWidth, screenPaddingHeight, } = useResponsiveSpacing(); 

  // UI
  return (
    <ScrollView 
      style={[
          styles.container,
              {
                backgroundColor: weatherCode !== null
                ? getWeatherBackground(weatherCode)
                : COLORS.weatherClear
              }
        ]}
      contentContainerStyle={[
        styles.contentContainer,
        { 
          paddingHorizontal: screenPaddingWidth,
          paddingVertical: screenPaddingHeight,
        }
      ]}
    >

      {/* current weather */}
      <View style={styles.titleRow}>
        <Ionicons
          name="partly-sunny"
          size={28}
          color={COLORS.text}
        />

        <Text style={styles.title}>
          Current Weather
        </Text>
      </View>

      {/* current weather information */}
      <View style={styles.currentCard}>

        <View style={styles.conditionRow}>
          {weatherCode !== null && (
            <Ionicons
              name={getWeatherIcon(weatherCode)}
              size={24}
              color={COLORS.text}
            />
          )}

          <Text style={styles.condition}>
            {weatherCode !== null
              ? getWeatherCondition(weatherCode)
              : 'Loading...'}
          </Text>
        </View>

        <Text style={styles.currentTemp}>
          {currentTemp ?? '--'}°C
        </Text>

        <Text style={styles.feelsLike}>
          Feels like {feelsLike ?? '--'}°C
        </Text>

        <View style={styles.weatherDetails}>
          <View style={styles.detailRow}>
            <Ionicons
              name="water-outline"
              size={18}
              color={COLORS.text}
            />

            <Text style={styles.detailText}>
              Humidity: {humidity ?? '--'}%
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons
              name="speedometer-outline"
              size={18}
              color={COLORS.text}
            />

            <Text style={styles.detailText}>
              Wind: {windSpeed ?? '--'} km/h
            </Text>
          </View>
        </View>

        {/* tip display */}
        <View style={styles.tipCard}>
          {weatherCode !== null && (
            <Ionicons
              name={getWeatherTipIcon(weatherCode)}
              size={20}
              color={COLORS.text}
            />
          )}

          <Text style={styles.tipText}>
            <Text style={styles.tipTitle}>
              Tip:{' '}
            </Text>

            {weatherCode !== null 
            ? getWeatherTip(weatherCode) : 'Loading tip...'}
          </Text>
        </View>
      </View>

      {/* 3 day weather forecast */}
      <Text style={styles.subtitle}>
        3 Day Forecast
      </Text>

      {forecast.map((day) => (
        <ForecastCard
          key={day.date}
          day={day}
        />

      ))}

      {/* refresh weather data button */}
      <TouchableOpacity
        style={styles.button}
        onPress={loadWeather}
      >
        <Text style={styles.buttonText}>
          Refresh Weather
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}
