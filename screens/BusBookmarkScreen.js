import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from '../css/BusBookmarkStyles';
import COLORS from '../css/colors';

import useBookmarks from '../uitilities/useBookmarks';

export default function BusBookmarkScreen({ navigation }) {
  // load stored bookmarked bus stops
  const { bookmarkedStops, toggleBookmark, } = useBookmarks();

  // return to home screen with the selected bus stop
  const viewBookmarkedStop = (stop) => {
    navigation.popTo('BusHome', {
      selectedBookmarkCode: stop.BusStopCode,
    });
  };

  // display each bookmarked bus stops
  const renderBookmarkItem = ({ item }) => {
    return (
      <View style={styles.bookmarkRow}>

        {/* bookmarked bus stop information */}
        <View style={styles.stopInfo}>
          <Text style={styles.stopName}>
            {item.Description}
          </Text>

          <Text style={styles.stopCode}>
            Bus Stop {item.BusStopCode}
          </Text>

          <Text style={styles.roadName}>
            {item.RoadName}
          </Text>
        </View>

        {/* open selected bookmarked bus stop */}
        <TouchableOpacity 
          style={styles.buttonInRow}
          onPress={() => viewBookmarkedStop(item)}
          >
          <Text style={styles.buttonText}>
            View
          </Text>
        </TouchableOpacity>

        {/* remove bus stop from bookmarks */}
        <TouchableOpacity 
          style={styles.bookmarkButton}
          onPress={() => toggleBookmark(item)}
          >
          <Ionicons
            name={'star'}
            size={20}
            color={'white'}
          />
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <View style={styles.container}>
    
      {/* list of bookmarked bus stops */}
      <FlatList
        data={bookmarkedStops}
        keyExtractor={(item) => item.BusStopCode}
        ListEmptyComponent={
            <Text style={styles.emptyBookmark}>
              No bookmarked bus stops.
            </Text>
        }
        renderItem={renderBookmarkItem}
      />
    </View>
  );
}