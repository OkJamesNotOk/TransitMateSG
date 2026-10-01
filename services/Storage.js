import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys, to identify data stored in asynccstorage
const BUS_STOPS_KEY = 'busStops';
const BUS_ROUTES_KEY = 'busRoutes';
const BOOKMARKED_STOPS_KEY = 'bookmarkedStops';

// Save appl data so it can be reused between sessions
const saveCache = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));

    return true;
  } catch (error) {
    console.log(
      `Failed to save ${key} to cache:`,
      error
    );

    return false;
  }
};

// get cached data from async storage
const getCache = async (key) => {
  const stored = await AsyncStorage.getItem(key);

  // return null if no cached data for key
  if (!stored) {
    return null;
  }

  return JSON.parse(stored);
};

// delete downloaded bus data while keeping bookmarks
const clearBusDataCache = async () => {
  await AsyncStorage.multiRemove([
    BUS_STOPS_KEY,
    BUS_ROUTES_KEY,
  ]);
};

export {
  BUS_STOPS_KEY,
  BUS_ROUTES_KEY,
  BOOKMARKED_STOPS_KEY,
  saveCache,
  getCache,
  clearBusDataCache,
};