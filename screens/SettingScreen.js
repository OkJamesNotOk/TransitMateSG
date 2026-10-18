import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TextInput,
} from 'react-native';

import { useState, useMemo } from 'react';

import createStyles from '../css/SettingScreenStyles';
import { useTheme } from '../context/ThemeContext';
import useResponsiveSpacing from '../uitilities/useResponsiveSpacing';

const themeOptions = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'Midnight', value: 'midnight' },
];

export default function SettingsScreen({
    updateBusData, isUpdating, 
    setSelectedCoordinates, removeBusData, setLocationMode, locationMode,
  })
{
  const { theme, setTheme, colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);

  // store manually entered coordinates
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

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
        {/* Theme selection */}
        <Text style={styles.appearanceTitle}>Appearance</Text>
        <View style={styles.themeRow}>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.themeOption,
                theme === option.value && styles.themeOptionActive,
              ]}
              onPress={() => setTheme(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected: theme === option.value }}
            >
              <Text style={[
                styles.themeOptionText,
                theme === option.value && styles.themeOptionTextActive,
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* switch between GPS and manual location */}
        <View style={styles.locationSwitch}>
          <TouchableOpacity
            style={[
              styles.locationOption,
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
              locationMode === 'manual' && styles.locationOptionActive,
            ]}
            onPress={() => setLocationMode('manual')}
          >
            <Text style={[
              styles.locationOptionText,
              locationMode === 'manual' && styles.locationOptionTextActive,
            ]}>Manual</Text>
          </TouchableOpacity>
        </View>

        {/* inputs for latitude and longitude */}
        <View style={styles.inputRow}>
          <Text style={styles.label}>Latitude</Text>

          <TextInput
            style={styles.input}
            value={latitude}
            onChangeText={(text) => filterCoordinateInput(text, setLatitude)}
            placeholder="e.g. 1.290"
            placeholderTextColor={COLORS.secondaryText}
            keyboardType="default"
            editable={locationMode === 'manual'}
          />
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.label}>Longitude</Text>

          <TextInput
            style={styles.input}
            value={longitude}
            onChangeText={(text) => filterCoordinateInput(text, setLongitude)}
            placeholder="e.g. 103.851"
            placeholderTextColor={COLORS.secondaryText}
            keyboardType="default"
            editable={locationMode === 'manual'}
          />
        </View>

        {/* reset or apply manual coordinates */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.buttonInRow}
            onPress={resetCoordinates}
          >
            <Text style={styles.buttonText}>
              Reset
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonInRow,
              locationMode === 'gps' && styles.disabledButton,
            ]}
            onPress={applyCoordinates}
            disabled={locationMode === 'gps'}
          >
            <Text style={styles.buttonText}>
              Apply Coordinates
            </Text>
          </TouchableOpacity>
        </View>

        {/* predefined Singapore location */}
        <TouchableOpacity
          style={styles.button}
          onPress={setDemoLocation}
        >
          <Text style={styles.buttonText}>
            Use Demo Singapore Location
          </Text>
        </TouchableOpacity>

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