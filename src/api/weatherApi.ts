import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { type WeatherType } from '@/types/Weather';
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;

export type ForecastItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: { main: string; icon: string }[];
  wind: { speed: number };
};

type OpenWeatherResponse = {
  id: number;
  name: string;
  main: { temp: number; feels_like: number };
  weather: { main: string; icon: string }[];
  coord: { lat: number; lon: number };
  wind: { speed: number };
};

type ForecastApiResponse = {
  list: ForecastItem[];
};

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchWeatherByCity: builder.query<WeatherType, string>({
      query: (city: string) => `weather?q=${city}&units=metric&appid=${API_KEY}`,
      transformResponse: (response: OpenWeatherResponse) => ({
        id: response.id,
        name: response.name,
        temp: Math.round(response.main.temp),
        condition: response.weather[0].main,
        icon: response.weather[0].icon,
        lastUpdated: new Date().toISOString(),
        lat: response.coord.lat,
        lon: response.coord.lon,
        windSpeed: response.wind.speed,
        feels_like: Math.round(response.main.feels_like),
      }),
    }),
    getForecast: builder.query<ForecastItem[], { lat: number; lon: number }>({
      query: ({ lat, lon }) => `forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      transformResponse: (response: ForecastApiResponse) => response.list,
    }),
  }),
});

export const { useFetchWeatherByCityQuery, useLazyFetchWeatherByCityQuery } = weatherApi;