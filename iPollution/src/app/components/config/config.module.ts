import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CerrarSesionComponent} from './cerrar-sesion/cerrar-sesion.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [CerrarSesionComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [CerrarSesionComponent]
})
export class ConfigModule { }
