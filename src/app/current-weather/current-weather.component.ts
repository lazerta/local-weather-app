import {Component, OnInit} from '@angular/core';
import {ICurrentWeather} from 'app/interfaces';
import {WeatherService} from 'app/weather/weather.service';



@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
    current: ICurrentWeather;

    constructor(private weatherService: WeatherService) {
    }

    ngOnInit() {
        this.weatherService
            .getCurrentWeather('New York', 'US')
            .subscribe(data => this.current = data)
    }
}
