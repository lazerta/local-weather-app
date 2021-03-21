import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {WeatherService} from 'app/weather/weather.service';
import {debounceTime} from 'rxjs/operators';

@Component({
    selector: 'app-city-search',
    templateUrl: './city-search.component.html',
    styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {
    search: FormControl = null;

    constructor(private weatherService: WeatherService) {
    }


    ngOnInit(): void {
        this.search = new FormControl('', {validators: [Validators.minLength(4)], updateOn: 'blur'},);
        this.search.valueChanges
            .pipe(debounceTime(1000))
            .subscribe((searchTerm: string) => this.searchForTerm(searchTerm));
    }

    private searchForTerm(searchValue: string) {
        if (searchValue && this.search.valid) {

            const userInput = searchValue.split(',').map(s => s.trim());
            this.weatherService.getCurrentWeather(
                userInput[0],
                userInput.length > 1 ? userInput[1] : undefined
            ).subscribe(data => (console.log(data)))

        }
    }
}