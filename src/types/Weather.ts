export type WeatherAppState = {
  cities: WeatherType[];
  forecast: [],
  status: 'idle' | 'loading' | 'error';
  globalError?: string;
  uiError?: string;
};

export type WeatherType = {
  id: number;
  name: string;
  temp: number;
  condition: string;
  icon: string;
  lastUpdated: string;
  lat: number;
  lon: number;
  windSpeed: number;
  feels_like: number;
};