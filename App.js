import { Modal, View, Text, ActivityIndicator, } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useState, useEffect, useMemo } from 'react';
import * as Notifications from 'expo-notifications';

import BusScreen from './screens/BusScreen';
import WeatherScreen from './screens/WeatherScreen';
import BusRouteScreen from './screens/BusRouteScreen';
import BusBookmarkScreen from './screens/BusBookmarkScreen';
import SettingsScreen from './screens/SettingScreen';
import useBusData from './uitilities/useBusData';

import { useTheme } from './context/ThemeContext';
import createStyles from './css/AppStyles';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './context/ThemeContext';

// Bottom tab navigation for the main bus, weather and settings screens
const Tab = createBottomTabNavigator();

// Stack navigation for screens in the Bus screen
const BusStack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Handles navigation between the main Bus screen, bus routes and bookmarks
function BusStackNavigator({ busData, selectedCoordinates, locationMode, }) {
  const { colors: COLORS } = useTheme();

  return (
    <BusStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      {/* Main screen for searching bus stops and viewing bus arrivals */}
      <BusStack.Screen
        name="BusHome"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <BusScreen
            {...props}
            busData={busData}
            selectedCoordinates={selectedCoordinates}
            locationMode={locationMode}
          />
        )}
      </BusStack.Screen>

      {/* Displays the full route for a selected bus */}
      <BusStack.Screen
        name="BusRoute"
        component={BusRouteScreen}
        options={{
          title: 'Bus Route',
        }}
      />

      {/* Displays bookmarked bus stops */}
      <BusStack.Screen
        name="BusBookmarks"
        component={BusBookmarkScreen}
        options={{
          title: 'Bookmarked Stops',
        }}
      />

    </BusStack.Navigator>
  );
}

// Main App
function AppContent() {
  const { theme, colors: COLORS } = useTheme();
  const styles = useMemo(() => createStyles(COLORS), [COLORS]);

  const navigationTheme = useMemo(() => {
    const baseTheme = theme === 'light' ? DefaultTheme : DarkTheme;

    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: COLORS.accent,
        background: COLORS.background,
        card: COLORS.background,
        text: COLORS.text,
        border: COLORS.border,
      },
    };
  }, [theme, COLORS]);

  // Loads bus stop and bus route data used throughout the app
  const busData = useBusData();
  // coordianted for manual location mmode
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  // controls whether nearby bus stops use GPS or manually entered coordinateds
  const [locationMode, setLocationMode] = useState('gps');

  // Lock the app in portrait mode
  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
  }, []);

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />

      {/* Main bottom navigation for the app */}
      <Tab.Navigator 
        initialRouteName="Bus"
        screenOptions={{
          headerStyle: {backgroundColor: COLORS.background,},
          headerTintColor: COLORS.text,
          tabBarStyle: {
            backgroundColor: COLORS.background,
            borderTopColor: COLORS.border,
          },
          tabBarActiveTintColor: COLORS.accent,
          tabBarInactiveTintColor: COLORS.secondaryText,
        }}
      >
        {/* BusStackNavigator in bus tab for route and bookmark screens */}
        <Tab.Screen
          name="Bus"
          options={{
            title: 'Bus Arrivals',
            tabBarLabel: 'Bus',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="bus-outline"
                size={size}
                color={color}
              />
            ),
          }}
        >
          {() => (
            <BusStackNavigator 
              busData={busData} 
              selectedCoordinates={selectedCoordinates}
              locationMode={locationMode}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Weather"
          options={{
            title: 'Weather',
            tabBarLabel: 'Weather',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="partly-sunny-outline"
                size={size}
                color={color}
              />
            ),
          }}
        >
          {() => (
            <WeatherScreen
              selectedCoordinates={selectedCoordinates}
              locationMode={locationMode}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Settings"
          options={{
            title: 'Settings',
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="settings-outline"
                size={size}
                color={color}
              />
            ),
          }}
        >
          {(props) => (
            <SettingsScreen
              {...props}
              updateBusData={busData.updateBusData}
              isUpdating={busData.isUpdating}
              setSelectedCoordinates={setSelectedCoordinates}
              removeBusData={busData.removeBusData}
              locationMode={locationMode}
              setLocationMode={setLocationMode}
            />
          )}
        </Tab.Screen>

      </Tab.Navigator>

      {/* Prevent interaction while bus data is being updated */}
      <Modal
        visible={busData.isUpdating}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ActivityIndicator size="large" color={COLORS.accent} />
            <Text style={styles.modalText}>
              Updating Bus Data...
            </Text>
          </View>
        </View>
      </Modal>
      
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}