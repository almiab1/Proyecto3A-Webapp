import {
  LogicaDeNegocioFake
} from 'src/app/core/services/LogicaDeNegocioFake.service';
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
import {
  Component,
  OnInit
} from '@angular/core';
import {
  EditarComponent
} from './../editar/editar.component';
import {
  ModalController,
  Platform
} from '@ionic/angular';
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
  ) {}
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {
    this.serve.getNodos().then(
      res => this.nodos = res,
      err => console.log(err)
    )
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
  // titulo,nombreNodo,tipoNodo,openModal()
  async openModal(data) {

    let titulo;
    let nombreNodo;
    let tipoNodo;
    let usuarioNodo;

    if (data != undefined) {
      titulo = 'Nodo ' + data.idSensor;
      nombreNodo = 'Nodo ' + data.idSensor;
      tipoNodo = data.descripcion;
      usuarioNodo = data.idUsuario;
    } else {
      titulo = 'Añadir Nodo ';
      nombreNodo = '';
      tipoNodo = '';
      usuarioNodo = '';
    }

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