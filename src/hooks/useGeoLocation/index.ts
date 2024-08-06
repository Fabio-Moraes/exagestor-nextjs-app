'use client';

import { useState, useEffect } from 'react';

type GeoLocation = {
  latitude: number | null;
  longitude: number | null;
};

const useGeoLocation = () => {
  const [location, setLocation] = useState<GeoLocation>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setError(null);
        setLoading(false);
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setError('Permission denied');
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setError('Position unavailable');
        } else if (error.code === error.TIMEOUT) {
          setError('Request timed out');
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      },
      { timeout: 10000 } // Timeout after 10 seconds
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  return { location, error, loading };
};

export default useGeoLocation;
