import mapStyles from './mapStyles';
import createMapScript from './mapScript';

const createMapHTML = (latitude, longitude, zoom) => `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">
  <style>${mapStyles}</style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>${createMapScript(latitude, longitude, zoom)}</script>
</body>
</html>
`;

export default createMapHTML;