import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherCardsComponent } from './weather-cards.component';
import { WeatherService } from "../../services/weather-api.service";
import { DataService } from "../../services/data.service";
import { CardFillingComponent } from "./components/card-filling/card-filling.component";
import { CardModalComponent } from "./components/card-modal/card-modal.component";
import { of } from 'rxjs';

describe('WeatherCardsComponent', () => {
  let component: WeatherCardsComponent;
  let fixture: ComponentFixture<WeatherCardsComponent>;
  let weatherService: jasmine.SpyObj<WeatherService>;
  let dataService: jasmine.SpyObj<DataService>;

  const mockCities = ['Kyiv', 'Lviv'];

  const mockWeatherData = {
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
      }
    ]
  };

  beforeEach(async () => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', ['getWeatherData']);
    const dataServiceSpy = jasmine.createSpyObj('DataService', ['cities$', 'searchWeatherData', 'removeCity']);

    weatherServiceSpy.getWeatherData.and.returnValue(of(mockWeatherData));
    dataServiceSpy.cities$.and.returnValue(of(mockCities));

    await TestBed.configureTestingModule({
      imports: [WeatherCardsComponent, CardFillingComponent, CardModalComponent],
      providers: [
        { provide: WeatherService, useValue: weatherServiceSpy },
        { provide: DataService, useValue: dataServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherCardsComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>;
    dataService = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
    fixture.detectChanges();
  });

  // Тест 1: перевірка створення компонента
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Тест 2: перевірка підписки на cities$ і завантаження даних погоди
  it('should load weather data for cities on ngOnInit', () => {
    component.ngOnInit();
    expect(weatherService.getWeatherData).toHaveBeenCalledTimes(mockCities.length);
    expect(component.weatherDataList.length).toBe(1);
  });

  // Тест 3: перевірка пошуку картки
  it('should filter weather data when searchCard is called', () => {
    component.weatherDataList = [mockWeatherData];
    component.searchTerm = 'Kyiv';
    component.searchCard();
    expect(component.filteredWeatherDataList.length).toBe(1);
  });

  // Тест 4: перевірка відкриття модалки
  it('should open modal with selected card', () => {
    component.openModal(mockWeatherData);
    expect(component.selectedCard).toEqual(mockWeatherData);
    expect(component.isModalOpen).toBeTrue();
  });

  // Тест 5: перевірка закриття модалки
  it('should close modal', () => {
    component.openModal(mockWeatherData);
    component.closeModal();
    expect(component.selectedCard).toBeNull();
    expect(component.isModalOpen).toBeFalse();
  });

  // Тест 6: перевірка видалення міста
  it('should remove city from the list', () => {
    component.weatherDataList = [mockWeatherData];
    component.removeCity('Kyiv');
    expect(component.weatherDataList.length).toBe(0);
    expect(dataService.removeCity).toHaveBeenCalledWith('Kyiv');
  });

});
