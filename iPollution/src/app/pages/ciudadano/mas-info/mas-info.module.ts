import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { MasInfoPage } from './mas-info.page';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../../components/shared/shared.module';
import { MedidasOficialesComponent } from 'src/app/components/medidas-oficiales/medidas-oficiales.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {path: '', component: MasInfoPage}
        ]),
        SharedModule
    ],
  declarations: [MasInfoPage, MedidasOficialesComponent]
})
export class MasInfoPageModule {}
