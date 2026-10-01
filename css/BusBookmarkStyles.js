import { StyleSheet } from 'react-native';

import COLORS from './colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  bookmarkRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'stretch',

    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,

    marginBottom: 10,
    overflow: 'hidden',
  },

  stopInfo: {
    flex: 6,
    padding: 12,
    justifyContent: 'center',
  },

  buttonInRow: {
    flex: 2,

    backgroundColor: COLORS.accent,

    justifyContent: 'center',
    alignItems: 'center',

    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },

  bookmarkButton: {
    flex: 2,
    backgroundColor: COLORS.lighterbackground,

    justifyContent: 'center',
    alignItems: 'center',

    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },

  stopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },

  stopCode: {
    fontSize: 14,
    color: COLORS.text,
  },

  roadName: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 2,
  },


  emptyBookmark: {
    color: COLORS.secondaryText,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  
});

export default styles;