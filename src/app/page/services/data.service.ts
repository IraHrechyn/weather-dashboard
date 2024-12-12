import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {WEATHER_ICON_MAP} from "../types/weather-icons.constants";

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private _cityTitle: string = ''; // Поточне значення заголовка міста
  private citiesSubject = new BehaviorSubject<string[]>([]); // Потік для списку міст
  cities$ = this.citiesSubject.asObservable(); // Observable для підписки

  private readonly _API_URL = 'https://api.openweathermap.org/data/2.5';
  private readonly _API_KEY = 'a3114b818d30c4727d823e3163c9653d';

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedCities = localStorage.getItem('cities');
      if (storedCities) {
        this.citiesSubject.next(JSON.parse(storedCities));
      }
    }
  }

  get cityTitle(): string {
    return this._cityTitle;
  }

  set cityTitle(value: string) {
    this._cityTitle = value;
  }

  get cities(): string[] {
    return this.citiesSubject.value;
  }

  updateCities(cities: string[]): void {
    this.citiesSubject.next(cities);
    this.saveCitiesToLocalStorage();
  }

  addCity(city: string): void {
    if (!this.cities.includes(city)) { // Уникнення дублювання
      const updatedCities = [...this.cities, city];
      this.citiesSubject.next(updatedCities);
      this.saveCitiesToLocalStorage();
    }
  }

  removeCity(city: string): void {
    const updatedCities = this.cities.filter((c) => c !== city);
    this.citiesSubject.next(updatedCities);
    this.saveCitiesToLocalStorage();
  }

  get API_URL(): string {
    return this._API_URL;
  }

  get API_KEY(): string {
    return this._API_KEY;
  }

  private saveCitiesToLocalStorage(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cities', JSON.stringify(this.cities));
    }
  }

  getWeatherIcon(condition: string): string {
    return WEATHER_ICON_MAP[condition.toLowerCase()] || 'assets/weather-icons/cloudy.png';
  }
}
