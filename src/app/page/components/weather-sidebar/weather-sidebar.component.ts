import { Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataService} from "../../services/data.service";

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

  constructor(private data: DataService) {
  }

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

  addCity(cityInput: HTMLInputElement) {
    this.data.cityTitle = cityInput.value;
    cityInput.value = '';
  }
}
