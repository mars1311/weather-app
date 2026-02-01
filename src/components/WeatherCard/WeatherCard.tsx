'use client';
import React, { useMemo, memo } from 'react';
import { RefreshCw } from 'lucide-react';
import { WEATHER_CARD } from '@/constants/WeatherCard';
import { formatTime } from '@/utils/formatTime';
import styles from './WeatherCard.module.scss';

type WeatherCardProps = {
  id: number;
  city: string;
  temperature: number;
  description: string;
  updatedAt: string;
  isHighlighted: boolean;
  onRefresh: (id: number) => void;
  onDelete: (id: number) => void;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  id,
  city,
  temperature,
  description,
  updatedAt,
  isHighlighted,
  onRefresh,
  onDelete,
}) => {

const formattedTime = useMemo(() => {
    return formatTime(updatedAt)
  }, [updatedAt]);
  return (
    <div className={`${styles.weatherCard} ${isHighlighted ? styles.weatherCard_isHighlighted : ''}`}>
      <div className={styles.weatherCard__top}>
        <h3>{city}</h3>
        <span> {formattedTime} </span>
      </div>
      <div className={styles.weatherCard__main}>
        <p className={styles.weatherCard__temp}>{temperature}°</p>
        <p className={styles.weatherCard__desc}>{description}</p>
      </div>
      <div className={styles.weatherCard__buttons}>
        <button
          className={styles.weatherCard__refreshBtn}
          onClick={() => onRefresh(id)}
          aria-label="Refresh city"
        >
          <RefreshCw  size={16} />
          <span>{WEATHER_CARD.REFRESH}</span>
        </button>
        <button
          className={styles.weatherCard__removeBtn}
          onClick={() => onDelete(id)}
          aria-label="Remove city"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default memo(WeatherCard);