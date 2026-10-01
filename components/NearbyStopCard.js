import { View, TouchableOpacity, Text, } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from '../css/NearbyStopCardStyles';
import COLORS from '../css/colors';

export default function NearbyStopCard({
  item, index, selectBusStop,
  toggleBookmark, isBookmarked,
}) {
  return(
    <TouchableOpacity
      style={[
        styles.nearbyCard,    
        index % 2 === 0 ? styles.nearbyCardEven : styles.nearbyCardOdd,
      ]}
      onPress={() => selectBusStop(item)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.nearbyCode}>
          {item.BusStopCode}
        </Text>

        {/* Bookmark toggle button */}
        <TouchableOpacity
          style={[
            styles.bookmarkButton,
            !isBookmarked && styles.bookmarkButtonInactive,
          ]}
          onPress={(event) => {
            event.stopPropagation();
            toggleBookmark(item);
          }}
        >
          <Ionicons
            name={isBookmarked ? 'star' : 'star-outline'}
            size={20}
            color={isBookmarked ? 'white' : COLORS.secondaryText}
          />
        </TouchableOpacity>
      </View>

      <Text numberOfLines={1} style={styles.itemText}>
        {item.Description}
      </Text>

      <Text numberOfLines={1} style={styles.itemText}>
        {item.RoadName}
      </Text>

      {/* Distance from the current location */}
      <Text style={styles.nearbyDistance}>
        {Math.round(item.distance)}m away
      </Text>
    </TouchableOpacity>
  );
}