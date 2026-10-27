import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useMemo } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import createStyles from '../css/ThemeSelectionStyles';
import { THEMES } from '../css/colors';
import { useTheme } from '../context/ThemeContext';

const themeOptions = Object.entries(THEMES).map(([value, config]) => ({
  value,
  label: config.name,
  description: config.description,
}));

export default function ThemeSelectionScreen() {
  const { theme, setTheme, colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.description}>
        Choose the appearance of TransitMateSG.
      </Text>

      {themeOptions.map((option) => {
        const preview = THEMES[option.value];
        const selected = theme === option.value;

        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.themeRow, selected && styles.themeRowActive]}
            onPress={() => setTheme(option.value)}
            activeOpacity={0.75}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            accessibilityLabel={`${option.label} theme`}
          >
          <View style={styles.themeHeader}>
            <View style={styles.themeInfo}>
              <Text style={styles.themeName}>{option.label}</Text>
              <Text style={styles.themeDescription}>{option.description}</Text>
            </View>
            <Ionicons
              name={selected ? 'checkmark-circle' : 'ellipse-outline'}
              size={23}
              color={selected ? COLORS.accent : COLORS.secondaryText}
            />
          </View>

            <View style={styles.previewRow}>
              {[
                preview.background,
                preview.card,
                preview.lighterbackground,
                preview.accent,
              ].map((color, index) => (
                <View
                  key={index}
                  style={[styles.previewBlock, { backgroundColor: color }]}
                />
              ))}
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}