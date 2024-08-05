'use client';

import { useState, useEffect } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
}

const useGeoLocation = () => {
  const [location, setLocation] = useState<Location>({ latitude: null, longitude: null });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
      const successCallback = (position: GeolocationPosition) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setLoading(false);
        setError(null);
      };

      const errorCallback = (error: GeolocationPositionError) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('O usuário negou a solicitação para obter a geolocalização.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Informações de localização estão indisponíveis.');
            break;
          case error.TIMEOUT:
            setError('A solicitação para obter a localização do usuário expirou.');
            break;
          case 3: // UNKNOWN_ERROR
            setError('Ocorreu um erro desconhecido.');
            break;
          default:
            setError('Ocorreu um erro ao tentar obter a localização.');
        }
      };

      navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    } else {
      setLoading(false);
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return { location, error, loading };
};

export default useGeoLocation;
