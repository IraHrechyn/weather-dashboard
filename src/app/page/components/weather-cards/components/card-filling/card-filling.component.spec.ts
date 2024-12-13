import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFillingComponent } from './card-filling.component';
import { DataService } from "../../../../services/data.service";
import { WeatherData } from "../../../../types/weather-data.interface";
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardFillingComponent', () => {
  let component: CardFillingComponent;
  let fixture: ComponentFixture<CardFillingComponent>;
  let dataService: DataService;

  // Мокові дані для тестів
  const mockWeatherData: WeatherData = {
    cityName: 'Kyiv',
    currentTemperature: 25,
    weatherCondition: 'Clear',
    description: 'Sunny',
    forecast: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFillingComponent, CommonModule],
      providers: [DataService],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFillingComponent);
    component = fixture.componentInstance;
    dataService = TestBed.inject(DataService);
    fixture.detectChanges();
  });

  // Тест 1: перевірка створення компонента
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Тест 2: перевірка виклику openModal при натисканні на іконку погоди
  it('should emit openModal event when the weather icon is clicked', () => {
    spyOn(component.openModal, 'emit');
    component.openWeatherModal(mockWeatherData);
    expect(component.openModal.emit).toHaveBeenCalledWith(mockWeatherData);
  });

  // Тест 3: перевірка виклику removeCityEvent при натисканні на іконку видалення міста
  it('should emit removeCityEvent when the trash icon is clicked', () => {
    spyOn(component.removeCityEvent, 'emit');
    component.removeCity(mockWeatherData.cityName);
    expect(component.removeCityEvent.emit).toHaveBeenCalledWith(mockWeatherData.cityName);
  });

  // Тест 4: перевірка коректного рендерингу даних в шаблоні
  it('should display weather data correctly in the template', () => {
    component.weatherData = mockWeatherData;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.city-title').textContent).toContain('Kyiv');
    expect(compiled.querySelector('.temperature').textContent).toContain('25');
    expect(compiled.querySelector('.description p').textContent).toContain('Clear');
  });
});
