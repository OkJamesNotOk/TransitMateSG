import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  BOOKMARKED_STOPS_KEY,
  saveCache,
  getCache,
} from '../services/Storage';


export default function useBookmarks() {
  const [bookmarkedStops, setBookmarkedStops] = useState([]);

  // load bookmarks from async storage
  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await getCache(BOOKMARKED_STOPS_KEY);

      if (storedBookmarks) {
        setBookmarkedStops(storedBookmarks);
      } else {
        setBookmarkedStops([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add or remove bus stop from bookmark
  const toggleBookmark = async (stop) => {
    const alreadyBookmarked = bookmarkedStops.some(
      (item) => item.BusStopCode === stop.BusStopCode
    );

    let updatedBookmarks;

    // if already in bookmark, remove item
    if (alreadyBookmarked) {
      updatedBookmarks = bookmarkedStops.filter(
        (item) => item.BusStopCode !== stop.BusStopCode
      );
    } 
    // add to bookmark
    else {
      updatedBookmarks = [...bookmarkedStops, stop];
    }

    setBookmarkedStops(updatedBookmarks);

    // save updated bookmark
    await saveCache(BOOKMARKED_STOPS_KEY, updatedBookmarks);
  };

  // reload when screen is focused
  useFocusEffect(
    useCallback(() => {
      loadBookmarks();
    }, [])
  );

  return {
    bookmarkedStops,
    toggleBookmark,
  };
}