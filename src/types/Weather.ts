export type WeatherAppState = {
  cities: WeatherType[];
  forecast: [];
  status: "idle" | "loading" | "error";
  globalError?: string;
  uiError?: string;
};

export type WeatherType = {
  id: number;
  name: string;
  country: string;
  temp: number;
  feels_like: number;
  condition: string;
  icon: string;
  description: string;
  lastUpdated: string;
  lat: number;
  lon: number;
  windSpeed: number;
  humidity?: number;
};

export type ForecastItem = {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: { main: string; icon: string }[];
  wind: { speed: number };
};
