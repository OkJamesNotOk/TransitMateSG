const mapStyles = `
html, body, #map {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

html, body {
  overflow: hidden;
  overscroll-behavior: none;
}

#map {
  touch-action: none;
}

.leaflet-container {
  background: #E5E5E5;
}

.bus-stop-marker {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  color: #277DA1;
}
.bus-stop-marker-selected {
  color: #D47B25;
}
.bus-stop-pin {
  display: block;
  width: 32px;
  height: 42px;
  pointer-events: none;
  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35));
}

`;

export default mapStyles;