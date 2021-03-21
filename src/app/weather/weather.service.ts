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

export interface IWeatherService {
    getCurrentWeather(
        search: string | number,
        country?: string
    ): Observable<ICurrentWeather>

    getCurrentWeatherByCoords(coords: Coordinates):
        Observable<ICurrentWeather>
}

@Injectable({
    providedIn: 'root'
})
export class WeatherService implements IWeatherService {

    constructor(private http: HttpClient) {
    }

    getCurrentWeather(search: string | number, country?: string): Observable<ICurrentWeather> {
        let uriParams = new HttpParams()
        if (typeof search === 'string') {
            uriParams = uriParams.set('q',
                country ? `${search},${country}` : search
            )
        } else {
            uriParams = uriParams.set('zip', 'search')
        }

        return this.getCurrentWeatherHelper(uriParams)
    }

    getCurrentWeatherByCoords(coords: Coordinates):
        Observable<ICurrentWeather> {
        const uriParams = new HttpParams()
            .set('lat', coords.latitude.toString())
            .set('lon', coords.longitude.toString())
        return this.getCurrentWeatherHelper(uriParams)
    }

    private getCurrentWeatherHelper(uriParams: HttpParams):
        Observable<ICurrentWeather> {
        uriParams = uriParams.set('appid', environment.appId)
        return this.http
            .get<ICurrentWeatherData>(
                environment.baseUrl,
                {params: uriParams}
            )
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
