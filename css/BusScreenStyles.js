import { StyleSheet } from 'react-native';

import COLORS from './colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  heading: {
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: 10,
  },

  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  bookmarkButton: {
    flexShrink: 0,
    backgroundColor: COLORS.accent,

    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,

    justifyContent: 'center',
    alignItems: 'center',
  },

  bookmarkButtonInactive: {
    backgroundColor: COLORS.lighterbackground,
  },

  button: {
    backgroundColor: COLORS.accent,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  searchInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 12,
    color: COLORS.text,
  },

  searchContainer: {
    marginBottom: 15,
  },

  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,

    overflow: 'hidden',
  },

  clearButton: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: COLORS.lighterbackground,

    paddingHorizontal: 10,

    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },

  clearText: {
    fontSize: 16,
    color: COLORS.secondaryText,
  },

  dropdown: {
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    maxHeight: 250,
    marginTop: 5,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  stopCode: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.text,
  },

  roadName: {
    color: COLORS.secondaryText,
    fontSize: 12,
  },

  dismissButton: {
    padding: 12,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.lighterbackground,
    borderRadius: 10,
  },

  dismissText: {
    color: COLORS.accent,
    fontWeight: 'bold',
  },

  itemText: {
    color: COLORS.text,
  },

  dismissRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.lighterbackground,
    borderRadius: 10,
    padding: 11,
  },

  searchHint: {
    flex: 1,
    color: COLORS.secondaryText,
    fontSize: 11,
  },

  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: COLORS.text
  },

  mapContainer: {
    flex: 1,
    borderRadius: 12,
  },

  map: {
    flex: 1,
    width :'100%',
  },

  mainContent: {
    flex: 1,
    minHeight: 0,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 10,
  },

  buttonInRow: {
    flexDirection: 'row',
    flex: 1,
    gap: 5,
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  selectedStopButton: {
    position: 'absolute',
    bottom: 15,
    alignSelf: 'center',

    backgroundColor: COLORS.accent,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,

    alignItems: 'center',
    justifyContent: 'center',

    zIndex: 10,
    elevation: 5,
  },

  nearbyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.text,
  },

  nearbyList: {
    flexGrow: 0,
    flexShrink: 0,
    height: 130,
    marginBottom: 10,
  },

  // custom pin styling to show location in manual mode
  manualLocationMarker: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 122, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  manualLocationDot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    borderWidth: 3,
    borderColor: 'white',
  },

  notificationBanner: {
    position: 'absolute',
    top: 10,
    left: 15,
    right: 15,

    backgroundColor: COLORS.accent,

    padding: 12,
    borderRadius: 10,

    alignItems: 'center',

    zIndex: 999,
    elevation: 10,
  },

  notificationBannerText: {
    color: 'white',
    fontWeight: 'bold',
  },

});

export default styles;