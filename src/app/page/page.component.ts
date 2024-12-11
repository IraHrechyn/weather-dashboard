import { Component } from '@angular/core';
import {WeatherSidebarComponent} from "./components/weather-sidebar/weather-sidebar.component";
import {WeatherCardsComponent} from "./components/weather-cards/weather-cards.component";

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    WeatherSidebarComponent,
    WeatherCardsComponent
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {

}
