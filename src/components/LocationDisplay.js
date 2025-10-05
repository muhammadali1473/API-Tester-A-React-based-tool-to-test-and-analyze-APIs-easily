import React, { useState, useEffect } from 'react';
import './LocationDisplay.css';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.log('Geolocation error:', error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  const getLocationName = () => {
    if (!location) return 'Unknown Location';
    
    // Simple location detection based on coordinates
    const { lat, lng } = location;
    
    // Pakistan coordinates (approximate)
    if (lat >= 23 && lat <= 37 && lng >= 60 && lng <= 77) {
      return '🇵🇰 Pakistan';
    }
    // Add more regions as needed
    return `📍 ${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="location-display">
        <div className="location-loading">
          <span>🌍 Detecting location...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="location-display">
      <div className="location-info">
        <span className="location-icon">🌍</span>
        <span className="location-text">{getLocationName()}</span>
      </div>
      <div className="location-note">
        <small>Testing from your current location</small>
      </div>
    </div>
  );
};

export default LocationDisplay;
