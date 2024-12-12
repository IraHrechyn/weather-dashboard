import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataService} from "../../../../services/data.service";
import {WEATHER_ICON_MAP} from "../../../../types/weather-icons.constants";

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
  @Input() cityName: string = '';
  @Input() currentTemperature: number = 0;
  @Input() weatherCondition: string = '';
  @Input() description: string = '';
  @Input() forecast: { date: string; temperature: number; condition: string }[] = [];


  constructor(public data: DataService) {}
}
