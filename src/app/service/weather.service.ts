import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getWeatherByCity(city: string) {
    const url = `${this.apiUrl}/current.json?key=${this.apiKey}&q=${city}`;

    return this.http.get(url);
  }

  getWeatherForecast(city: string) {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&q=${city}`;

    return this.http.get(url);
  }
}
