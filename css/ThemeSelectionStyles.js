import { StyleSheet } from 'react-native';

const createStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 15,
  },
  description: {
    fontSize: 14,
    color: COLORS.secondaryText,
  },
});

export default createStyles;