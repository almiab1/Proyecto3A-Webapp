// ----------------------------------------------------------------------------
// usuarios.component.ts
// Controlador modal usuarios
// Equipo 4
// Alejandro Mira Abad
// CopyRight
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { EditarUsuariosComponent } from './../editar-usuarios/editar-usuarios.component';
// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
// ----------------------------------------------------------------------------
// Class UsuariosComponent
// ----------------------------------------------------------------------------
export class UsuariosComponent implements OnInit {

  // Propiedades
  dataReturned: any;
  public users: any[];
  public usersFiltrados: any[];
  // ----------------------------------------------------------------------------

  aa = [{
      nombre: 'Santiago Moreno',
      email: '1234@5678.com',
      nodos: 'nodo01'
    },
    {
      nombre: 'Juan Pedro Rico',
      email: '1234@5678.com',
      nodos: 'nodo02'
    },
    {
      nombre: 'Antonio Fernandez',
      email: '1234@5678.com',
      nodos: 'nodo03'
    },
  ];
  // ----------------------------------------------------------------------------
  // Contructor
  constructor(
    public modalController: ModalController,
    public platform: Platform,
  ) {
    this.users = this.aa;
    this.usersFiltrados = this.aa;
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {}
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // Search Bar controler
  // initializeItems()
  initializeItems(): void {
    this.users = this.usersFiltrados;
  }
  // filterList()
  filterList(evt) {
    this.initializeItems();

    const usuarioBuscado = evt.srcElement.value;

    if (!usuarioBuscado) {
      return;
    }

    this.users = this.users.filter(userDeseado => {
      if (userDeseado.nombre && usuarioBuscado) {
        if (userDeseado.nombre.toLowerCase().indexOf(usuarioBuscado.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // openModal()
  async openModal(titulo: string, nombre: string, email: string, nodos: string) {
    const modal = await this.modalController.create({
      component: EditarUsuariosComponent,
      componentProps: {
        titulo,
        nombre,
        email,
        nodos
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
