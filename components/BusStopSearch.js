import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import styles from '../css/BusScreenStyles';
import COLORS from '../css/colors';

// search bar component for seacrching bus stop 
export default function BusStopSearch({
  searchCode,
  setSearchCode,
  busStops,
  selectBusStop,
  showDropdown,
  setShowDropdown,
}) {
  // filter bus stops by code, name or road
  const filterBusStops = () => {
    const search = searchCode.toLowerCase();

    return busStops.filter((stop) =>
      stop.BusStopCode.toLowerCase().includes(search) ||
      stop.Description.toLowerCase().includes(search) ||
      stop.RoadName.toLowerCase().includes(search)
    );
  };

  // select a bus stop and close dropdown
  const selectStop = (stop) => {
    setShowDropdown(false);
    Keyboard.dismiss();

    selectBusStop(stop);
  };

  return (
    <View style={styles.searchContainer}>

      {/* bus stop search input */}
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search bus stop"
          placeholderTextColor={COLORS.secondaryText}
          value={searchCode}
          onChangeText={(text) => {
            setSearchCode(text);
            setShowDropdown(true);
          }}
          onFocus={() => {
            setShowDropdown(true);
          }}
        />

        <TouchableOpacity
          style={styles.clearButton}
          onPress={() => {
            setSearchCode('');
          }}
        >
          <Text style={styles.clearText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Show matching bus stops while searching */}
      {showDropdown && (
        <View style={styles.dropdown}>

          {/* Search hint and dismiss option */}
          <TouchableOpacity
            style={styles.dismissRow}
            activeOpacity={0.8}
            onPress={() => {
              setShowDropdown(false);
              Keyboard.dismiss();
            }}
          >
            <Text style={styles.searchHint}>
              Search by code, road or bus stop name
            </Text>

            <Text style={styles.dismissText}>
              Dismiss
            </Text>
          </TouchableOpacity>

          {/* list of matching bus stops */}
          <FlatList
            data={filterBusStops()}
            keyExtractor={(item) => item.BusStopCode}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={true}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => selectStop(item)}
              >
                <Text style={styles.stopCode}>
                  {item.BusStopCode}
                </Text>

                <Text style={styles.itemText}>
                  {item.Description}
                </Text>

                <Text style={styles.roadName}>
                  {item.RoadName}
                </Text>
              </TouchableOpacity>
            )}
          />

        </View>
      )}

    </View>
  );
}