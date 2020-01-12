import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminToolbarComponent} from './admin-toolbar/admin-toolbar.component';
import {ListaObjetosComponent} from './lista-objetos/lista-objetos.component';
import {ModalNodosComponent} from './modal-nodos/modal-nodos.component';
import {ModalUsuariosComponent} from './modal-usuarios/modal-usuarios.component';
import {ModalRutasComponent} from './modal-rutas/modal-rutas.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [AdminToolbarComponent, ListaObjetosComponent, ModalNodosComponent, ModalUsuariosComponent, ModalRutasComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [AdminToolbarComponent, ListaObjetosComponent, ModalNodosComponent, ModalUsuariosComponent, ModalRutasComponent],
  entryComponents: [ModalNodosComponent, ModalUsuariosComponent, ModalRutasComponent]
})
export class AdminModule { }
