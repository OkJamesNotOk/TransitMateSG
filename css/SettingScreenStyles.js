import { StyleSheet } from 'react-native';

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 10,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  label: {
    width: 100,
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  input: {
    flex: 1,

    backgroundColor: COLORS.card,
    color: COLORS.text,

    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,

    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  button: {
    backgroundColor: COLORS.accent,

    paddingVertical: 12,
    paddingHorizontal: 12,

    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonDisabled: {
    backgroundColor: COLORS.lighterbackground,
  },

  buttonText: {
    color: COLORS.onAccent,
    fontWeight: 'bold',
  },

  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 5,
  },

  buttonInRow: {
    flex: 1,
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  locationSwitch: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  locationOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
  },

  locationOptionLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderRightWidth: 0,
  },

  locationOptionRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  locationOptionActive: {
    backgroundColor: COLORS.accent,
  },

  locationOptionText: {
    color: COLORS.text,
    fontWeight: 'bold',
  },

  locationOptionTextActive: {
    color: COLORS.onAccent,
  },

  disabledButton: {
    opacity: 0.4,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },

  appearanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },

  appearanceInfo: {
    flex: 1,
  },

  appearanceRowTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },

  appearanceRowValue: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 3,
  },

  autoThemeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 25,
  },

  autoThemeInfo: {
    flex: 1,
  },

  autoThemeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  
  autoThemeDescription: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 3,
  },
});

export default createStyles;