import { Injectable } from '@angular/core';
import {WeatherService} from "./weather-api.service";


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _cityTitle: string = '';
  private readonly _API_URL = 'https://api.openweathermap.org/data/2.5';
  private readonly _API_KEY = 'a3114b818d30c4727d823e3163c9653d';


  get cityTitle(){
    return this._cityTitle;
  }

  set cityTitle(value: string){
    this._cityTitle = value;
  }

  get API_URL(){
    return this._API_URL;
  }

  get API_KEY(){
    return this._API_KEY;
  }
}
