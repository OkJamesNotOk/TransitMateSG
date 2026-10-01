import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';

import styles from '../css/BusScreenStyles'

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

  // wait until a location is available before displaying the map
  if (!userLocation) {
    return (
      <View>
        <Text>Loading map...</Text>
      </View>
    );
  }

  // get bus data for the selected marker
  const selectedStop = nearbyStops.find(
    (stop) => stop.BusStopCode === selectedStopCode
  );

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={style}
        showsUserLocation={locationMode === 'gps'}
        showsMyLocationButton={locationMode === 'gps'}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
      >

        {/* Nearby bus stops markers*/}
        {nearbyStops.map((stop) => (
          <Marker
            key={stop.BusStopCode}
            coordinate={{
              latitude: stop.Latitude,
              longitude: stop.Longitude,
            }}
            title={stop.Description}
            description={`${stop.BusStopCode} - ${stop.RoadName}`}
            onPress={() => setSelectedStopCode(stop.BusStopCode)}
            anchor={{x: 1, y: 1}}
          >
          </Marker>
        ))}

        {/* custom pin styling to show location in manual mode */}
        {locationMode === 'manual' && selectedCoordinates && (
          <Marker
            coordinate={{
              latitude: selectedCoordinates.latitude,
              longitude: selectedCoordinates.longitude,
            }}
            title="Selected Location"
            description="Manual location"
            zIndex={999}
          >
            <View style={styles.manualLocationMarker}>
              <View style={styles.manualLocationDot} />
            </View>
          </Marker>
        )}

      </MapView>

      {/* Open bus arrivals for the selected marker */}
      {selectedStop && (
        <TouchableOpacity
          style={styles.selectedStopButton}
          onPress={() => selectBusStop(selectedStop)}
        >
          <Text style={styles.buttonText}>
            View Bus Stop {selectedStopCode}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}