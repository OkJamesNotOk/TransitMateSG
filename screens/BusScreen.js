import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
  ScrollView
} from 'react-native';

import { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import BusCard from '../components/BusCard';
import NearbyStopCard from '../components/NearbyStopCard';
import BusMap from '../components/BusMap'
import BusStopSearch from '../components/BusStopSearch';

import useBookmarks from '../uitilities/useBookmarks';
import useNearbyStops from '../uitilities/useNearbyStops';
import useResponsiveSpacing from '../uitilities/useResponsiveSpacing';
import { scheduleBusNotification, } from '../uitilities/notificationFunctions';

import { 
  getBusArrivals,
} from '../services/busService';

import styles from '../css/BusScreenStyles';
import COLORS from '../css/colors'

export default function BusScreen({
    navigation, route, busData, selectedCoordinates, locationMode,
  }) {

  // store bus arrivals for the selected bus stop
  const [busList, setBusList] = useState([]);

  // store bus stop search and selection
  const [searchCode, setSearchCode] = useState('');
  const [busStopCode, setBusStopCode] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // switch between nearby map and bus arrival list
  const [activeView, setActiveView] = useState('map');

  // load bookmarks, nearby stops and stored bus data
  const {bookmarkedStops, toggleBookmark, } = useBookmarks();
  const {nearbyStops, userLocation, findNearbyStops, clearNearbyStops, } = useNearbyStops();
  const {busStops, busRoutes, dataReady, } = busData;
  
  const [notificationBanner, setNotificationBanner] = useState('');

  // load bus services and live arrival timings for a bus stop
  const loadBusArrivals = async (code = busStopCode) => {
    try {
      const arrivals = await getBusArrivals(code);

      // Find all bus services that pass through this bus stop
      const routesAtStop = busRoutes.filter(
        (route) => route.BusStopCode === code
      );

      // Get each bus service once
      const serviceNumbers = [
        ...new Set(
          routesAtStop.map((route) => route.ServiceNo)
        )
      ];

      // combine route data with arrival data
      const buses = serviceNumbers.map((serviceNo) => {
        const liveBus = arrivals.find(
          (bus) => bus.ServiceNo === serviceNo
        );

        if (liveBus) {
          return liveBus;
        }

        const route = routesAtStop.find(
          (route) => route.ServiceNo === serviceNo
        );

        return {
          ServiceNo: serviceNo,
          Operator: route?.Operator,
          NextBus: null,
          NextBus2: null,
          NextBus3: null,
        };
      });

      setBusList(buses);

      setBusStopCode(code);

    } catch (error) {
      console.log(error);
    }
  };

  // select a bus stop and display its bus arrivals
  const selectBusStop = async (stop) => {
    setSearchCode(stop.BusStopCode);
    setShowDropdown(false);
    Keyboard.dismiss();

    await loadBusArrivals(stop.BusStopCode);

    setActiveView('list');
  };

  // update nearby bus stops when bus data or location changes
  useEffect(() => {
    if (busStops.length === 0) {
      clearNearbyStops();
      return;
    }

    if (locationMode === 'manual') {
      if (selectedCoordinates) {
        findNearbyStops(busStops, selectedCoordinates);
      }
      else{
        clearNearbyStops();
      }

      return;
    }

    findNearbyStops(busStops);
  }, [busStops, selectedCoordinates, locationMode]);

  // reload bus arrivals when bus route data changes
  useEffect(() => {
    if (busStopCode && busRoutes.length > 0) {
      loadBusArrivals(busStopCode);
    }
  }, [busRoutes]);

  // open a bus stop selected from the bookmark screen
  useEffect(() => {
    const selectedCode = route.params?.selectedBookmarkCode;

    if (!selectedCode || !dataReady) {
      return;
    }

    setSearchCode(selectedCode);
    loadBusArrivals(selectedCode);
    setActiveView('list');

    navigation.setParams({
      selectedBookmarkCode: undefined,
    });
  }, [route.params?.selectedBookmarkCode, dataReady]);

  // get details for the currently selected bus stop
  const currentStop = busStops.find(
    (stop) => stop.BusStopCode === busStopCode
  );

  // add or remove the current bus stop from bookmarks
  const toggleCurrentStopBookmark = async () => {
    if (!currentStop) {
      return;
    }

    await toggleBookmark(currentStop);
  };

  // refresh nearby stops or bus arrivals based on the current view
  const refreshData = async () => {
    if (activeView === 'map') {
      if (busStops.length > 0) {
        if (locationMode === 'manual' && selectedCoordinates) {
          await findNearbyStops(busStops, selectedCoordinates);
        } else if (locationMode === 'gps') {
          await findNearbyStops(busStops);
        }
      }
    }

    if (activeView === 'list' && busStopCode) {
      await loadBusArrivals(busStopCode);
    }
  };

  // switch between the nearby map and bus arrival list
  const switchView = () => {
    if (activeView === 'map' && !busStopCode) {
      return;
    }

    setActiveView((currentView) =>
      currentView === 'map' ? 'list' : 'map'
    );
  };

  // open and prepare the full route for the selected bus
  const openBusRoute = (bus) => {
    // Find this bus at the currently selected stop
    const currentRoute = busRoutes.find(
      (route) =>
        route.ServiceNo === bus.ServiceNo &&
        route.BusStopCode === busStopCode
    );

    if (!currentRoute) {
      return;
    }

    // get all stops for the same bus service and direction
    const routeStops = busRoutes
      .filter(
        (route) =>
          route.ServiceNo === bus.ServiceNo &&
          route.Direction === currentRoute.Direction
      )
      .sort((a, b) => a.StopSequence - b.StopSequence);

    // add bus stop names and road names to each route stop
    const routeStopsWithDetails = routeStops.map((route) => {
      const stop = busStops.find(
        (stop) => stop.BusStopCode === route.BusStopCode
      );

      return {
        ...route,
        Description: stop?.Description,
        RoadName: stop?.RoadName,
      };
    });

    // pass route data to route screen
    navigation.navigate('BusRoute', {
      serviceNo: bus.ServiceNo,
      direction: currentRoute.Direction,
      routeStops: routeStopsWithDetails,
      currBusStop: busStopCode,
    });
  };

  // adjust screen padding based on device size
  const {screenPaddingWidth, screenPaddingHeight, } = useResponsiveSpacing(); 

  // create a new notification
  const createBusNotification = async (bus, estimatedArrival) => {
    const success = await scheduleBusNotification(bus.ServiceNo, estimatedArrival);

    if (!success) {
      return;
    }

    // create a success message when successfully created a notification
    setNotificationBanner(`Notification set for Bus ${bus.ServiceNo}`);
    // clear banner in 2s
    setTimeout(() => {
      setNotificationBanner('');
    }, 2000);
  };

  // UI
  return (
    <View
      style={[
        styles.container,
        { 
          paddingHorizontal: screenPaddingWidth,
          paddingVertical: screenPaddingHeight,
        }
      ]}
    >
      {notificationBanner !== '' && (
        <View style={styles.notificationBanner}>
          <Text style={styles.notificationBannerText}>
            {notificationBanner}
          </Text>
        </View>
      )}

      {/** Search box component */}
      <BusStopSearch
        searchCode={searchCode}
        setSearchCode={setSearchCode}
        busStops={busStops}
        selectBusStop={selectBusStop}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />

      {/** Nearby Bus stops */}
      <Text 
        style={styles.nearbyTitle}
        numberOfLines={1}
        adjustsFontSizeToFit
        minimumFontScale={0.75}
      >
        Nearby Bus Stops - Swipe to see more →
      </Text>

      {/** horizontal list of nearby Bus stops */}
      <FlatList
        style={styles.nearbyList}
        data={nearbyStops}
        renderItem={({ item, index }) => (
          <NearbyStopCard
            item={item}
            index={index}
            selectBusStop={selectBusStop}
            toggleBookmark={toggleBookmark}
            isBookmarked={bookmarkedStops.some(
              (stop) => stop.BusStopCode === item.BusStopCode
            )}
          />
        )}
        keyExtractor={(item) => item.BusStopCode}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <View style={styles.mainContent}>
        {/** Title row */}
        <View style={styles.headingRow}>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
          <Text 
            style={styles.heading}
            numberOfLines={1}
          >
            {activeView === 'map'
              ? 'Nearby Map'
              : `Bus Stop ${busStopCode} - ${currentStop?.Description ?? ''}`}
          </Text>

          </ScrollView>

          {activeView === 'list' && (
            <TouchableOpacity 
              style={[
                styles.bookmarkButton,
                !bookmarkedStops.some(
                  (stop) => stop.BusStopCode === busStopCode
                ) && styles.bookmarkButtonInactive,
              ]}
              onPress={toggleCurrentStopBookmark}
              >
              <Ionicons
                name={
                  bookmarkedStops.some(
                    (stop) => stop.BusStopCode === busStopCode
                  ) ? 'star' : 'star-outline'
                }
                size={20}
                color={
                  bookmarkedStops.some(
                    (stop) => stop.BusStopCode === busStopCode
                  ) ? 'white' : COLORS.secondaryText
                }
              />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Switch between map and bus arrivals */}
        {activeView === 'map' 
        ? 
        (
          <BusMap
            userLocation={userLocation}
            nearbyStops={nearbyStops}
            selectBusStop={selectBusStop}
            locationMode={locationMode}
            style={styles.map}
            selectedCoordinates={selectedCoordinates}
          />
        ) 

        :
        (
          <FlatList
            data={busList}
            renderItem={({ item, index }) => (
              <BusCard
                bus={item}
                index={index}
                onPress={() => openBusRoute(item)}
                onEtaPress={createBusNotification}
              />
            )}
            keyExtractor={(item) => item.ServiceNo}
          />
        )}

      </View>

      {/** Refresh, bookmark and view switch between map and bus list*/}
      <View style={styles.buttonRow}>

        <TouchableOpacity
          style={styles.buttonInRow}
          onPress={refreshData}
        >
          <Ionicons
            name='refresh-outline'
            size={20}
            color={COLORS.text}
          />
          <Text style={styles.buttonText}>
            Refresh
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonInRow}
          onPress={() => navigation.navigate('BusBookmarks')}
        >
          <Ionicons
            name='star'
            size={20}
            color={COLORS.text}
          />
          <Text 
            style={styles.buttonText}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            Bookmarks
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonInRow}
          onPress={switchView}
        >
          <Ionicons
            name='sync-outline'
            size={20}
            color={COLORS.text}
          />
          <Text 
            style={styles.buttonText}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.75}
          >
            {activeView === 'map' ? 'Bus List' : 'Map View'}
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}