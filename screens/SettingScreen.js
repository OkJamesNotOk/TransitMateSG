import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Keyboard,
  TextInput,
} from 'react-native';

import { useState } from 'react';

import styles from '../css/SettingScreenStyles';
import useResponsiveSpacing from '../uitilities/useResponsiveSpacing';

export default function SettingsScreen({
    updateBusData, isUpdating, 
    setSelectedCoordinates, removeBusData, setLocationMode, locationMode,
  })
{

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
        {/* switch between GPS and manual location */}
        <View style={styles.locationSwitch}>
          <TouchableOpacity
            style={[
              styles.locationOption,
              locationMode === 'gps' && styles.locationOptionActive,
            ]}
            onPress={() => setLocationMode('gps')}
          >
            <Text style={styles.buttonText}>GPS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.locationOption,
              locationMode === 'manual' && styles.locationOptionActive,
            ]}
            onPress={() => setLocationMode('manual')}
          >
            <Text style={styles.buttonText}>Manual</Text>
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