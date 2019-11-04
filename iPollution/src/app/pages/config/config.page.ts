import { Platform } from '@ionic/angular';
import { LocalizadorGPS } from './../../core/services/LocalizadorGPS.service';
import { ReceptorBLE } from './../../core/services/ReceptorBle.service';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  // Control ble
  estaActivoBle: any;
  // Elemento vista
  @ViewChild('bleToogle', {static: false}) bleToogle: ElementRef;

  constructor(
    private ble: ReceptorBLE,
    private gps: LocalizadorGPS,
    private platform: Platform,
  ) {
    if (this.platform.is('mobile')) {
      if (this.ble.estaBLEactivado()) {
        this.estaActivoBle = true;
      } else {
        this.estaActivoBle = false;
      }
    }
  }

  ngOnInit() {}

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
