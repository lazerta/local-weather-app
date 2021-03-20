import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'environments/environment';
import {ICurrentWeather} from 'app/interfaces';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface ICurrentWeatherData {
    weather: [
        {
            description: string
            icon: string
        }
    ]
    main: {
        temp: number
    }
    sys: {
        country: string
    }
    dt: number
    name: string
}

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    constructor(private http: HttpClient) {
    }

    getCurrentWeather(city: string, country: string):Observable<ICurrentWeather> {
        const params = new HttpParams()
            .set('q', city)
            .append('q', country)
            .set('appId', environment.appId);
        return this.http.get<ICurrentWeatherData>(
            environment.baseUrl, {params})
            .pipe(map(data => this.transformToICurrentWeather(data)))
    }

    private transformToICurrentWeather(data: ICurrentWeatherData): ICurrentWeather {
        return {
            city: data.name,
            country: data.sys.country,
            date: data.dt * 1000,
            image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
            temperature: this.convertKelvinToFahrenheit(data.main.temp),
            description: data.weather[0].description,
        }
    }

    private convertKelvinToFahrenheit(kelvin: number): number {
        return kelvin * 9 / 5 - 459.67
    }
}