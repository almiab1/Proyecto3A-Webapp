import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ConfiguracionPage } from './configuracion.page';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../components/shared/shared.module';
import {BasureroModule} from '../basurero.module';
import {ConfigModule} from '../../../components/config/config.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {path: '', component: ConfiguracionPage}
        ]),
        SharedModule,
        ConfigModule
    ],
  declarations: [ConfiguracionPage]
})
export class ConfiguracionPageModule {}
