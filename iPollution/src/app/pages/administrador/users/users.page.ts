// ----------------------------------------------------------------------------
// users.page.ts
// Controlador page users
// Equipo 4
// Alejandro Mira Abad
// CopyRight
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------
import { Component, OnInit, NgZone } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { ModalUsuariosComponent } from '../../../components/admin/modal-usuarios/modal-usuarios.component';
import { ModalRutasComponent } from '../../../components/admin/modal-rutas/modal-rutas.component';
import { LogicaDeNegocioFake } from 'src/app/core/services/LogicaDeNegocioFake.service';
// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
// ----------------------------------------------------------------------------
// Class UsersPage
// ----------------------------------------------------------------------------
export class UsersPage implements OnInit {

  // Propiedades
  dataReturned: any;
  public users: any[];
  public usersFiltrados: any[];
  actividades: any[];
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
    this.serve.getUsuarios().subscribe(
      res => {
        this.users = res;
        this.usersFiltrados = this.users;
      },
      err => console.log(err),
    )
    this.calcularDistancia();
  }
  // ----------------------------------------------------------------------------
  ionViewWillEnter() {
    this.serve.getUsuarios().subscribe(
      res => {
        this.users = res;
        this.usersFiltrados = this.users;
      },
      err => console.log(err),
    )
  }

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
  // ----------------------------------------------------------------------------
  async openModal(data, tipo) {

    let titulo;
    let nombre;
    let email;
    let telefono;
    let nodos;
    let tipoModal =  tipo;

    if (data != undefined) {
      titulo = data.descripcion;
      nombre = data.nombre;
      email = data.idUsuario;
      telefono = data.telefono;
      nodos = data.idSensor;
    } else {
      titulo = 'Añadir Usuario';
      nombre = '';
      email = '';
      telefono = '';
      nodos = '';
    }
    const modal = await this.modalController.create({
      component: ModalUsuariosComponent,
      componentProps: {
        titulo,
        nombre,
        email,
        telefono,
        nodos,
        tipoModal
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        // alert('Modal Sent Data :'+ dataReturned);
      }
      this.serve.getUsuarios().subscribe(
        res => {
          this.users = res;
          this.usersFiltrados = this.users;
        },
        err => console.log(err),
      )
    });

    return await modal.present();
  }

  // ----------------------------------------------------------------------------
  // openModal()
  // ----------------------------------------------------------------------------
  async openModalRutas(data, tipo) {

    let titulo =  data;
    let tipoModal =  tipo;

    const modal = await this.modalController.create({
      component: ModalRutasComponent,
      componentProps: {
        titulo,
        tipoModal
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

  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------

  async calcularDistancia() {

    this.serve.getUsuarios().subscribe(
      res => {
        const listaUsers = res;
        let lista = [];

        for (let index = 0; index < listaUsers.length; index++) {
          const idUsuario = listaUsers[index].idUsuario;
          this.serve.getDistanciaUsuario(idUsuario).subscribe(response => {
            lista[index] = response.actividad;
          });
        }
        this.actividades = lista;
      }
    );
  }

}

