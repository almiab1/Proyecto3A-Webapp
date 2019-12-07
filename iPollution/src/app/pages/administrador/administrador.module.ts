import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

import {
  AdministradorRoutingModule
} from './administrador-routing.module';
import {
  UsersPage
} from './users/users.page';
import {
  UsersPageModule
} from './users/users.module';
import { NodosPageModule } from './nodos/nodos.module';
import { TolBarAdminComponent } from './../../components/components-admin/tol-bar-admin/tol-bar-admin.component';
import { ListaObjetosComponent } from './../../components/components-admin/lista-objetos/lista-objetos.component';

@NgModule({
  declarations: [TolBarAdminComponent, ListaObjetosComponent],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    UsersPageModule,
    NodosPageModule,
  ]
})
export class AdministradorModule {}