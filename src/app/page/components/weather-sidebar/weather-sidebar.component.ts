import { Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataService} from "../../services/data.service";
import {WeatherService} from "../../services/weather-api.service";

@Component({
  selector: 'app-weather-sidebar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './weather-sidebar.component.html',
  styleUrls: ['./weather-sidebar.component.css', './../../styles/input-and-button.css']
})
export class WeatherSidebarComponent {
  @ViewChild('cityContainer') cityContainer: ElementRef | undefined;

  visibility: boolean = false;

  constructor(private data: DataService, private weatherService: WeatherService) {}

  visibilityCityContainer() {
    this.visibility = !this.visibility;

    const cityContainerElement = this.cityContainer?.nativeElement;

    if (this.visibility) {
      cityContainerElement.classList.remove('hidden');
      cityContainerElement.classList.add('visible');
    } else {
      cityContainerElement.classList.add('hidden');
      cityContainerElement.classList.remove('visible');
    }

    const button = document.querySelector('.toggle-button');
    button?.classList.toggle('active');
  }

  addCity(cityInput: HTMLInputElement): void {
    const cityName = cityInput.value.trim();

    if (cityName) {
      this.weatherService.getWeatherData(cityName).subscribe({
        next: (weatherData) => {
          if (!this.data.cities.includes(cityName)) {
            this.data.addCity(cityName);
          }
          cityInput.value = '';
        },
        error: () => {
          alert(`Не вдалося знайти інформацію про місто "${cityName}". Перевірте правильність написання.`);
        },
      });
    }
  }
}
