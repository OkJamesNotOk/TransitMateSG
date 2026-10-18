import { View, Text, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { getWeatherCondition, getWeatherIcon } from '../uitilities/weatherFunctions';
import createStyles from '../css/WeatherScreenStyles';
import { useTheme } from '../context/ThemeContext';

export default function ForecastCard({ day }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  
  // format date for display
  const formattedDate = new Date(day.date).toLocaleDateString(
    'en-SG',
    {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }
  );
  
  return (
    <View style={styles.forecastCard}>
      <View>
        <Text style={styles.forecastDate}>
          {formattedDate}
        </Text>

        {/* weather condition and icon */}
        <View style={styles.forecastConditionRow}>
          <Ionicons
            name={getWeatherIcon(day.weatherCode)}
            size={16}
            color={COLORS.text}
          />

          <Text style={styles.forecastCondition}>
            {getWeatherCondition(day.weatherCode)}
          </Text>
        </View>

      </View>

      {/* Temperature range and rain probability */}
      <View style={styles.forecastWeatherInfo}>
        <Text style={styles.forecastTemperature}>
          {day.max}°C / {day.min}°C
        </Text>

        <Text style={styles.forecastRain}>
          Rain: {day.rainProbability ?? 0}%
        </Text>
      </View>
    </View>
  );
}
