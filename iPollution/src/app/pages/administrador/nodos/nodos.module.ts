import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { NodosPage } from './nodos.page';
import {Router, RouterModule} from '@angular/router';
import {SharedModule} from '../../../components/shared/shared.module';

import { AdministradorModule } from './../administrador.module';
import { ModalNodosComponent } from 'src/app/components/components-admin/modal-nodos/modal-nodos.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {path: '', component: NodosPage}
        ]),
        SharedModule
    ],
  declarations: [NodosPage]
})
export class NodosPageModule {}