// ----------------------------------------------------------------------------
// nodos.page.ts
// Controlador page nodos
// Equipo 4
// Alejandro Mira Abad
// CopyRight
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  Platform
} from '@ionic/angular';
import {
  LogicaDeNegocioFake
} from 'src/app/core/services/LogicaDeNegocioFake.service';
import { ModalNodosComponent } from '../../../components/admin/modal-nodos/modal-nodos.component';

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-nodos',
  templateUrl: './nodos.page.html',
  styleUrls: ['./nodos.page.scss'],
})
// ----------------------------------------------------------------------------
// Class NodosPage
// ----------------------------------------------------------------------------
export class NodosPage implements OnInit {

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
    // this.serve.getNodos().subscribe(
    //   res => {
    //     this.nodos = res;
    //     this.nodoFiltrados = this.nodos;
    //   },
    //   err => console.log(err),
    // )
  }
  // ----------------------------------------------------------------------------
  ionViewWillEnter() {
    this.serve.getNodos().subscribe(
      res => {
        this.nodos = res;
        this.nodoFiltrados = this.nodos;
      },
      err => console.log(err),
    )
  }

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
      let nodoDeseado1 = 'Nodo ' + nodoDeseado.idSensor;
      if (nodoDeseado1 && nodoBuscado) {
        if (nodoDeseado1.toLowerCase().indexOf(nodoBuscado.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // titulo,nombreNodo,tipoNodo,openModal()
  async openModal(data, tipo) {

    let titulo;
    let nombreNodo;
    let tipoNodo;
    let usuarioNodo;
    let tipoModal;

    if (data != undefined) {
      titulo = 'Nodo' + data.idSensor;
      nombreNodo = data.idSensor;
      tipoNodo = data.descripcion;
      usuarioNodo = data.idUsuario;
      tipoModal = tipo;
    } else {
      titulo = 'Añadir Nodo ';
      nombreNodo = '';
      tipoNodo = '';
      usuarioNodo = '';
      tipoModal = tipo;
    }

    const modal = await this.modalController.create({
      component: ModalNodosComponent,
      componentProps: {
        titulo,
        nombreNodo,
        tipoNodo,
        usuarioNodo,
        tipoModal
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        // alert('Modal Sent Data :'+ dataReturned);
      }
      this.serve.getNodos().subscribe(
        res => {
          this.nodos = res;
          this.nodoFiltrados = this.nodos;
        },
        err => console.log(err),
      )
    });

    return await modal.present();
  }

}