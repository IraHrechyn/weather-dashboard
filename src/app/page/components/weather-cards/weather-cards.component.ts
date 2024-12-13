import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherData} from "../../types/weather-data.interface";
import {WeatherService} from "../../services/weather-api.service";
import {DataService} from "../../services/data.service";
import {CommonModule} from "@angular/common";
import {CardFillingComponent} from "./components/card-filling/card-filling.component";
import {Subscription} from "rxjs";
import {CardModalComponent} from "./components/card-modal/card-modal.component";
import {FormsModule} from "@angular/forms";
import {log} from "util";

@Component({
  selector: 'app-weather-cards',
  standalone: true,
  imports: [
    CommonModule,
    CardFillingComponent,
    CardModalComponent,
    FormsModule
  ],
  templateUrl: './weather-cards.component.html',
  styleUrls: ['./weather-cards.component.css', '../../styles/input-and-button.css']
})
export class WeatherCardsComponent implements OnInit, OnDestroy {
  weatherDataList: WeatherData[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  private citiesSubscription!: Subscription;

  filteredWeatherDataList: WeatherData[] = [];
  selectedCard: WeatherData | null = null;
  isModalOpen: boolean = false;
  searchTerm: string = '';

  constructor(
    private weatherService: WeatherService,
    private dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.citiesSubscription = this.dataService.cities$.subscribe((cities) => {
      this.loadWeatherData(cities);
    });
    console.log(this.filteredWeatherDataList);
  }

  ngOnDestroy(): void {
    if (this.citiesSubscription) {
      this.citiesSubscription.unsubscribe();
    }
  }

  loadWeatherData(cities: string[]): void {
    this.isLoading = true;
    this.errorMessage = '';
    cities.forEach((cityName) => {

      const existingCard = this.weatherDataList.find(
        (data) => data.cityName.toLowerCase() === cityName.toLowerCase()
      );

      if (!existingCard) {
        this.weatherService.getWeatherData(cityName).subscribe({
          next: (weatherData) => {
           this.weatherDataList.push(weatherData);
          },
          error: (error) => {
            console.error(`Не вдалося отримати дані для міста ${cityName}:`, error);
          }
        });
      }
    });

    this.filteredWeatherDataList = this.weatherDataList;
  }

  searchCard(): void {
    this.filteredWeatherDataList = [...this.dataService.searchWeatherData(
      this.weatherDataList,
      this.searchTerm
    )];
  }


  openModal(card: WeatherData): void {
    this.selectedCard = card;
    console.log(this.selectedCard );
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.selectedCard = null;
    this.isModalOpen = false;
  }

  removeCity(cityName: string): void {
    // Remove city from the weatherDataList
    this.weatherDataList = this.weatherDataList.filter(
      (data) => data.cityName.toLowerCase() !== cityName.toLowerCase()
    );

    // Update filtered list
    this.filteredWeatherDataList = [...this.weatherDataList];

    // Remove city from the cities list in the DataService
    this.dataService.removeCity(cityName);
  }
}
