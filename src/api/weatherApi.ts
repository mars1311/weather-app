import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type WeatherType, type ForecastItem } from "@/types/Weather";
const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_WEATHER_BASE_URL;

type OpenWeatherResponse = {
  id: number;
  name: string;
  sys: { country: string };
  main: { temp: number; feels_like: number; humidity: number };
  weather: { main: string; description: string; icon: string }[];
  coord: { lat: number; lon: number };
  wind: { speed: number };
};

type ForecastApiResponse = {
  list: ForecastItem[];
};

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    fetchWeatherByCity: builder.query<WeatherType, string>({
      query: (city: string) =>
        `weather?q=${city}&units=metric&appid=${API_KEY}`,
      transformResponse: (response: OpenWeatherResponse) => ({
        id: response.id,
        name: response.name,
        country: response.sys.country,
        temp: Math.round(response.main.temp),
        feels_like: Math.round(response.main.feels_like),
        condition: response.weather[0].main,
        icon: response.weather[0].icon,
        description: response.weather[0].description,
        lastUpdated: new Date().toISOString(),
        lat: response.coord.lat,
        lon: response.coord.lon,
        windSpeed: response.wind.speed,
        humidity: response.main.humidity,
      }),
    }),
    getForecast: builder.query<ForecastItem[], { lat: number; lon: number }>({
      query: ({ lat, lon }) =>
        `forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
      transformResponse: (response: ForecastApiResponse) => response.list,
    }),
  }),
});

export const {
  useFetchWeatherByCityQuery,
  useLazyFetchWeatherByCityQuery,
  useGetForecastQuery,
  useLazyGetForecastQuery,
} = weatherApi;
