import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private weatherService: WeatherService) {}
  weatherData: { summary: string }[] = [];

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe({
      next: (data) => {
        console.log(data);
        this.weatherData = data as [];
      },
    });
  }
}
