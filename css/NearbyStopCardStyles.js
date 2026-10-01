import { StyleSheet } from 'react-native';

import COLORS from './colors'

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  bookmarkButton: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: COLORS.accent,
    borderRadius: 10,
  },

  bookmarkButtonInactive: {
    backgroundColor: COLORS.lighterbackground,
  },

  bookmarkIcon: {
    fontSize: 20,
  },

  nearbyCard: {
    padding: 12,
    borderRadius: 10,
    marginRight: 5,
    width: 150,
  },

  nearbyCardEven: {
    backgroundColor: COLORS.card,
  },

  nearbyCardOdd: {
    backgroundColor: COLORS.cardLight,
  },

  nearbyCode: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  nearbyDistance: {
    color: COLORS.accent,
    marginTop: 15,
    fontSize: 12,
  },

  itemText: {
    color: COLORS.text
  },

});

export default styles;