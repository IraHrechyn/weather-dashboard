import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataService} from "../../../../services/data.service";

@Component({
  selector: 'app-card-filling',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-filling.component.html',
  styleUrl: './card-filling.component.css'
})
export class CardFillingComponent {
  @Input() cityName: string = '';
  @Input() currentTemperature: number = 0;
  @Input() weatherCondition: string = '';
  @Input() description: string = '';
  @Input() forecast: { date: string; temperature: number; condition: string }[] = [];

  constructor(public data: DataService) {
  }
  getWeatherIcon(condition: string): string {
    const iconMap: { [key: string]: string } = {
      sunny: 'assets/weather-icons/sun.png',
      cloudy: 'assets/weather-icons/cloudy.png',
      rain: 'assets/weather-icons/rain.png',
      snow: 'assets/weather-icons/snowflake.png',
      storm: 'assets/weather-icons/storm.png',
      wind: 'assets/weather-icons/wind.png'
    };
    return iconMap[condition.toLowerCase()] || 'assets/weather-icons/cloudy.png'; // Значення за замовчуванням
  }
}
