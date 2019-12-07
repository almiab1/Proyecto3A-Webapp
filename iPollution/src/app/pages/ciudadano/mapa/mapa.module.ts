import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { MapaPage } from './mapa.page';
import {RouterModule} from '@angular/router';
import {LocalizadorGPS} from '../../../core/services/LocalizadorGPS.service';
import {SharedModule} from '../../../components/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {path: '', component: MapaPage}
        ]),
        SharedModule
    ],
  declarations: [MapaPage]
})
export class MapaPageModule {}
