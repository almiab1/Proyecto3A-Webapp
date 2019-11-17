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
  public users: any;
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
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {}
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
