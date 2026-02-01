"use client";

import { WeatherType } from "@/types/Weather";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import Empty from "@/components/Empty/Empty";
import { useAppSelector } from "@/hooks/useApp";

type WeatherListProps = {
  cities: WeatherType[];
  onRefresh: (id: number) => void;
  onDelete: (id: number) => void;
};

const WeatherList: React.FC<WeatherListProps> = ({ cities, onRefresh, onDelete }) => {
  const highlightedCityId = useAppSelector((state) => state.weather.highlightedCityId);

  if (!cities || cities.length === 0) {
    return <Empty />;
  }

  return (
    <section className="max-w-[1200px] mx-auto w-full mt-6 p-4">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
        {cities.map((cityItem) => (
          <li key={cityItem.id}>
            <WeatherCard
              id={cityItem.id}
              city={cityItem.name}
              temperature={cityItem.temp}
              description={cityItem.condition}
              updatedAt={cityItem.lastUpdated}
              isHighlighted={cityItem.id === highlightedCityId}
              onRefresh={onRefresh}
              onDelete={onDelete}
          />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeatherList;