import {
  LogicaDeNegocioFake
} from './../../core/services/LogicaDeNegocioFake.service';
import {  ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
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


  medidas: any;
  tiempo: any[];
  ozono: any[];

  @ViewChild('lineCanvas', {static: false}) lineCanvas;

  constructor(
    private serve: LogicaDeNegocioFake,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.serve.getMedidasOficiales().subscribe(response => {
      console.log('GET MedidasOficiales');
      console.log(response);
      this.ngZone.run(() => {
        // Registra los valores en una variable que luego enseñará
        this.tiempo = response[0].hora;
        this.ozono = response[3].o3;
        console.log('la hora es:' + this.tiempo);
        console.log('el ozono es:' + this.ozono);
        console.log('Aqui guardo los valores de medidas oficiales');
      });
    });
    // PETICION REST ULTIMA
    setInterval(() => {
      this.serve.getMedidasOficiales().subscribe(response => {
        console.log('GET MedidasOficiales');
        console.log(response);
        this.ngZone.run(() => {
          // Registra los valores en una variable que luego enseñará
          console.log('Aqui guardo los valores de medidas oficiales');
        });
      });
    }, 10000);


  }


/*
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
    this.serve.getUltimaMedicion().subscribe(response => {
      console.log("GET ULTIMA MEDICION")
      console.log(response);
      this.ngZone.run(() => {
        this.ultimaMedicion_tiempo = response[0].tiempo;
        this.ultimaMedicion_latitud = response[0].latitud;
        this.ultimaMedicion_longitud = response[0].longitud;
        this.ultimaMedicion_humedad = response[0].humedad;
        this.ultimaMedicion_temperatura = response[0].temperatura;
        this.ultimaMedicion_valorMedido = response[0].valorMedido;
      });
    });
    // PETICION REST ULTIMA
    setInterval(() => {
      this.serve.getUltimaMedicion().subscribe(response => {
        console.log("GET ULTIMA MEDICION")
        console.log(response);
        this.ngZone.run(() => {
          this.ultimaMedicion_tiempo = response[0].tiempo;
          this.ultimaMedicion_latitud = response[0].latitud;
          this.ultimaMedicion_longitud = response[0].longitud;
          this.ultimaMedicion_humedad = response[0].humedad;
          this.ultimaMedicion_temperatura = response[0].temperatura;
          this.ultimaMedicion_valorMedido = response[0].valorMedido;
        });
      });
    }, 10000);
  }
  */
}
