// ----------------------------------------------------------------------------
// editar-usuarios.component.ts
// Controlador modal editar usuarios
// Equipo 4
// Alejandro Mira Abad
// CopyRight
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------
import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
import {
  LogicaDeNegocioFake
} from 'src/app/core/services/LogicaDeNegocioFake.service';
import {
  ModalController,
  NavParams,
} from '@ionic/angular';
import { ModalRutasRealizadasComponent } from '../../../components/admin/modal-rutas-realizadas/modal-rutas-realizadas.component';
// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-modal-usuarios',
  templateUrl: './modal-usuarios.component.html',
  styleUrls: ['./modal-usuarios.component.scss'],
})
// ----------------------------------------------------------------------------
// Class ModalUsuariosComponent
// ----------------------------------------------------------------------------
export class ModalUsuariosComponent implements OnInit {

  // Propiedades
  nombreUser: string;
  emailUsuario: string;
  telefono: string;
  tituloComponent: string;
  nodos: number;
  tipoModal: string;
  contrasenya: any;
  tipoUsuario: string;
  distancia: any;
  actividad: any;

  // Modal
  dataReturned: any;

  // ----------------------------------------------------------------------------
  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private serve: LogicaDeNegocioFake,
    private ngZone: NgZone
  ) {}
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // ngOnInit()
  ngOnInit() {
    console.table(this.navParams);
    // tslint:disable-next-line: radix
    this.emailUsuario = this.navParams.data.email;
    this.nombreUser = this.navParams.data.nombre;
    this.telefono = this.navParams.data.telefono;
    this.tituloComponent = this.navParams.data.titulo;
    this.nodos = this.navParams.data.nodos;
    this.tipoModal = this.navParams.data.tipoModal;
    this.calcularDistancia();
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // radioGroupChange()
  // ----------------------------------------------------------------------------
  radioGroupChange(event) {
    this.tipoUsuario = event.detail.value;
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // tipoBoton --> closeModal()
  async closeModal(tipoBoton: string) {
    const onClosedData = 'ModalCerrado';

    const user = {
      nombre: this.nombreUser,
      idTipoUsuario: this.tipoUsuario,
      idUsuario: this.emailUsuario,
      telefono: this.telefono,
      idSensor: this.nodos,
      contrasenya: this.contrasenya
    };

    switch (tipoBoton) {
      case 'guardar': {
        console.log('----------Boton guardar modal------------');

        this.serve.darDeAltaUsuario(user);

        await this.modalController.dismiss(onClosedData);
        break;
      }
      case 'eliminar': {
        console.log('----------Boton eliminar modal------------');
        console.table(user);
        this.serve.darDeBajaUsuario(user.idUsuario);
        console.log('--------------------ElIMINAR USUARIO------------------------');

        await this.modalController.dismiss(onClosedData);
        break;
      }
      default: {
        console.log('----------Default------------');

        await this.modalController.dismiss(onClosedData);
        break;
      }
    }
  }
  // ----------------------------------------------------------------------------

  async calcularDistancia() {

    const idUsuario = this.emailUsuario;

    this.serve.getDistanciaUsuario(idUsuario).subscribe(response => {
      this.ngZone.run(() => {
          this.distancia = response.distancia;
          this.actividad = response.actividad;
        });
    });
  }
  // ----------------------------------------------------------------------------

  // ----------------------------------------------------------------------------
  // openModal()
  // ----------------------------------------------------------------------------
  async openModalRutas() {

    let nombreUser = this.nombreUser;
    let idUsuario =  this.emailUsuario;

    const modal = await this.modalController.create({
      component: ModalRutasRealizadasComponent,
      componentProps: {
        nombreUser,
        idUsuario
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
}
