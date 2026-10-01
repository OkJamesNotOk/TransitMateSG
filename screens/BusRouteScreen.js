import { View, Text, FlatList, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from '../css/BusRouteScreenStyles';
import useBookmarks from '../uitilities/useBookmarks';

export default function BusRouteScreen({ route }) {
  // get selected bus route information
  const {
    serviceNo,
    direction,
    routeStops,
    currBusStop
  } = route.params;

  // get the first and last stops of the route
  const origin = routeStops[0];
  const destination = routeStops[routeStops.length - 1];

  // load bookmarks to identify bookmarked stops along the route
  const { bookmarkedStops } = useBookmarks();

  return (
    <View style={styles.container}>

      {/* selected bus and route direction */}
      <Text style={styles.busNumber}>
        Bus {serviceNo}
      </Text>

      <Text style={styles.direction}>
        {origin?.Description} → {destination?.Description}
      </Text>
      
      {/* list of bus stops along the route */}
      <FlatList
        data={routeStops}
        keyExtractor={(item) =>
          `${item.BusStopCode} - ${item.StopSequence}`
        }
      
        renderItem={({ item }) => {
          // check if this stop is
          const isBookmarked = bookmarkedStops.some(
            (stop) => stop.BusStopCode === item.BusStopCode
          );

          // highlight the currently selected bus stop
          return (
            <View
              style={[
                styles.stopCard,
                item.BusStopCode === currBusStop && styles.currentStopCard,
              ]}
            >
              <View style={styles.stopInfo}>
                <Text style={styles.stopName}>
                  {item.StopSequence} - {item.Description}
                </Text>

                <Text style={styles.stopDetails}>
                  {item.BusStopCode} - {item.RoadName}
                </Text>
              </View>

              {/* show star for bookmarked stops */}
              {isBookmarked && (
                <Ionicons
                  name="star"
                  size={20}
                  color="white"
                />
              )}
            </View>
          );
        }}
      />

    </View>
  );
}
