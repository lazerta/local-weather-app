import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {WeatherService} from 'app/weather/weather.service';
import {debounceTime, filter, tap} from 'rxjs/operators';

@Component({
    selector: 'app-city-search',
    templateUrl: './city-search.component.html',
    styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
    search: FormControl = new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
        updateOn: 'blur'
    });


    constructor(private weatherService: WeatherService) {
    }


    ngOnInit(): void {
        this.search.valueChanges
            .pipe(
                debounceTime(1000),
                filter(() => this.search.valid),
                tap((value: string) => this.doSearch(value))
            )
            .subscribe();
    }


    private doSearch(term: string) {
        const userInput = term.split(',').map(s => s.trim());
        this.weatherService.updateCurrentWeather(
            userInput[0],
            userInput.length > 1 ? userInput[1] : undefined
        );
    }
}
