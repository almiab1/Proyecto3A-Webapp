import { TiempoCardComponent } from './../../../components/tiempo-card/tiempo-card.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { RutasPage } from './rutas.page';
import {RouterModule} from '@angular/router';
import {BasureroModule} from '../basurero.module';
import {SharedModule} from '../../../components/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {path: '', component: RutasPage}
    ]),
    SharedModule
  ],
  declarations: [RutasPage]
})
export class RutasPageModule {}
