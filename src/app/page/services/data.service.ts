import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {WEATHER_ICON_MAP} from "../types/weather-icons.constants";
import {WeatherData} from "../types/weather-data.interface";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private citiesSubject = new BehaviorSubject<string[]>([]);
  cities$ = this.citiesSubject.asObservable();

  private readonly _API_URL = 'https://api.openweathermap.org/data/2.5';
  private readonly _API_KEY = 'a3114b818d30c4727d823e3163c9653d';

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedCities = localStorage.getItem('cities');
      if (storedCities) this.citiesSubject.next(JSON.parse(storedCities));
    }
  }

  get cities(): string[] {
    return this.citiesSubject.value;
  }

  get API_URL(): string {
    return this._API_URL;
  }

  get API_KEY(): string {
    return this._API_KEY;
  }

  /**
   * Adds a new city to the cities list if it's not already present.
   * Updates the cities subject and saves the updated list to localStorage.
   *
   * @param city - The name of the city to add.
   */
  addCity(city: string): void {
    if (!this.cities.includes(city)) {
      const updatedCities = [...this.cities, city];
      this.citiesSubject.next(updatedCities);
      this.saveCitiesToLocalStorage();
    }
  }

  /**
   * Removes a city from the cities list.
   * Filters out the specified city, updates the cities subject,
   * and saves the updated list to localStorage.
   *
   * @param city - The name of the city to remove.
   */
  removeCity(city: string): void {
    const updatedCities = this.cities.filter((c) => c !== city);
    this.citiesSubject.next(updatedCities);
    this.saveCitiesToLocalStorage();
  }

  /**
   * Saves the current cities list to localStorage.
   * Serializes the cities array and stores it under the 'cities' key.
   */
  private saveCitiesToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cities', JSON.stringify(this.cities));
    }
  }

  /**
   * Retrieves the appropriate weather icon based on the weather condition.
   * If no icon is found, returns a default cloudy icon.
   *
   * @param condition - The weather condition (e.g., "clear", "rainy").
   * @returns The path to the weather icon.
   */
  getWeatherIcon(condition: string): string {
    return WEATHER_ICON_MAP[condition.toLowerCase()] || 'assets/weather-icons/cloudy.png';
  }

  /**
   * Filters the weather data list based on the search term.
   * Returns a new array of weather data that matches the search term in the city name.
   * The search is case-insensitive.
   *
   * @param weatherDataList - The list of weather data to filter.
   * @param searchTerm - The term to search for in the city name.
   * @returns A filtered list of weather data.
   */
  searchWeatherData(weatherDataList: WeatherData[], searchTerm: string): WeatherData[] {
    if (searchTerm.trim() === '') return [...weatherDataList];

    const searchTermLower = searchTerm.trim().toLowerCase();
    return weatherDataList.filter((weatherData) =>
      weatherData.cityName.toLowerCase().includes(searchTermLower)
    );
  }
}
