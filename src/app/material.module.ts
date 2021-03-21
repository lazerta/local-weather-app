import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


const MATERIAL_MODULE = [
    MatBadgeModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatFormFieldModule, MatIconModule,
    MatInputModule
];

@NgModule({
    declarations: [],
    imports: [...MATERIAL_MODULE],
    exports: [...MATERIAL_MODULE]
})
export class MaterialModule {
}
