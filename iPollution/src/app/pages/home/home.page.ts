import { LogicaDeNegocioFake } from './../../core/services/LogicaDeNegocioFake.service';
import { ReceptorBLE } from './../../core/services/ReceptorBle.service';
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public platform: Platform,
    private ble: ReceptorBLE,
    private serve: LogicaDeNegocioFake,
    ) {
    // INICIALIZAR BLE
    this.ble.inizializar();
    // ACTUALIZAR DATOS
    setInterval(() => {
      this.hayQueActualizarMedicionesYEnviarlasAlServidor();
     }, 5000);
  }

  hayQueActualizarMedicionesYEnviarlasAlServidor() {
    const medicion = this.ble.obtenerO3();

    // PETICION REST ULTIMA
    let ultimaMedicion: any;
    // this.serve.getUltimaMedicion().subscribe(response => {
    //   console.log("GET ULTIMA MEDICION")
    //   console.log(response);
    // });
    console.log("LLAMAR GUARDAR MEDIDA");
    this.serve.guardarMedida(medicion).subscribe(data => {console.log(data); });

  }

}