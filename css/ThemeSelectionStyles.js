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
    marginBottom: 16,
  },

  themeInfo: {
    flex: 1,
    marginRight: 10,
  },

  themeDescription: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 4,
  },

  themeRow: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  themeRowActive: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },

  themeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  themeName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  previewRow: {
    flexDirection: 'row',
    gap: 8,
  },

  previewBlock: {
    flex: 1,
    height: 38,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

});

export default createStyles;