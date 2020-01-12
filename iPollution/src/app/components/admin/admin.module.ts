import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminToolbarComponent} from './admin-toolbar/admin-toolbar.component';
import {ListaObjetosComponent} from './lista-objetos/lista-objetos.component';
import {ModalNodosComponent} from './modal-nodos/modal-nodos.component';
import {ModalUsuariosComponent} from './modal-usuarios/modal-usuarios.component';
import {ModalRutasComponent} from './modal-rutas/modal-rutas.component';
import {ModalRutasRealizadasComponent} from './modal-rutas-realizadas/modal-rutas-realizadas.component';

import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AdminToolbarComponent,
    ListaObjetosComponent,
    ModalNodosComponent,
    ModalUsuariosComponent,
    ModalRutasComponent,
    ModalRutasRealizadasComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    AdminToolbarComponent,
    ListaObjetosComponent,
    ModalNodosComponent,
    ModalUsuariosComponent,
    ModalRutasComponent,
    ModalRutasRealizadasComponent
  ],
  entryComponents: [ModalNodosComponent, ModalUsuariosComponent, ModalRutasComponent, ModalRutasRealizadasComponent]
})
export class AdminModule { }
