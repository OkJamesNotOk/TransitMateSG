import { View, Text } from 'react-native';
import { useMemo } from 'react';

import createStyles from '../css/ThemeSelectionStyles';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSelectionScreen() {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Select an available theme.
      </Text>
    </View>
  );
}