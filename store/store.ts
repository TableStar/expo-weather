// Global state store - add your state management here
import { WeatherState, WeatherStore } from '@/types/weatherType';
import { create } from 'zustand';

// export interface AppState {
//   // Add your state properties here
// }

const initialState: WeatherState = {
  place: null,
};

export const useWeather = create<WeatherStore>((set) => ({
  ...initialState,
  setPlace: (city) => set({ place: city }),
}));
