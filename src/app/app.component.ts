import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'weather-app';
  private weatherService = inject(WeatherService);
  temperature: number | null = null;

  fetchTemperature() {
    this.weatherService.getStockholmTemperature().subscribe({
      next: (temp) => (this.temperature = temp),
      error: (err) =>
        console.error('Error fetching temperature in stockholm', err),
    });
  }
}
