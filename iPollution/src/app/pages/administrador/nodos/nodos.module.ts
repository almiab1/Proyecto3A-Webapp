import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { NodosPage } from './nodos.page';
import { Router, RouterModule } from '@angular/router';

import { AdministradorModule } from './../administrador.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{
      path: '',
      component: NodosPage
    }]),
    AdministradorModule
  ],
  declarations: [NodosPage]
})
export class NodosPageModule {}