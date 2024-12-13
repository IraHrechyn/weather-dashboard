// weather.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, switchMap, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {WeatherData} from "../types/weather-data.interface";
import {DataService} from "./data.service";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient, private data: DataService) {}

  getCurrentWeather(cityName: string): Observable<WeatherData> {
    const currentWeatherUrl = `${this.data.API_URL}/weather?q=${cityName}&units=metric&appid=${this.data.API_KEY}`;

    return this.http.get(currentWeatherUrl).pipe(
      map((currentWeatherResponse: any) => {
        const currentWeather: WeatherData = {
          cityName: currentWeatherResponse.name,
          currentTemperature: currentWeatherResponse.main.temp,
          weatherCondition: currentWeatherResponse.weather[0].main,
          description: currentWeatherResponse.weather[0].description,
          forecast: [],
        };
        return currentWeather;
      }),
      catchError(this.handleError)
    );
  }

  getWeatherForecast(cityName: string): Observable<any> {
    const forecastUrl = `${this.data.API_URL}/forecast?q=${cityName}&units=metric&appid=${this.data.API_KEY}`;

    return this.http.get(forecastUrl).pipe(
      map((forecastResponse: any) => {
        return forecastResponse.list
          .filter((entry: any, index: number) => index % 8 === 0)
          .slice(0, 4)
          .map((entry: any) => ({
            date: new Date(entry.dt * 1000).toLocaleDateString(),
            temperature: entry.main.temp,
            condition: entry.weather[0].main,
            subDescription: entry.weather[0].description,
          }));
      }),
      catchError(this.handleError)
    );
  }

  getWeatherData(cityName: string): Observable<WeatherData> {
    return this.getCurrentWeather(cityName).pipe(
      switchMap((currentWeather: WeatherData) => {
        return this.getWeatherForecast(cityName).pipe(
          map((forecast: any) => {
            currentWeather.forecast = forecast;
            return currentWeather;
          }),
          catchError(this.handleError)
        );
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.error.message || error.statusText);
    return throwError(
      error.error.message || 'Unable to retrieve weather data. Please try again later.'
    );
  }
}
