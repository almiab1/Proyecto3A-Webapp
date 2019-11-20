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
import { LogicaDeNegocioFake } from 'src/app/core/services/LogicaDeNegocioFake.service';
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
    this.users = this.serve.getUsuarios();
    this.usersFiltrados = this.users;
  }
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
  async openModal(titulo: string, nombre: string, email: string, telefono: string, nodos: number) {
    const modal = await this.modalController.create({
      component: EditarUsuariosComponent,
      componentProps: {
        titulo,
        nombre,
        email,
        telefono,
        nodos,
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
