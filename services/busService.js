// API key to authenticate requests to the LTA DataMall API
const apiKey = process.env.EXPO_PUBLIC_LTA_API_KEY;

// get live bus arrival timings for the selected bus stop
async function getBusArrivals(busStopCode) {
  const response = await fetch(
    `https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=${busStopCode}`,
    {
      method: 'GET',
      headers: {
        AccountKey: apiKey,
        accept: 'application/json',
      },
    }
  );

  // Stop if unsuccessful
  if (!response.ok) {
    throw new Error('Unable to retrieve bus arrivals');
  }

  const data = await response.json();

  return data.Services || [];
}

// get all bus stops from api
async function getBusStops() {
  // Get data in batches  
  let allStops = [];
  let skip = 0;
  const amount = 500;
  let hasMore = true;

  while (hasMore) {
    // get next batch
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/BusStops?$skip=${skip}`,
      {
        headers: {
          AccountKey: apiKey,
          accept: 'application/json',
        },
      }
    );
    
    // Stop if unsuccessful
    if (!response.ok) {
      throw new Error('Unable to retrieve bus stops');
    }

    const data = await response.json();
    const stops = data.value || [];

    // Add current batch to the list
    allStops = [...allStops, ...stops];

    // finish when only a partial batch is returned
    if (stops.length < amount) {
      hasMore = false;
    }
    else {
      skip += amount;
    }
  }

  return allStops;
}

// get all bus routes from api
async function getBusRoutes() {
  // Get data in batches
  let allRoutes = [];
  let skip = 0;
  const amount = 500;
  let hasMore = true;

  while (hasMore) {
    // get next batch
    const response = await fetch(
      `https://datamall2.mytransport.sg/ltaodataservice/BusRoutes?$skip=${skip}`,
      {
        headers: {
          AccountKey: apiKey,
          accept: 'application/json',
        },
      }
    );

    // Stop if unsuccessful
    if (!response.ok) {
      throw new Error('Unable to retrieve bus routes');
    }

    const data = await response.json();
    const routes = data.value || [];

    // Add current batch to the list
    allRoutes = [...allRoutes, ...routes];

    // finish when only a partial batch is returned
    if (routes.length < amount) {
      hasMore = false;
    }
    else {
      skip += amount;
    }
  }

  return allRoutes;
}

export {
  getBusArrivals,
  getBusStops,
  getBusRoutes,
};