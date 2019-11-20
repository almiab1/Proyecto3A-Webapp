import { LogicaDeNegocioFake } from 'src/app/core/services/LogicaDeNegocioFake.service';
// ----------------------------------------------------------------------------
// nodos.component.ts
// Controlador modal nodos
// Equipo 4
// Alejandro Mira Abad
// CopyRight
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { EditarComponent } from './../editar/editar.component';
import { ModalController, Platform } from '@ionic/angular';
// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-nodos',
  templateUrl: './nodos.component.html',
  styleUrls: ['./nodos.component.scss'],
})
// ----------------------------------------------------------------------------
// Class NodosComponent
// ----------------------------------------------------------------------------
export class NodosComponent implements OnInit {
  // Propiedades
  dataReturned: any;
  public nodos: any[];
  public nodoFiltrados: any[];
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // Contructor
  constructor(
    public modalController: ModalController,
    public platform: Platform,
    public serve: LogicaDeNegocioFake,
  ) {
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {
    this.nodos = this.serve.getNodos();
    this.nodoFiltrados = this.nodos;
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // Search Bar controler
  // initializeItems()
  initializeItems(): void {
    this.nodos = this.nodoFiltrados;
  }
  // filterList()
  filterList(evt) {
    this.initializeItems();

    const nodoBuscado = evt.srcElement.value;

    if (!nodoBuscado) {
      return;
    }

    this.nodos = this.nodos.filter(nodoDeseado => {
      if (nodoDeseado.nombre && nodoBuscado) {
        if (nodoDeseado.nombre.toLowerCase().indexOf(nodoBuscado.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // openModal()
  async openModal(titulo: string, nombreNodo: string, tipoNodo: string, usuarioNodo: string) {
    const modal = await this.modalController.create({
      component: EditarComponent,
      componentProps: {
        titulo,
        nombreNodo,
        tipoNodo,
        usuarioNodo
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        // alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

}
