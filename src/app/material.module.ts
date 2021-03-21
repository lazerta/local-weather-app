import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


const MATERIAL_MODULE = [
    MatBadgeModule, MatToolbarModule, MatIconModule,
    MatCardModule
];

@NgModule({
    declarations: [],
    imports:[...MATERIAL_MODULE],
    exports: [...MATERIAL_MODULE]
})
export class MaterialModule {
}
