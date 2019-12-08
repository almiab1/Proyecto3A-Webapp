import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasureroRoutingModule } from './basurero-routing.module';
import { CerrarSesionComponent } from './../../components/config/cerrar-sesion/cerrar-sesion.component';



@NgModule({
  declarations: [CerrarSesionComponent],
  imports: [
    CommonModule,
    BasureroRoutingModule,
  ],
  exports: [CerrarSesionComponent]
})
export class BasureroModule { }
