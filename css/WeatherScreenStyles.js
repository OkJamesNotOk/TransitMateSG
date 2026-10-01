import { StyleSheet, } from 'react-native';
import COLORS from './colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  contentContainer: {
    padding: 10,
    paddingBottom: 40,
  },

  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  currentCard: {
    backgroundColor: COLORS.card,
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
  },

  currentTemp: {
    fontSize: 50,
    fontWeight: 'bold',
    marginTop: 10,
    color: COLORS.text,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  condition: {
    fontSize: 25,
    fontWeight: '600',
    color: COLORS.text,
  },

  conditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  feelsLike: {
    fontSize: 16,
    marginTop: 5,
    color: COLORS.secondaryText,
  },

  weatherDetails: {
    marginTop: 15,
    alignItems: 'center',
    gap: 5,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  tipCard: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    padding: 20,
  },

  tipTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: COLORS.text,
  },

  tipText: {
    fontSize: 15,
    color: COLORS.text,
  },

  // Forecast Card
  forecastCard: {
    backgroundColor: COLORS.cardLight,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  forecastDate: {
    fontWeight: 'bold',
    color: COLORS.text,
  },

  forecastConditionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
    color: COLORS.secondaryText,
  },

  forecastCondition: {
    fontSize: 14,
    color: COLORS.text,
  },

  forecastWeatherInfo: {
    alignItems: 'flex-end',
  },

  forecastTemperature: {
    fontWeight: '600',
    color: COLORS.text,
  },

  forecastRain: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.secondaryText,
  },

  detailText: {
    color: COLORS.text,
  },

});

export default styles;