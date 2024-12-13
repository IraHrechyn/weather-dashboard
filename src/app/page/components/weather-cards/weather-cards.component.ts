import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherData} from "../../types/weather-data.interface";
import {WeatherService} from "../../services/weather-api.service";
import {DataService} from "../../services/data.service";
import {CommonModule} from "@angular/common";
import {CardFillingComponent} from "./components/card-filling/card-filling.component";
import {Subscription} from "rxjs";
import {CardModalComponent} from "./components/card-modal/card-modal.component";
import {FormsModule} from "@angular/forms";

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
  filteredWeatherDataList: WeatherData[] = [];

  selectedCard: WeatherData | null = null;
  isModalOpen: boolean = false;

  searchTerm: string = '';

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
    if (this.citiesSubscription) this.citiesSubscription.unsubscribe();
  }

  loadWeatherData(cities: string[]): void {
    cities.forEach((cityName) => {
      const existingCard = this.weatherDataList.find(
        (data) => data.cityName.toLowerCase() === cityName.toLowerCase()
      );

      if (!existingCard) {
        this.weatherService.getWeatherData(cityName).subscribe({
          next: (weatherData) => {this.weatherDataList.push(weatherData);},
          error: (error) => {
            console.error(`Failed to get data for city ${cityName}:`, error);
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
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.selectedCard = null;
    this.isModalOpen = false;
  }

  removeCity(cityName: string): void {
    this.weatherDataList = this.weatherDataList.filter(
      (data) => data.cityName.toLowerCase() !== cityName.toLowerCase()
    );

    this.filteredWeatherDataList = [...this.weatherDataList];
    this.dataService.removeCity(cityName);
  }
}
