import { TiempoCardComponent } from './../../../components/tiempo-card/tiempo-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { RutasPage } from './rutas.page';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {path: '', component: RutasPage}
    ])
  ],
  declarations: [RutasPage]
})
export class RutasPageModule {}
