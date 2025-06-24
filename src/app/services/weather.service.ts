import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherResponse } from '../types/weather.type';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  getStockholmTemperature(): Observable<number> {
    const lat = 59.3293;
    const lon = 18.0686;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m`;

    return this.http
      .get<WeatherResponse>(url)
      .pipe(map((response) => response.current.temperature_2m));
  }
}
