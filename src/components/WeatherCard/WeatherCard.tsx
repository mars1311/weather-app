"use client";
import { useMemo, memo } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import type { MouseEvent } from "react";
import { WEATHER_CARD } from "@/constants/WeatherCard";
import { formatTime } from "@/utils/formatTime";
import styles from "./WeatherCard.module.scss";

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

const WeatherCard = ({
  id,
  city,
  temperature,
  description,
  updatedAt,
  isHighlighted,
  onRefresh,
  onDelete,
}: WeatherCardProps) => {
  const router = useRouter();

  const handleOnDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handleOnRefresh = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onRefresh(id);
  };

  const handleNavigate = () => {
    router.push(`/weather/${id}`);
  };

  const formattedTime = useMemo(() => {
    return formatTime(updatedAt);
  }, [updatedAt]);
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleNavigate();
        }
      }}
      className={`${styles.weatherCard} ${isHighlighted ? styles.weatherCard_isHighlighted : ""}`}
    >
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
          onClick={handleOnRefresh}
          aria-label="Refresh city"
        >
          <RefreshCw size={16} />
          <span>{WEATHER_CARD.REFRESH}</span>
        </button>

        <button
          className={styles.weatherCard__removeBtn}
          onClick={handleOnDelete}
          aria-label="Remove city"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default memo(WeatherCard);
