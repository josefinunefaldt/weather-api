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

  downloadCSV() {
    const header = 'City,Temperature (°C)\n';
    const data = `Stockholm,${this.temperature ?? 'N/A'}\n`;
    const csvContent = header + data;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
