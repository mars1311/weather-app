import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type WeatherType } from "@/types/Weather";
interface WeatherState {
  cities: WeatherType[];
  selectedCityId: number | null;
  highlightedCityId: number | null;
  status: "idle" | "loading" | "error";
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  selectedCityId: null,
  highlightedCityId: null,
  status: "idle",
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<{ data: WeatherType }>) => {
      const { data } = action.payload;

      if (!state.cities.find((c) => c.id === data.id)) {
        state.cities.unshift(data);
      }
    },
    updateCity: (state, action: PayloadAction<{ data: WeatherType }>) => {
      const { data } = action.payload;
      const index = state.cities.findIndex((c) => c.id === data.id);
      if (index !== -1) state.cities[index] = data;
    },
    removeCity: (state, action: PayloadAction<number>) => {
      state.cities = state.cities.filter((c) => c.id !== action.payload);
    },
    setStatus: (state, action: PayloadAction<WeatherState["status"]>) => {
      state.status = action.payload;
    },
    setHighlightedCity: (state, action: PayloadAction<number | null>) => {
      state.highlightedCityId = action.payload;
    },
  },
});

export const {
  addCity,
  updateCity,
  removeCity,
  setStatus,
  setHighlightedCity,
} = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;
