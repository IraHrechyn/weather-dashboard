import { Component } from '@angular/core';
import {WeatherSidebarComponent} from "./components/weather-sidebar/weather-sidebar.component";
import {WeatherCardsComponent} from "./components/weather-cards/weather-cards.component";
import {DataService} from "./services/data.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    WeatherSidebarComponent,
    WeatherCardsComponent,
    CommonModule
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  constructor(public data: DataService) {}
}
