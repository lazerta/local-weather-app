import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <div>
            <mat-toolbar color="primary">
                <div fxLayoutAlign="center">
                    <span>LocalCast Weather</span>
                </div>
            </mat-toolbar>
            <div fxLayoutAlign="center">
                <div class="mat-caption vertical-margin">Your city, your forecast, right now!</div>
            </div>
            <div fxLayout="row">
                <div fxFlex></div>
                <div fxFlex="300px">
                    <mat-card fxFlex="300px">
                        <mat-card-header>
                            <mat-card-title>
                                <div class="mat-headline">
                                    Current Weather
                                </div>
                            </mat-card-title>
                        </mat-card-header>
                        <mat-card-content>
                            <app-current-weather></app-current-weather>
                        </mat-card-content>

                    </mat-card>
                </div>
                <div fxFlex></div>
            </div>
        </div>
    `,
})
export class AppComponent {

}
