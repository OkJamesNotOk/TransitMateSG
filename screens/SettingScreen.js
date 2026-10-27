import { View, Text, TouchableOpacity, Pressable, Keyboard, Switch } from 'react-native';

import { useMemo } from 'react';

import createStyles from '../css/SettingScreenStyles';
import { useTheme } from '../context/ThemeContext';
import useResponsiveSpacing from '../uitilities/useResponsiveSpacing';
import Ionicons from '@expo/vector-icons/Ionicons';
import { THEMES } from '../css/colors';

export default function SettingsScreen({
    navigation, updateBusData, isUpdating, 
    setSelectedCoordinates, removeBusData, setLocationMode, locationMode,
  })
{
  const {
    theme,
    colors: COLORS,
    autoThemeOnStartup,
    setAutoThemeOnStartup,
  } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);

  // clear manually entered coordinates
  const resetCoordinates = () => {
    setLatitude('');
    setLongitude('');
    setSelectedCoordinates(null);
  };

  // apply manually entered coordinates
  const applyCoordinates = () => {
    if (!latitude || !longitude) {
      return;
    }

    setSelectedCoordinates({
      latitude: Number(latitude),
      longitude: Number(longitude),
    });
  };

  // predefined Singapore location for testing
  // or when user is not in Singapore
  const setDemoLocation = () => {
    const demoLatitude = '1.290';
    const demoLongitude = '103.851';

    setLatitude(demoLatitude);
    setLongitude(demoLongitude);

    setLocationMode('manual');

    setSelectedCoordinates({
      latitude: Number(demoLatitude),
      longitude: Number(demoLongitude),
    });
  };

  const filterCoordinateInput = (text, setValue) => {
    if (/^-?\d*\.?\d*$/.test(text)) {
      setValue(text);
    }
  };

  const {screenPaddingWidth, screenPaddingHeight, } = useResponsiveSpacing(); 

  return(
    <Pressable
      style={[
        styles.container,
        { 
          paddingHorizontal: screenPaddingWidth,
          paddingVertical: screenPaddingHeight,
        }
      ]}
      onPress={Keyboard.dismiss}
    >
      <View>
        {/* Appearance settings */}
        <Text style={styles.title}>Appearance</Text>
        <TouchableOpacity
          style={styles.appearanceRow}
          onPress={() => navigation.navigate('ThemeSelection')}
          activeOpacity={0.75}
          accessibilityRole="button"
          accessibilityLabel="Choose color theme"
        >
          <Ionicons name="color-palette-outline" size={23} color={COLORS.accent} />
          <View style={styles.appearanceInfo}>
            <Text style={styles.appearanceRowTitle}>Color Theme</Text>
            <Text style={styles.appearanceRowValue}>
              {THEMES[theme]?.name ?? theme}
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={21} color={COLORS.secondaryText} />
        </TouchableOpacity>

        {/* Automatic theme selection */}
        <View style={styles.autoThemeRow}>
          <View style={styles.autoThemeInfo}>
            <Text style={styles.autoThemeTitle}>Random Theme on Startup</Text>
            <Text style={styles.autoThemeDescription}>
              Choose a different theme each time the app starts.
            </Text>
          </View>
          <Switch
            value={autoThemeOnStartup}
            onValueChange={setAutoThemeOnStartup}
            trackColor={{ false: COLORS.border, true: COLORS.accent }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={COLORS.border}
            accessibilityLabel="Random Theme on Startup"
          />
        </View>

        {/* switch between GPS and manual location */}
        <Text style={styles.title}>Location Mode</Text>
        <View style={styles.locationSwitch}>
          <TouchableOpacity
            style={[
              styles.locationOption,
              styles.locationOptionLeft,
              locationMode === 'gps' && styles.locationOptionActive,
            ]}
            onPress={() => setLocationMode('gps')}
          >
            <Text style={[
              styles.locationOptionText,
              locationMode === 'gps' && styles.locationOptionTextActive,
            ]}>GPS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.locationOption,
              styles.locationOptionRight,
              locationMode === 'manual' && styles.locationOptionActive,
            ]}
            onPress={() => navigation.navigate('ManualLocation')}
          >
            <Text style={[
              styles.locationOptionText,
              locationMode === 'manual' && styles.locationOptionTextActive,
            ]}>Manual</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />


        {/* update or remove stored bus data */}
        <TouchableOpacity
          style={styles.button}
          onPress={removeBusData}
          disabled={isUpdating}
        >
          <Text style={styles.buttonText}>
            Remove Bus Data
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={updateBusData}
          disabled={isUpdating}
        >
          <Text style={styles.buttonText}>
            Update Bus Data
          </Text>
        </TouchableOpacity>
      
      </View>
    </Pressable>
  );

}