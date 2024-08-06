type PropsTypes = {
  latitude: number;
  longitude: number;
};

export function convertToDirectional({ latitude, longitude }: PropsTypes) {
  // Determina a direção da latitude
  const latDirection = latitude >= 0 ? 'N' : 'S';
  // Determina a direção da longitude
  const lonDirection = longitude >= 0 ? 'E' : 'W';

  // Converte a latitude e longitude para valores absolutos
  const absLat = Math.abs(latitude).toFixed(7);
  const absLon = Math.abs(longitude).toFixed(7);

  // Retorna a string formatada
  return `${absLat}°${latDirection}, ${absLon}°${lonDirection}`;
}
