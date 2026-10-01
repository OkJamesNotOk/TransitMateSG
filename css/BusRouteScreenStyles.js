import { StyleSheet } from 'react-native';
import COLORS from './colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  busNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },

  direction: {
    fontSize: 15,
    color: COLORS.secondaryText,
    marginBottom: 16,
  },

  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical: 14,
    paddingHorizontal: 12,

    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  stopInfo: {
    flex: 1,
  },

  currentStopCard: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderColor: COLORS.accent,
    borderBottomColor: COLORS.accent,
    backgroundColor: COLORS.lighterbackground,
  },

  stopName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },

  stopDetails: {
    fontSize: 13,
    color: COLORS.secondaryText,
  },
});