"use client";
import Image from "next/image";
import Link from 'next/link';
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/hooks/useApp";
import { useLazyGetForecastQuery } from "@/api/weatherApi";
import { FORECAST  } from "@/constants/Forecast";
import styles from './Forecast.module.scss';

import { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function WeatherDetailPage() {
  const { id } = useParams();
  const city = useAppSelector((state) => state.weather.cities.find((c) => c.id === Number(id)));

  const [fetchForecast, { data: forecast }] = useLazyGetForecastQuery();

  console.log('forecast', city);

  useEffect(() => {
    if (!city) return;
    fetchForecast({ lat: city.lat, lon: city.lon });
  }, [city, fetchForecast]);

  const nextHours = forecast ? forecast.slice(0, 8).map(item => ({
    time: item.dt_txt,
    temp: Math.round(item.main.temp)
  })) : [];

  if (!city) return <div>{FORECAST.CITY_NOT_FOUND}</div>;

  const iconBaseUrl = process.env.NEXT_PUBLIC_WEATHER_ICON_URL;
  const iconUrl = `${iconBaseUrl}${city.icon}@2x.png`;
  
  return (
    <main className={styles.forecast}>
      <Link href="/" className={styles.forecast__link}>
        <ArrowLeft size={20} />
        <span>{FORECAST.BACK}</span>
      </Link>
      <section className={styles.forecast__content}>
        <div className={styles.forecast__content__header}>
          <Image
            src={iconUrl}
            alt={city.condition}
            width={40}
            height={40}
          />
          <h1>
            <span>
              {city.name}, {city.country}
            </span>
          </h1>
        </div>

        <div className={styles.forecast__info}>
          <div className={styles.forecast__details}>
            <div className={styles.forecast__item}>
              <span className={styles.forecast__label}>{FORECAST.TEMP}</span>
              <span className={styles.forecast__value}>{city.temp}°C</span>
            </div>

            <div className={styles.forecast__item}>
              <span className={styles.forecast__label}>{FORECAST.FEELS}</span>
              <span className={styles.forecast__value}>{city.feels_like}°C</span>
            </div>

            <div className={styles.forecast__item}>
              <span className={styles.forecast__label}>{FORECAST.WIND}</span>
              <span className={styles.forecast__value}>{city.windSpeed} m/s</span>
            </div>
          </div>
          <div className={styles.forecast__details}>
            <div className={styles.forecast__item}>
              <span className={styles.forecast__label}>{FORECAST.HUMIDITY}</span>
              <span className={styles.forecast__value}>{city.humidity}%</span>
            </div>
            <div className={styles.forecast__item}>
              <span className={styles.forecast__label}>{FORECAST.COND}</span>
              <span className={styles.forecast__value}>{city.condition}</span>
            </div>
            <div className={styles.forecast__item}>
              <span className={styles.forecast__label}>{FORECAST.DESC}</span>
              <span className={styles.forecast__value}>{city.description}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        {nextHours.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={nextHours}>
              <XAxis
                dataKey="time"
                tickFormatter={(val) => new Date(val).getHours() + ":00"}
              />
              <YAxis dataKey="temp" unit="°" />
              <Tooltip
                labelFormatter={(val) => new Date(val).toLocaleTimeString()}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>{FORECAST.LOAD}</p>
        )}
      </section>
    </main>
  );
}