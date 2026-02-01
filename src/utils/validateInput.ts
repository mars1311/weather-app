import { WEATHER_ERROR } from '@/constants/WeatherError';

 export const validateInput = (value: string): string | null => {
    if (!value.trim()) return WEATHER_ERROR.ENTER_CITY;
    if (value.trim().length < 2) return WEATHER_ERROR.MIN_LETTERS;
    if (!/^(?=.*\p{L})[\p{L}\s'-]+$/u.test(value)) {return WEATHER_ERROR.ONLY_LETTERS;}
    return null;
  };