import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import SidePanel from './components/sidepanel';
import './App.css';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGhleWxhbmkiLCJhIjoiY20xMXBwa3ltMHZjaDJub3J2d3YxbTFzYiJ9.RvlEftmq8kelS_D4APbuPA';

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null); // Store the clicked marker

  useEffect(() => {
    if (map.current) return; // Only initialize the map once

    // Initialize the Mapbox map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/theylani/cm14t9gl704cu01pq1or2fm9w', // Your style ID
      center: [144.97838372898102, -37.79959982175234], // Set initial center for the map
      zoom: 12, // Set initial zoom level
    });

    // Fetch the GeoJSON file
    fetch('/map.geojson') // Assuming the file is in public/map.geojson
      .then((response) => response.json())
      .then((geojsonData) => {
        // Loop through each feature in the GeoJSON file
        geojsonData.features.forEach((feature) => {
          const { coordinates } = feature.geometry;
          const { name, description, images, audio, text } = feature.properties;

          // Add a marker for each feature
          const marker = new mapboxgl.Marker({ draggable: false })
            .setLngLat(coordinates)
            .addTo(map.current);

          // Handle marker click for both the side panel and pop-up
          marker.getElement().addEventListener('click', () => {
            // Set side panel data
            setSelectedMarker({
              name,
              description,
              images,
              audio,
              text
            });
          });
        });
      })
      .catch((error) => {
        console.error('Error loading GeoJSON:', error);
      });
  }, []); // Dependency array ensures the effect only runs once

  return (
    <div>
      {/* Render the side panel if a marker is clicked */}
      {selectedMarker && (
        <SidePanel
          selectedMarker={selectedMarker}
          onClose={() => setSelectedMarker(null)} // Clear the marker when the side panel is closed
        />
      )}
      {/* Map container */}
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}

export default App;
