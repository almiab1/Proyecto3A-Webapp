import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasureroRoutingModule } from './basurero-routing.module';
import {RutasPageModule} from './rutas/rutas.module';
import {ConfiguracionPageModule} from './configuracion/configuracion.module';



@NgModule({
  declarations: [],
    imports: [
        CommonModule,
        BasureroRoutingModule,
        RutasPageModule,
        ConfiguracionPageModule
    ]
})
export class BasureroModule { }
