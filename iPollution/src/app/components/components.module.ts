import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { NodosComponent } from './nodos/nodos.component';

const PAGES_COMPONENTS = [
  UsuariosComponent,
  NodosComponent,
];

@NgModule({
  declarations: [PAGES_COMPONENTS],
  imports: [
    CommonModule
  ],
  exports: [PAGES_COMPONENTS]
})
export class ComponentsModule { }
