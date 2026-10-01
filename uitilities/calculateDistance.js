// calculate distance between two coordinates in metres
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // approximate earth radius in m
  const R = 6371000;

  // convert to radians for math functions
  const toRadians = (value) => value * Math.PI / 180;

  // latitude and longitude changes in radians.
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) ** 2;

  // convert to angle between 2 location
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // distance in m
  return R * c;
};

export default calculateDistance;