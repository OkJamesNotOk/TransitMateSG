import AsyncStorage from '@react-native-async-storage/async-storage';
import { File, Paths } from 'expo-file-system';

// Keys, to identify data stored in asynccstorage
const BUS_STOPS_KEY = 'busStops';
const BUS_ROUTES_KEY = 'busRoutes';
const BOOKMARKED_STOPS_KEY = 'bookmarkedStops';
const THEME_KEY = 'selectedTheme';
const AUTO_THEME_KEY = 'autoThemeOnStartup';

const isBusData = (key) => key === BUS_STOPS_KEY || key === BUS_ROUTES_KEY;
const getBusFile = (key) => new File(Paths.document, `${key}.json`);

// Save appl data so it can be reused between sessions
const saveCache = async (key, data) => {
  try {
    const json = JSON.stringify(data);
    if (isBusData(key)) {
      const file = getBusFile(key);
      if (!file.exists) file.create();
      await file.write(json);
    } else {
      await AsyncStorage.setItem(key, json);
    }

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
  if (isBusData(key)) {
    const file = getBusFile(key);
    if (file.exists) return JSON.parse(await file.text());
  }

  const stored = await AsyncStorage.getItem(key);

  // return null if no cached data for key
  if (!stored) {
    return null;
  }

  return JSON.parse(stored);
};

// delete downloaded bus data while keeping bookmarks
const clearBusDataCache = async () => {
  for (const key of [BUS_STOPS_KEY, BUS_ROUTES_KEY]) {
    const file = getBusFile(key);
    if (file.exists) file.delete();
  }

  await AsyncStorage.multiRemove([
    BUS_STOPS_KEY,
    BUS_ROUTES_KEY,
  ]);
};

export {
  BUS_STOPS_KEY,
  BUS_ROUTES_KEY,
  BOOKMARKED_STOPS_KEY,
  THEME_KEY,
  AUTO_THEME_KEY,
  saveCache,
  getCache,
  clearBusDataCache,
};