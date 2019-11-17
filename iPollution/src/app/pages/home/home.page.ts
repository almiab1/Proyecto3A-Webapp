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
  ReceptorBLE
} from './../../core/services/ReceptorBle.service';
import {
  Component
} from '@angular/core';
import {
  Platform
} from '@ionic/angular';
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
    // ACTUALIZAR DATOS
    setInterval(() => {
      this.hayQueActualizarMedicionesYEnviarlasAlServidor();
    }, 10000);
  }

  ngOnInit = () => {
    // INICIALIZAR BLE
    this.ble.inizializar();
  }
  // --------------------------------------------------------
  // hayQueActualizarMedicionesYEnviarlasAlServidor()
  // --------------------------------------------------------
  hayQueActualizarMedicionesYEnviarlasAlServidor() {
    const medicion = this.ble.obtenerO3();

    console.log('----------------LLAMAR GUARDAR MEDIDA----------------');
    this.serve.guardarMedida(medicion);

    // --------------------------------------------------------

  }

}
