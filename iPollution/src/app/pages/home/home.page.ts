// ----------------------------
// home.page.ts
// Controlador vista home
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import {
  LogicaDeNegocioFake
} from './../../core/services/LogicaDeNegocioFake.service';
import {
  Component
} from '@angular/core';
import {
  Platform
} from '@ionic/angular';
import {
  ReceptorBLE
} from '../../core/services/ReceptorBle.service';
// ----------------------------
// Components
// ----------------------------
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
// ----------------------------
// Clase HomePage
// ----------------------------
export class HomePage {

  constructor(
    public platform: Platform,
    private ble: ReceptorBLE,
    private serve: LogicaDeNegocioFake,
  ) {
    if (this.platform.is('mobile')) {
      // ACTUALIZAR DATOS
      setInterval(() => {
        this.hayQueActualizarMedicionesYEnviarlasAlServidor();
      }, 10000);
    }
  }

  ngOnInit = () => {
    // INICIALIZAR BLE
    // this.ble.inizializar();
  }

  ionViewDidEnter = () => {
    if (this.platform.is('mobile')) {
      this.ble.inizializar();
    }
  }

  // --------------------------------------------------------
  // hayQueActualizarMedicionesYEnviarlasAlServidor()
  // --------------------------------------------------------
  hayQueActualizarMedicionesYEnviarlasAlServidor() {
    const medicion = this.ble.obtenerO3();

    console.log('----------------GUARDAR MEDIDA----------------');
    // tslint:disable-next-line: max-line-length
    if (medicion.valorMedido == -1 || medicion.humedad == -1 || medicion.temperatura == -1) {
      console.log('Medicion erronea');
    } else {
      this.serve.guardarMedida(medicion);
    }

    // --------------------------------------------------------
  }

}