import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { EscanerPage } from './escaner.page';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../components/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {path: '', component: EscanerPage}
        ]),
        SharedModule
    ],
  declarations: [EscanerPage]
})
export class EscanerPageModule {}
