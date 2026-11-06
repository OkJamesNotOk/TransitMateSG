const createMapScript = (latitude, longitude, zoom) => `
(() => {
  const sendMessage = (type, data = {}) => {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, ...data }));
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('.leaflet-control-attribution a');
    if (!link) return;
    event.preventDefault();
    event.stopPropagation();
    sendMessage('externalLink', { url: link.href });
  }, true);

  try {
    const map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
    let marker = null;
    let markerDragging = false;
    window.mapTapSelectionEnabled = false;
    let selectedBusStopCode = null;
    let locationCircle = null;
    let busMarkerEntries = [];
    const busMarkers = L.layerGroup().addTo(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    window.setMarker = (coordinate) => {
      if (!coordinate) {
        if (marker) {
          map.removeLayer(marker);
          marker = null;
        }
        return;
      }

      const position = [coordinate.latitude, coordinate.longitude];

      if (marker) {
        marker.setLatLng(position);
        return;
      }

      marker = L.marker(position, {
        draggable: true,
        autoPan: true,
        bubblingMouseEvents: false
      }).addTo(map);

      marker.on('dragstart', () => { markerDragging = true; });
      marker.on('dragend', () => {
        const position = marker.getLatLng();
        sendMessage('markerDragEnd', {
          latitude: position.lat,
          longitude: position.lng
        });
        setTimeout(() => { markerDragging = false; }, 200);
      });
    };

    window.centerOn = (coordinate) => {
      if (!coordinate) return;
      map.setView([coordinate.latitude, coordinate.longitude], map.getZoom(), {
        animate: true
      });
    };

    window.setBusStops = (stops) => {
      const createBusStopIcon = (selected = false) => L.divIcon({
        className: selected ? 'bus-stop-marker bus-stop-marker-selected' : 'bus-stop-marker',
        html: '<svg class="bus-stop-pin" viewBox="0 0 32 42" aria-hidden="true">' +
          '<path d="M16 1C8.3 1 2 7.3 2 15c0 11 14 25 14 25s14-14 14-25C30 7.3 23.7 1 16 1Z" fill="currentColor" stroke="#FFFFFF" stroke-width="2"/>' +
          '<circle cx="16" cy="15" r="5.5" fill="#FFFFFF"/>' +
          '</svg>',
        iconSize: [48, 48],
        iconAnchor: [24, 44],
        popupAnchor: [0, -40],
      });
      busMarkers.clearLayers();
      busMarkerEntries = [];

      (Array.isArray(stops) ? stops : []).forEach((stop) => {
        const latitude = Number(stop.latitude);
        const longitude = Number(stop.longitude);
        const code = String(stop.code ?? '');
        if (!code || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return;

        const busMarker = L.marker([latitude, longitude], {
          icon: createBusStopIcon(),
          bubblingMouseEvents: false,
          riseOnHover: true
        }).addTo(busMarkers);

        const popup = document.createElement('div');
        const name = document.createElement('strong');
        const details = document.createElement('div');
        name.textContent = stop.description || code;
        details.textContent = code + (stop.roadName ? ' - ' + stop.roadName : '');
        popup.append(name, details);

        busMarker.bindPopup(popup);
        busMarker.on('click', () => sendMessage('stopPress', { code }));
        busMarkerEntries.push({ code, marker: busMarker });
      });

      window.selectBusStop(selectedBusStopCode);
    };

    window.selectBusStop = (code) => {
      selectedBusStopCode = code == null ? null : String(code);
      busMarkerEntries.forEach(({ code, marker }) => {
        const selected = code === selectedBusStopCode;
        marker.setIcon(createBusStopIcon(selected));
        marker.setZIndexOffset(selected ? 1000 : 0);
      });
    };

    window.setLocationMarker = (coordinate, mode) => {
      if (!coordinate || !Number.isFinite(coordinate.latitude) || !Number.isFinite(coordinate.longitude)) {
        if (locationCircle) {
          map.removeLayer(locationCircle);
          locationCircle = null;
        }
        return;
      }

      const position = [coordinate.latitude, coordinate.longitude];
      const color = mode === 'manual' ? '#9B59B6' : '#2380E0';

      if (locationCircle) {
        locationCircle.setLatLng(position);
        locationCircle.setStyle({ fillColor: color });
      } else {
        locationCircle = L.circleMarker(position, {
          radius: 9,
          color: '#FFFFFF',
          weight: 3,
          fillColor: color,
          fillOpacity: 1,
          interactive: false
        }).addTo(map);
      }
    };

    map.on('click', (event) => {
      if (!window.mapTapSelectionEnabled || markerDragging) return;
      const coordinate = {
        latitude: event.latlng.lat,
        longitude: event.latlng.lng
      };
      window.setMarker(coordinate);
      sendMessage('mapPress', coordinate);
    });

    window.addEventListener('resize', () => map.invalidateSize());

    map.whenReady(() => {
      map.invalidateSize();
      sendMessage('ready');
    });
  } catch (error) {
    sendMessage('error', { message: String(error) });
  }
})();
`;

export default createMapScript;