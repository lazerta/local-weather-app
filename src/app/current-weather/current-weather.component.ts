import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICurrentWeather} from 'app/interfaces';
import {WeatherService} from 'app/weather/weather.service';
import {Observable, Subscription} from 'rxjs';
import {subscribeOn} from 'rxjs/operators';


@Component({
    selector: 'app-current-weather',
    templateUrl: './current-weather.component.html',
    styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
    current$: Observable<ICurrentWeather>;

    constructor(private weatherService: WeatherService) {
        this.current$ = weatherService.currentWeather$
    }

    ngOnInit() {
    }

    getOrdinal(date: number) {
        const n = new Date(date).getDate();
        return n > 0
            ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) ||
            n % 10 > 3 ? 0 : n % 10]
            : ''
    }

    ngOnDestroy(): void {
    }
}
