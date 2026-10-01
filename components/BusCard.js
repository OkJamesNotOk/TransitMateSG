import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from '../css/BusCardStyles';
import COLORS from '../css/colors';

export default function BusCard({ 
    bus, index, onPress, onEtaPress,
  }) {
  // calculate estimated time in mins
  const getMinutesAway = (estimatedArrival) => {
    if (!estimatedArrival) {
      return '-';
    }

    const arrivalTime = new Date(estimatedArrival);
    const currentTime = new Date();

    // calculate the difference between arrival and current time
    const difference = arrivalTime - currentTime;
    const minutes = Math.ceil(difference / 60000);

    if (minutes <= 0) {
      return 'Arriving';
    }

    return `${minutes} min`;
  };

  // display bus
  const renderEta = (estimatedArrival) => {
    return (
      <TouchableOpacity
        style={styles.etaButton}
        disabled={!estimatedArrival}
        onPress={(event) => {
          event.stopPropagation();
          onEtaPress(bus, estimatedArrival);
        }}
      >
        <Text 
          style={styles.etaText}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.75}
        >
          {getMinutesAway(estimatedArrival)}
        </Text>

        <Ionicons
          name="notifications-outline"
          size={16}
          color={ estimatedArrival ? COLORS.accent : COLORS.secondaryText }
        />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        index % 2 === 0 ? styles.cardEven : styles.cardOdd
      ]}
      onPress={onPress}
    >

      {/* Bus Information */}
      <Text style={styles.busNumber}>
        Bus {bus.ServiceNo}
      </Text>

      <Text style={styles.operatorText}>
        Operator: {bus.Operator}
      </Text>

      {/* ETA for each bus */}
      <View style={styles.etaRow}>
        <Text style={styles.etaLabel}>ETA:</Text>
        {renderEta(bus.NextBus?.EstimatedArrival)}
        {renderEta(bus.NextBus2?.EstimatedArrival)}
        {renderEta(bus.NextBus3?.EstimatedArrival)}
      </View>

    </TouchableOpacity>
  );
}
