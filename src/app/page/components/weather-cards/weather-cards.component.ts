import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherData} from "../../types/weather-data.interface";
import {WeatherService} from "../../services/weather-api.service";
import {DataService} from "../../services/data.service";
import {CommonModule} from "@angular/common";
import {CardFillingComponent} from "./components/card-filling/card-filling.component";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-weather-cards',
  standalone: true,
  imports: [
    CommonModule,
    CardFillingComponent
  ],
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.css', '../../styles/input-and-button.css']
})
export class WeatherCardsComponent implements OnInit, OnDestroy {
  weatherDataList: WeatherData[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  private citiesSubscription!: Subscription;

  constructor(
    private weatherService: WeatherService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.citiesSubscription = this.dataService.cities$.subscribe((cities) => {
      this.loadWeatherData(cities);
    });
  }

  ngOnDestroy(): void {
    if (this.citiesSubscription) {
      this.citiesSubscription.unsubscribe();
    }
  }

  loadWeatherData(cities: string[]): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.weatherDataList = [];

    cities.forEach((cityName) => {
      this.weatherService.getWeatherData(cityName).subscribe({
        next: (weatherData) => {
          this.weatherDataList.push(weatherData);
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = error;
          this.isLoading = false;
        },
      });
    });
  }
}
