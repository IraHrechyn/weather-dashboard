import {Component, OnInit} from '@angular/core';
import {WeatherData} from "../../types/weather-data.interface";
import {WeatherService} from "../../services/weather-api.service";
import {DataService} from "../../services/data.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-weather-cards',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './weather-cards.component.html',
  styleUrl: './weather-cards.component.css'
})
export class WeatherCardsComponent {

}
