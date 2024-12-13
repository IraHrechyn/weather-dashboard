import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataService} from "../../../../services/data.service";
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
  @Output() openModal = new EventEmitter<WeatherData>();
  @Output() removeCityEvent = new EventEmitter<string>();

  constructor(public data: DataService) {}

  openWeatherModal(weatherData: WeatherData): void {
    this.openModal.emit(weatherData);
  }

  removeCity(cityName: string): void {
    this.removeCityEvent.emit(cityName);
  }
}
