import * as Notifications from 'expo-notifications';

// ask for permission and schedule notification
const scheduleBusNotification = async ( serviceNo, estimatedArrival ) => {
  // return if no valid arrival time
  if (!estimatedArrival) {
    return false;
  }

  // request permission to send notifications
  const permission = await Notifications.requestPermissionsAsync();

  if (permission.status !== 'granted') {
    return false;
  }

  // calculate how many seconds until the bus is 1 minute away
  const arrivalTime = new Date(estimatedArrival);
  const secondsUntilNotification = Math.max( 
      1, Math.floor((arrivalTime -  new Date()) / 1000) - 60
    );

  // schedule notification
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Bus ${serviceNo} arriving soon`,
      body: `Bus ${serviceNo} is about 1 minute away.`,
    },

    // trigger notification after the calculated time
    trigger: {
      type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: secondsUntilNotification,
    },
  });

  return true;
};

export {
  scheduleBusNotification,
};