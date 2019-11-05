// ----------------------------
// config.page.ts
// Controlador vista configuracion
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import {
  Platform
} from '@ionic/angular';
import {
  LocalizadorGPS
} from './../../core/services/LocalizadorGPS.service';
import {
  ReceptorBLE
} from './../../core/services/ReceptorBle.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
// ----------------------------
// Component
// ----------------------------
@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
// ----------------------------
// Clase ConfigPage
// ----------------------------
export class ConfigPage implements OnInit {

  // Control ble
  estaActivoBle: any;
  // Elemento vista
  @ViewChild('bleToogle', {
    static: false
  }) bleToogle: ElementRef;

  // ----------------------------
  // Constructor
  // ----------------------------
  constructor(
    private ble: ReceptorBLE,
    private gps: LocalizadorGPS,
    private platform: Platform,
  ) {
    // if (this.platform.is('mobile')) {
    //   if (this.ble.estaBLEactivado()) {
    //     this.estaActivoBle = true;
    //   } else {
    //     this.estaActivoBle = false;
    //   }
    // }
  }

  ngOnInit() {}

  // ----------------------------
  // Metodo controlador toogle
  // ----------------------------
  bleControl(e) {
    /*if (this.estaActivoBle === true) {
      this.ble.activarBLE();
      // this.estaActivoBle = true;
    } else {
      this.ble.desactivarBLE();
      // this.estaActivoBle = false;
    }*/
  }

}