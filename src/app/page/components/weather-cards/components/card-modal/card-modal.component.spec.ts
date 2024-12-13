import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardModalComponent } from './card-modal.component';
import { DataService } from "../../../../services/data.service";
import { WeatherData } from "../../../../types/weather-data.interface";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardModalComponent', () => {
  let component: CardModalComponent;
  let fixture: ComponentFixture<CardModalComponent>;
  let dataService: DataService;

  // Мокові дані для тестів
  const mockWeatherData: WeatherData = {
    cityName: 'Kyiv',
    currentTemperature: 25,
    weatherCondition: 'Clear',
    description: 'Sunny',
    forecast: [
      {
        date: '2024-12-13',
        condition: 'Sunny',
        subDescription: 'Clear skies',
        temperature: 25
      },
      {
        date: '2024-12-14',
        condition: 'Cloudy',
        subDescription: 'Partly cloudy',
        temperature: 22
      }
    ]
  };

  beforeEach(async () => {
    // Налаштування тестового середовища
    await TestBed.configureTestingModule({
      imports: [CardModalComponent],
      providers: [DataService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CardModalComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  // Тест 1: перевірка створення компонента
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Тест 2: перевірка виклику close при натисканні на кнопку закриття
  it('should emit close event when the close button is clicked', () => {
    spyOn(component.close, 'emit');
    component.closeModal();
    expect(component.close.emit).toHaveBeenCalled();
  });

});
