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
  UsersPageModule
} from './users/users.module';
import { NodosPageModule } from './nodos/nodos.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    UsersPageModule,
    NodosPageModule,
  ]
})
export class AdministradorModule {}
