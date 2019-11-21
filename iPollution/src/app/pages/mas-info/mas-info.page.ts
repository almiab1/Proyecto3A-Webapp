import {
  LogicaDeNegocioFake
} from './../../core/services/LogicaDeNegocioFake.service';
// ----------------------------
// config.page.ts
// Controlador vista mas-info
// Equipo 4
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
// ----------------------------
// Components
// ----------------------------
@Component({
  selector: 'app-mas-info',
  templateUrl: './mas-info.page.html',
  styleUrls: ['./mas-info.page.scss'],
})
// ----------------------------
// Clase MasInfoPage
// ----------------------------
export class MasInfoPage implements OnInit {

  // variable ultima medicion
  ultimaMedicion_tiempo: any;
  ultimaMedicion_latitud: any;
  ultimaMedicion_longitud: any;
  ultimaMedicion_humedad: any;
  ultimaMedicion_valorMedido: any;
  ultimaMedicion_temperatura: any;


  constructor(
    private serve: LogicaDeNegocioFake,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    // this.serve.getUltimaMedicion().subscribe(response => {
    //   console.log("GET ULTIMA MEDICION")
    //   console.log(response);
    //   this.ngZone.run(() => {
    //     this.ultimaMedicion_tiempo = response[0].tiempo;
    //     this.ultimaMedicion_latitud = response[0].latitud;
    //     this.ultimaMedicion_longitud = response[0].longitud;
    //     this.ultimaMedicion_humedad = response[0].humedad;
    //     this.ultimaMedicion_temperatura = response[0].temperatura;
    //     this.ultimaMedicion_valorMedido = response[0].valorMedido;
    //   });
    // });
    // PETICION REST ULTIMA
  //   setInterval(() => {
  //     this.serve.getUltimaMedicion().subscribe(response => {
  //       console.log("GET ULTIMA MEDICION")
  //       console.log(response);
  //       this.ngZone.run(() => {
  //         this.ultimaMedicion_tiempo = response[0].tiempo;
  //         this.ultimaMedicion_latitud = response[0].latitud;
  //         this.ultimaMedicion_longitud = response[0].longitud;
  //         this.ultimaMedicion_humedad = response[0].humedad;
  //         this.ultimaMedicion_temperatura = response[0].temperatura;
  //         this.ultimaMedicion_valorMedido = response[0].valorMedido;
  //       });
  //     });
  //   }, 10000);
  }
}