import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import { CerrarSesionComponent } from './config/cerrar-sesion/cerrar-sesion.component';

@NgModule({
  declarations: [CerrarSesionComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [CerrarSesionComponent]
})

export class BasureroComponentsModule { }
