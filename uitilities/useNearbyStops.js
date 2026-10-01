import { useState } from 'react';
import * as Location from 'expo-location';

import calculateDistance from './calculateDistance';

export default function useNearbyStops() {
  const [nearbyStops, setNearbyStops] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  // find nearest bus stops using GPS or manual coordinates
  const findNearbyStops = async (stops, manualCoord = null) => {
    try {
      let latitude;
      let longitude;

      // manual coordinates selected
      if (manualCoord) {
        latitude = manualCoord.latitude;
        longitude = manualCoord.longitude;
      } 
      // use gps location
      else {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          return;
        }

        const location = await Location.getCurrentPositionAsync({});

        latitude = location.coords.latitude;
        longitude = location.coords.longitude;
      }

      setUserLocation({
        latitude,
        longitude,
      });

      // calculate and sort bus stops by distance
      const nearby = stops
        .map((stop) => ({
          ...stop,
          distance: calculateDistance(
            latitude,
            longitude,
            stop.Latitude,
            stop.Longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 10);

      setNearbyStops(nearby);
    } catch (error) {
      console.log('Error finding nearby stops:', error);
    }
  };

  const clearNearbyStops = () => {
    setNearbyStops([]);
  };

  return {
    nearbyStops,
    userLocation,
    findNearbyStops,
    clearNearbyStops,
  };
}