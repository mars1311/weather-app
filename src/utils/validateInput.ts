import { WEATHER_ERROR } from "@/constants/WeatherError";

export const validateOnChange = (value: string): string | null => {
  if (!value.trim()) return null; // 👈 key line
  if (value.trim().length < 2) return WEATHER_ERROR.MIN_LETTERS;
  if (!/^(?=.*\p{L})[\p{L}\s'-]+$/u.test(value)) {
    return WEATHER_ERROR.ONLY_LETTERS;
  }
  return null;
};

export const validateOnSubmit = (value: string): string | null => {
  if (!value.trim()) return WEATHER_ERROR.ENTER_CITY;
  if (value.trim().length < 2) return WEATHER_ERROR.MIN_LETTERS;
  if (!/^(?=.*\p{L})[\p{L}\s'-]+$/u.test(value)) {
    return WEATHER_ERROR.ONLY_LETTERS;
  }
  return null;
};