
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import createMapHTML from './leaflet/mapHtml';
import { Linking } from 'react-native';

const DEFAULT_CENTER = { latitude: 1.290, longitude: 103.851 };

const LeafletMap = forwardRef(function LeafletMap({
  initialCenter = DEFAULT_CENTER,
  initialZoom = 16,
  markerCoordinate = null,
  busStops = [],
  enableMapSelection = true,
  selectedStopCode = null,
  locationCoordinate = null,
  locationMode = 'gps',
  onMapPress,
  onMarkerDragEnd,
  onStopPress,
  onReady,
  style,
}, ref) {
  const webViewRef = useRef(null);
  const [ready, setReady] = useState(false);

  const latitude = Number.isFinite(initialCenter?.latitude) ? initialCenter.latitude : DEFAULT_CENTER.latitude;
  const longitude = Number.isFinite(initialCenter?.longitude) ? initialCenter.longitude : DEFAULT_CENTER.longitude;
  const markerLatitude = markerCoordinate?.latitude;
  const markerLongitude = markerCoordinate?.longitude;

  const [source] = useState(() => ({
    html: createMapHTML(latitude, longitude, initialZoom),
  }));

  useImperativeHandle(ref, () => ({
    centerOn: (coordinate) => {
      if (!coordinate || !Number.isFinite(coordinate.latitude) || !Number.isFinite(coordinate.longitude)) return;
      webViewRef.current?.injectJavaScript(`window.centerOn?.(${JSON.stringify(coordinate)}); true;`);
    },
  }), []);

  useEffect(() => {
    if (!ready) return;
    const coordinate = Number.isFinite(markerLatitude) && Number.isFinite(markerLongitude)
      ? { latitude: markerLatitude, longitude: markerLongitude }
      : null;
    webViewRef.current?.injectJavaScript(`window.setMarker?.(${JSON.stringify(coordinate)}); true;`);
  }, [ready, markerLatitude, markerLongitude]);

  useEffect(() => {
    if (!ready) return;
    webViewRef.current?.injectJavaScript(
      `window.mapTapSelectionEnabled = ${enableMapSelection ? 'true' : 'false'}; true;`
    );
  }, [ready, enableMapSelection]);

  const busStopsJSON = JSON.stringify(busStops);
  const locationLatitude = locationCoordinate?.latitude;
  const locationLongitude = locationCoordinate?.longitude;

  useEffect(() => {
    if (!ready) return;
    webViewRef.current?.injectJavaScript(`window.setBusStops?.(${busStopsJSON}); true;`);
  }, [ready, busStopsJSON]);

  useEffect(() => {
    if (!ready) return;
    webViewRef.current?.injectJavaScript(`window.selectBusStop?.(${JSON.stringify(selectedStopCode)}); true;`);
  }, [ready, selectedStopCode]);

  useEffect(() => {
    if (!ready) return;
    const coordinate = Number.isFinite(locationLatitude) && Number.isFinite(locationLongitude)
      ? { latitude: locationLatitude, longitude: locationLongitude }
      : null;

    webViewRef.current?.injectJavaScript(
      `window.setLocationMarker?.(${JSON.stringify(coordinate)}, ${JSON.stringify(locationMode)}); true;`
    );
  }, [ready, locationLatitude, locationLongitude, locationMode]);

  const handleMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === 'ready') {
        setReady(true);
        onReady?.();
      } else if (message.type === 'mapPress') {
        onMapPress?.({ latitude: message.latitude, longitude: message.longitude });
      } else if (message.type === 'markerDragEnd') {
        onMarkerDragEnd?.({ latitude: message.latitude, longitude: message.longitude });
      } else if (message.type === 'stopPress') {
        onStopPress?.(message.code);
      } else if (message.type === 'error') {
        console.log('Leaflet error:', message.message);
      }else if (message.type === 'externalLink') {
        if (/^https:\/\/(www\.)?(openstreetmap\.org|leafletjs\.com)(\/|$)/i.test(message.url)) {
          Linking.openURL(message.url).catch((error) => {
            console.log('Unable to open map link:', error);
          });
        }
      }
    } catch (error) {
      console.log('Leaflet message error:', error);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={source}
      style={style}
      originWhitelist={['*']}
      javaScriptEnabled
      nestedScrollEnabled
      onLoadStart={() => setReady(false)}
      onMessage={handleMessage}
      onShouldStartLoadWithRequest={(request) => !/^https?:\/\//i.test(request.url)}
      onError={(event) => console.log('Leaflet WebView error:', event.nativeEvent.description)}
    />
  );
});

export default LeafletMap;
