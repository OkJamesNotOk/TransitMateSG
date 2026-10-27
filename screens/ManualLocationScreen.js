
import { ScrollView, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { useMemo, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import createStyles from '../css/ManualLocationScreenStyles';
import { useTheme } from '../context/ThemeContext';

export default function ManualLocationScreen({ navigation, selectedCoordinates, setSelectedCoordinates, setLocationMode }) {
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);
  const mapRef = useRef(null);

  // Draft coordinates, initially using the last applied manual location
  const [latitude, setLatitude] = useState(selectedCoordinates ? String(selectedCoordinates.latitude) : '');
  const [longitude, setLongitude] = useState(selectedCoordinates ? String(selectedCoordinates.longitude) : '');

  const filterCoordinateInput = (text, setValue) => {
    if (/^-?\d*\.?\d*$/.test(text)) setValue(text);
  };

  const parsedLatitude = latitude.trim() === '' ? NaN : Number(latitude);
  const parsedLongitude = longitude.trim() === '' ? NaN : Number(longitude);
  const isValidCoordinates = Number.isFinite(parsedLatitude) && Number.isFinite(parsedLongitude) &&
    parsedLatitude >= -90 && parsedLatitude <= 90 &&
    parsedLongitude >= -180 && parsedLongitude <= 180;
  const draftCoordinates = isValidCoordinates
  ? { latitude: parsedLatitude, longitude: parsedLongitude }
  : null;

  const updateCoordinatesFromMap = (coordinate) => {
    setLatitude(coordinate.latitude.toFixed(6));
    setLongitude(coordinate.longitude.toFixed(6));
    Keyboard.dismiss();
  };

  const centerMapOnDraft = () => {
    if (!draftCoordinates) return;
    mapRef.current?.animateToRegion({
      ...draftCoordinates,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    }, 350);
  };

  const resetCoordinates = () => {
    setLatitude('');
    setLongitude('');
  };

  const setDemoLocation = () => {
    setLatitude('1.290');
    setLongitude('103.851');
    mapRef.current?.animateToRegion({
      latitude: 1.290,
      longitude: 103.851,
      latitudeDelta: 0.006,
      longitudeDelta: 0.006,
    }, 350);
  };

  const applyCoordinates = () => {
    if (!isValidCoordinates) return;
    setSelectedCoordinates({ latitude: parsedLatitude, longitude: parsedLongitude });
    setLocationMode('manual');
    Keyboard.dismiss();
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
      <Text style={styles.description}>Enter coordinates or select a location on the map.</Text>

      <View style={styles.coordinateRow}>
        <View style={styles.coordinateField}>
          <Text style={styles.label}>Latitude</Text>
          <TextInput
            style={styles.input}
            value={latitude}
            onChangeText={(text) => filterCoordinateInput(text, setLatitude)}
            placeholder="e.g. 1.290"
            placeholderTextColor={COLORS.secondaryText}
            keyboardType="numbers-and-punctuation"
            onEndEditing={centerMapOnDraft}
          />
        </View>
        <View style={styles.coordinateField}>
          <Text style={styles.label}>Longitude</Text>
          <TextInput
            style={styles.input}
            value={longitude}
            onChangeText={(text) => filterCoordinateInput(text, setLongitude)}
            placeholder="e.g. 103.851"
            placeholderTextColor={COLORS.secondaryText}
            keyboardType="numbers-and-punctuation"
            onEndEditing={centerMapOnDraft}
          />
        </View>
      </View>

      <Text style={styles.hint}>Latitude: -90 to 90 | Longitude: -180 to 180</Text>

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: selectedCoordinates?.latitude ?? 1.290,
            longitude: selectedCoordinates?.longitude ?? 103.851,
            latitudeDelta: 0.006,
            longitudeDelta: 0.006,
          }}
          onPress={(event) => updateCoordinatesFromMap(event.nativeEvent.coordinate)}
        >
          {draftCoordinates && (
            <Marker
              coordinate={draftCoordinates}
              title="Selected Location"
              draggable
              stopPropagation
              onDragEnd={(event) => updateCoordinatesFromMap(event.nativeEvent.coordinate)}
            />
          )}
        </MapView>
      </View>
      <Text style={styles.mapHint}>Tap the map or drag the marker to select a location.</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={resetCoordinates}>
          <Text style={styles.secondaryButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={setDemoLocation}>
          <Text style={styles.secondaryButtonText}>Demo Singapore</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.secondaryButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryButton, !isValidCoordinates && styles.disabledButton]}
          onPress={applyCoordinates}
          disabled={!isValidCoordinates}
        >
          <Text style={styles.primaryButtonText}>Apply Location</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
