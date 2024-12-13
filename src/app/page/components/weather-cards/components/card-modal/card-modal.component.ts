import {Component, Input, Output} from '@angular/core';
import {WeatherData} from "../../../../types/weather-data.interface";
import { EventEmitter } from '@angular/core';
import {CommonModule} from "@angular/common";
import {DataService} from "../../../../services/data.service";

@Component({
  selector: 'app-card-modal',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.css', '../../../../styles/card-description.css']
})
export class CardModalComponent {
  @Input() data!: WeatherData;
  @Output() close = new EventEmitter<void>();

  constructor(public dataService: DataService) {}

  closeModal(): void {
    this.close.emit();
  }
}



