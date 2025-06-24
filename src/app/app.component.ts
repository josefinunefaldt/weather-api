import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WeatherService } from './services/weather.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private weatherService = inject(WeatherService);
  city = 'Stockholm';
  temperature: number | null = null;

  fetchTemperature() {
    this.weatherService.getTemperatureByCity(this.city).subscribe({
      next: (temp) => (this.temperature = temp),
      error: (err) =>
        console.error(`Error fetching temperature for ${this.city}`, err),
    });
  }

  downloadCSV() {
    const header = 'City,Temperature (°C)\n';
    const data = `${this.city},${this.temperature ?? 'N/A'}\n`;
    const csvContent = '\uFEFF' + header + data;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'weather.csv';
    a.click();
    URL.revokeObjectURL(url);
  }
}
