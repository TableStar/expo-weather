export type WeatherApiResponseType = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherForecast[];
  city: City;
};

export type City = {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export type Coord = {
  lat: number;
  lon: number;
};

export type WeatherForecast = {
  dt: number;
  main: Main;
  weather: WeatherElement[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
  dt_txt: string;
};

export type Clouds = {
  all: number;
};

export type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
};

export type Rain = {
  '3h': number;
};

export type Sys = {
  pod: string;
};

export type WeatherElement = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type Wind = {
  speed: number;
  deg: number;
  gust: number;
};

export type WeatherState = {
  place: string | null;
};

export type WeatherActions = {
  setPlace: (city:string)=> void
}
export type WeatherStore = WeatherState & WeatherActions;
