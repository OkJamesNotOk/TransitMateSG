import { useState, useEffect } from 'react';

import {
  BUS_STOPS_KEY,
  BUS_ROUTES_KEY,
  saveCache,
  getCache,
  clearBusDataCache,
} from '../services/Storage';

import { 
  getBusStops, 
  getBusRoutes
} from '../services/busService';

export default function useBusData() {
  const [busStops, setBusStops] = useState([]);
  const [busRoutes, setBusRoutes] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // load bus stops from cache or api
  const loadBusStops = async () => {
    try {
      const cachedStops = await getCache(BUS_STOPS_KEY);

      if (cachedStops) {
        setBusStops(cachedStops);

        return;
      }

      const stops = await getBusStops();

      await saveCache(BUS_STOPS_KEY, stops);
      
      setBusStops(stops);
    } catch (error) {
      console.log(error);
    }
  };

  // load bus routes from cache or api
  const loadBusRoutes = async () => {
    try {
      const cachedRoutes = await getCache(BUS_ROUTES_KEY);

      if (cachedRoutes) {
        setBusRoutes(cachedRoutes);

        return;
      }

      const routes = await getBusRoutes();
      await saveCache(BUS_ROUTES_KEY, routes);
      setBusRoutes(routes);
    } catch (error) {
      console.log(error);
    }
  }; 

  // download and replace cached bus data
  const updateBusData = async () => {
    try {
      setIsUpdating(true);

      // wait for both to finsh before saving
      const [stops, routes] = await Promise.all([
        getBusStops(),
        getBusRoutes(),
      ]);

      await saveCache(BUS_STOPS_KEY, stops);
      await saveCache(BUS_ROUTES_KEY, routes);

      setBusStops(stops);
      setBusRoutes(routes);
    } catch (error) {
      console.log('Failed to update bus data:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // remove downloaded bus data from storage
  const removeBusData = async () => {
    try {
      await clearBusDataCache();

      setBusStops([]);
      setBusRoutes([]);

    } catch (error) {
      console.log('Failed to remove bus data:', error);
    }
  };

  // load data when app starts
  useEffect(() => {
    const getData = async () => {
      await Promise.all([
        loadBusStops(),
        loadBusRoutes(),
      ]);

      setDataReady(true);
    };

    getData();
  }, []);

  return {
    busStops,
    busRoutes,
    dataReady,
    updateBusData,
    removeBusData,
    isUpdating,
  };
}