import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherSidebarComponent } from './weather-sidebar.component';
import { DataService } from '../../services/data.service';
import { WeatherService } from '../../services/weather-api.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('WeatherSidebarComponent', () => {
  let component: WeatherSidebarComponent;
  let fixture: ComponentFixture<WeatherSidebarComponent>;
  let dataServiceMock: jasmine.SpyObj<DataService>;
  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    dataServiceMock = jasmine.createSpyObj('DataService', ['addCity', 'cities']);
    weatherServiceMock = jasmine.createSpyObj('WeatherService', ['getWeatherData']);

    await TestBed.configureTestingModule({
      declarations: [WeatherSidebarComponent],
      providers: [
        { provide: DataService, useValue: dataServiceMock },
        { provide: WeatherService, useValue: weatherServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle visibility of city input container when button is clicked', () => {
    const cityContainerElement = fixture.debugElement.query(By.css('.city-container')).nativeElement;
    const toggleButton = fixture.debugElement.query(By.css('.toggle-button')).nativeElement;

    expect(cityContainerElement.classList).toContain('hidden');
    expect(cityContainerElement.classList).not.toContain('visible');

    toggleButton.click();
    fixture.detectChanges();

    expect(cityContainerElement.classList).toContain('visible');
    expect(cityContainerElement.classList).not.toContain('hidden');

    toggleButton.click();
    fixture.detectChanges();

    expect(cityContainerElement.classList).toContain('hidden');
    expect(cityContainerElement.classList).not.toContain('visible');
  });

  it('should display an error message if an invalid city is added', () => {
    const cityName = 'InvalidCity';
    weatherServiceMock.getWeatherData.and.returnValue(throwError(() => new Error('City not found')));

    const cityInput = fixture.debugElement.query(By.css('input')).nativeElement;
    cityInput.value = cityName;

    const addButton = fixture.debugElement.query(By.css('button')).nativeElement;
    spyOn(window, 'alert');
    addButton.click();
    fixture.detectChanges();

    expect(window.alert).toHaveBeenCalledWith(`Не вдалося знайти інформацію про місто "${cityName}". Перевірте правильність написання.`);
  });

  it('should toggle the button class "active" when visibility changes', () => {
    const toggleButton = fixture.debugElement.query(By.css('.toggle-button')).nativeElement;

    expect(toggleButton.classList).not.toContain('active');

    toggleButton.click();
    fixture.detectChanges();

    expect(toggleButton.classList).toContain('active');

    toggleButton.click();
    fixture.detectChanges();

    expect(toggleButton.classList).not.toContain('active');
  });
});
