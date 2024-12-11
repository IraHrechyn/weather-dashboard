export interface WeatherData {
  cityName: string;
  currentTemperature: number;
  weatherCondition: string;
  description: string;
  forecast: Array<{
    date: string;
    temperature: number;
    condition: string;
  }>;
}
