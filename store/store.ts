// Global state store - add your state management here
import { WeatherState, WeatherStore } from '@/types/weatherType';
import { create } from 'zustand';

// export interface AppState {
//   // Add your state properties here
// }

const initialState:WeatherState = {
  place: null,
  apiResponse:null,
  currWeather: null,
  dailyforecasts: [],
  isLoading: true,
  error: null,
};

export const useWeather = create<WeatherStore>((set) => ({
    ...initialState,
    fetchWeatherByCoords: async (lat, lon) => {
        console.log(lat,lon);
    },
    fetchWeatherByCity: async (city) => {
        console.log(city);
    },
}));
