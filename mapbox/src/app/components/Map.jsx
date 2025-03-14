// src/app/components/Map.js
'use client';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// use the public token
const MAPBOX_TOKEN = "pk.eyJ1IjoibWluZ2NhbiIsImEiOiJjbTJtMTBycHEwaHB2Mmlwd21udHhnN2wxIn0.oeKsHIH-fmTg7Sd5BCusig";

export default function Map() {
  const mapContainer = useRef(null); // Store a DOM reference to the map container
  const mapRef = useRef(null); // Store a reference to the map instance, avoid re-rendering
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mapboxgl.supported()) {
      setError('Your browser does not support Mapbox GL');
      return;
    }

    try {
      console.log('Initializing map...');
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      const map = new mapboxgl.Map({
        container: mapContainer.current, 
        style: "mapbox://styles/mapbox/streets-v11", 
        center: [-106.8175, 39.1911], // the center of the map
        zoom: 7,
      });

      mapRef.current = map;

      map.on('load', () => {
        console.log('Map loaded, adding custom layer...');
        try {
          map.addSource('custom-layer', {
            type: 'raster',
            tiles: ["http://localhost:8000/tiles/{z}/{x}/{y}"],
            tileSize: 256,
          });

          map.addLayer({
            id: 'custom-layer',
            type: 'raster',
            source: 'custom-layer',
            paint: {
              'raster-opacity': 0.5,
            },
          });
          console.log('Custom layer added successfully');
        } catch (e) {
          console.error('Error adding custom layer:', e);
          setError('Error adding snow depth layer');
        }
      });

      map.on('error', (e) => {
        console.error('Mapbox error:', e);
        setError('Map error: ' + e.error.message);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setError('Error initializing map');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-red-50 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
}