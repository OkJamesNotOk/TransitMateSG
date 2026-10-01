import { StyleSheet } from 'react-native';

import COLORS from './colors'

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 5,
  },

  cardEven: {
    backgroundColor: COLORS.card,
  },

  cardOdd: {
    backgroundColor: COLORS.cardLight,
  },

  busNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.text,
  },

  etaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  operatorText: {
    color: COLORS.secondaryText,
  },

  etaLabel: {
    flex: 1,
    color: COLORS.secondaryText,
  },

  etaText: {
    color: COLORS.accent,
  },

  etaButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: COLORS.lighterbackground,
    padding: 8,
    borderRadius: 10,
    marginLeft: 2,
  },

});

export default styles;