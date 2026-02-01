"use client";

import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useApp";
import { useLazyFetchWeatherByCityQuery } from "@/api/weatherApi";
import { addCity, setHighlightedCity } from "@/store/weatherSlice";
import { validateInput } from "@/utils/validateInput";
import { WEATHER_ERROR } from "@/constants/WeatherError";
import styles from "./WeatherSearch.module.scss";

const WeatherSearch: React.FC = () => {
  const dispatch = useAppDispatch();

  const cities = useAppSelector((state) => state.weather.cities);

  const [cityValue, setCityValue] = useState<string>("");
  const [localError, setLocalError] = useState<string | null>(null);

  const [fetchWeather, { isLoading }] = useLazyFetchWeatherByCityQuery();
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const highlightCity = (id: number) => {
    if (highlightTimeoutRef.current) clearTimeout(highlightTimeoutRef.current);

    dispatch(setHighlightedCity(id));

    highlightTimeoutRef.current = setTimeout(() => {
      dispatch(setHighlightedCity(null));
      highlightTimeoutRef.current = null;
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateInput(cityValue);
    if (validationError) {
      setLocalError(validationError);
      return;
    }

    const existingCity = cities.find(
      (c) => c.name.toLowerCase() === cityValue.toLowerCase(),
    );
    if (existingCity) {
      setLocalError(WEATHER_ERROR.ALREADY_ADDED);
      highlightCity(existingCity.id);
      return;
    }

    setLocalError(null);
    try {
      const data = await fetchWeather(cityValue).unwrap();
      if (!data) {
        setLocalError(WEATHER_ERROR.CITY_NOT_FOUND);
        return;
      }
      dispatch(addCity({ data }));
      setCityValue("");
    } catch (err: any) {
      if ("status" in err && err.status === 404) {
        setLocalError(WEATHER_ERROR.CITY_NOT_FOUND);
      } else {
        setLocalError(WEATHER_ERROR.UNKNOWN_ERROR);
      }
    }
  };

  return (
    <div className={styles.weatherSearch}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Enter city name"
          value={cityValue}
          onChange={(e) => {
            setCityValue(e.target.value);
            setLocalError(validateInput(e.target.value));
          }}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={isLoading || !!localError}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer disabled:opacity-50"
          aria-label="Submit form"
        >
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>

      {localError && <p className="text-red-500 mt-2">{localError}</p>}
    </div>
  );
};

export default WeatherSearch;
