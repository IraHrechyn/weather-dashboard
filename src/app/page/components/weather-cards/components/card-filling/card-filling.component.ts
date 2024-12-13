import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataService} from "../../../../services/data.service";
import {WEATHER_ICON_MAP} from "../../../../types/weather-icons.constants";
import {WeatherData} from "../../../../types/weather-data.interface";

@Component({
  selector: 'app-card-filling',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-filling.component.html',
  styleUrls: ['./card-filling.component.css', '../../../../styles/card-description.css']
})
export class CardFillingComponent {
  @Input() weatherData!: WeatherData;
  @Output() openModal = new EventEmitter<WeatherData>(); // Додаємо EventEmitter
  @Output() removeCityEvent = new EventEmitter<string>();

  constructor(public data: DataService) {}

  // Метод для відкриття модального вікна
  openWeatherModal(weatherData: WeatherData): void {
    this.openModal.emit(weatherData);
  }
  removeCity(cityName: string): void {
    this.removeCityEvent.emit(cityName); // Emit the city name to parent
  }
}
