
import { StyleSheet } from 'react-native';

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  contentContainer: {
    padding: 15,
    paddingBottom: 35,
  },

  description: {
    fontSize: 14,
    color: COLORS.secondaryText,
    marginBottom: 20,
  },

  coordinateRow: {
    flexDirection: 'row',
    gap: 10,
  },

  coordinateField: {
    flex: 1,
  },

  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },

  input: {
    backgroundColor: COLORS.card,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  hint: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 8,
    marginBottom: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },

  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 25,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  secondaryButtonText: {
    color: COLORS.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 13,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: COLORS.onAccent,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  disabledButton: {
    opacity: 0.4,
  },

  mapContainer: {
    height: 330,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  map: {
    flex: 1,
    width: '100%',
  },

  mapHint: {
    fontSize: 12,
    color: COLORS.secondaryText,
    marginTop: 8,
    marginBottom: 20,
  },

});

export default createStyles;
