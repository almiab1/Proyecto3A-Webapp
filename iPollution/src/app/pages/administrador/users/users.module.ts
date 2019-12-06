import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { UsersPage } from './users.page';
import {RouterModule} from '@angular/router';

import { ModalUsuariosComponent } from './../../../components/components-admin/modal-usuarios/modal-usuarios.component';
import { AdministradorModule } from './../administrador.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {path: '', component: UsersPage}
    ]),
    AdministradorModule
  ],
  declarations: [
    UsersPage,
    ModalUsuariosComponent
  ]
})
export class UsersPageModule {}
