import {
  LogicaDeNegocioFake
} from 'src/app/core/services/LogicaDeNegocioFake.service';
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
  ModalController,
  NavParams
} from '@ionic/angular';
import {
  Component,
  OnInit
} from '@angular/core';
// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------
@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.scss'],
})
// ----------------------------------------------------------------------------
// Class EditarUsuariosComponent
// ----------------------------------------------------------------------------
export class EditarUsuariosComponent implements OnInit {

  // Propiedades
  nombreUser: string;
  emailUsuario: string;
  telefono: string;
  tituloComponent: string;
  nodos: number;
  tipoModal: string;
  // inputs
  // nombre: string;
  // nombre: string;
  // nombre: string;
  // nombre: string;
  // nombre: string;

  // ----------------------------------------------------------------------------
  // Constructor
  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private serve: LogicaDeNegocioFake
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
  }
  // ----------------------------------------------------------------------------


  // ----------------------------------------------------------------------------
  // tipoBoton --> closeModal()
  async closeModal(tipoBoton: string) {
    const onClosedData = 'ModalCerrado';

    switch (tipoBoton) {
      case 'guardar': {
        console.log('----------Boton guardar modal------------');

        let user = {
          nombre: this.nombreUser,
          descripcion: this.tituloComponent,
          idUsuario: this.emailUsuario,
          telefono: this.telefono,
          idSensor: this.nodos,
        }
        if (this.tipoModal === 'anyadir') {
          console.log('--------------------AÑADIR USUARIO------------------------')
          console.table(user);
          // this.serve.darDeAltaUsuario(user);
        } else {
          console.log('--------------------EDITAR EDITAR------------------------')
          console.table(user);
          this.serve.editarUsuario(user);
        }

        await this.modalController.dismiss(onClosedData);
        break;
      }
      case 'eliminar': {
        console.log('----------Boton eliminar modal------------');

        let user = this.emailUsuario;
        console.log('--------------------ElIMINAR USUARIO------------------------')
        console.table(user);
        this.serve.darDeBajaUsuario(user);

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

}