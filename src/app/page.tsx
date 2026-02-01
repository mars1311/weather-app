"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useApp";
import { removeCity, updateCity } from "@/store/weatherSlice";
import { useLazyFetchWeatherByCityQuery } from "@/api/weatherApi";
import WeatherSearch from "@/components/WeatherSearch/WeatherSearch";
import WeatherList from "@/components/WeatherList/WeatherList";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cities = useAppSelector((state) => state.weather.cities);
  const [fetchWeather] = useLazyFetchWeatherByCityQuery();

  const handleUpdate = async (cityName: string) => {
    try {
      const data = await fetchWeather(cityName).unwrap();
      dispatch(updateCity({ data }));
    } catch (err) {
      console.error(`Failed to refresh ${cityName}:`, err);
    }
  };

  useEffect(() => {
    cities.forEach((city) => handleUpdate(city.name));
  }, []);

  const handleDelete = (id: number) => {
    dispatch(removeCity(id));
  };

  const handleRefresh = (id: number) => {
    const city = cities.find((c) => c.id === id);
    if (city) {
      handleUpdate(city.name);
    }
  };

  return (
    <>
      <WeatherSearch />
      <WeatherList
        cities={cities}
        onRefresh={handleRefresh}
        onDelete={handleDelete}
      />
    </>
  );
};

export default HomePage;
