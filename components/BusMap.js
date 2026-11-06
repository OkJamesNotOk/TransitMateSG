import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useMemo, useRef, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import createStyles from '../css/BusScreenStyles';
import { useTheme } from '../context/ThemeContext';
import LeafletMap from './LeafletMap';

export default function BusMap({
  userLocation,
  nearbyStops,
  selectBusStop,
  style,
  locationMode,
  selectedCoordinates,
}) {
  // keep track of the bus stop selected on the map
  const [selectedStopCode, setSelectedStopCode] = useState(null);
  const mapRef = useRef(null);
  const targetLocation = locationMode === 'manual' ? selectedCoordinates : userLocation;
  const { colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);

  useEffect(() => {
    if (!targetLocation) return;
    mapRef.current?.centerOn(targetLocation);
  }, [locationMode, targetLocation?.latitude, targetLocation?.longitude]);

  // wait until a location is available before displaying the map
  if (!targetLocation) {
    return (
      <View>
        <Text style={styles.mapLoadingText}>Loading map...</Text>
      </View>
    );
  }

  // get bus data for the selected marker
  const selectedStop = nearbyStops.find(
    (stop) => String(stop.BusStopCode) === selectedStopCode
  );

  return (
    <View style={styles.mapContainer}>
      <LeafletMap
        ref={mapRef}
        style={style}
        enableMapSelection={false}
        initialCenter={targetLocation}
        initialZoom={16}
        busStops={nearbyStops.map((stop) => ({
          code: String(stop.BusStopCode),
          latitude: Number(stop.Latitude),
          longitude: Number(stop.Longitude),
          description: stop.Description,
          roadName: stop.RoadName,
        }))}
        selectedStopCode={selectedStopCode}
        locationCoordinate={targetLocation}
        locationMode={locationMode}
        onStopPress={setSelectedStopCode}
        onReady={() => mapRef.current?.centerOn(targetLocation)}
      />

      <View style={styles.mapOverlay} pointerEvents="box-none">
        <View style={styles.mapOverlayTop} pointerEvents="box-none">
          {locationMode === 'gps' && (
            <TouchableOpacity
              style={styles.recenterButton}
              onPress={() => mapRef.current?.centerOn(targetLocation)}
            >
              <Ionicons name="locate" size={22} color={COLORS.accent} />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.mapOverlaySpacer} pointerEvents="none" />
        <View style={styles.mapOverlayBottom} pointerEvents="box-none">
          {selectedStop && (
            <TouchableOpacity
              style={styles.selectedStopButton}
              onPress={() => selectBusStop(selectedStop)}
            >
              <Text style={styles.buttonText}>View Bus Stop {selectedStopCode}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}