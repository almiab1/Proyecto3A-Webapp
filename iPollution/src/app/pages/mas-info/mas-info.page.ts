import {
  LogicaDeNegocioFake
} from './../../core/services/LogicaDeNegocioFake.service';
import { ViewChild, ElementRef } from '@angular/core';
// npm install chart.js --save
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
  @ViewChild('lineChart', {static: true}) lineCanvas: ElementRef;



  medidas: any;
  tiempo: any[];
  ozono: any[];
  lineChart: Chart;


  constructor(
    private serve: LogicaDeNegocioFake,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {


    // obtener las medidas oficiales de la estación de Gandia y mostrar las dos más recientes y luego una gráfica con todas
    this.serve.getMedidasOficiales().subscribe(response => {
      console.log('GET MedidasOficiales');
      console.log(response);

      this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [response[1].hora, response[2].hora, response[3].hora, response[4].hora, response[5].hora, response[6].hora],
        datasets: [{
          label: 'Ozono',
          data: [response[1].o3, response[2].o3, response[3].o3, response[4].o3, response[5].o3, response[6].o3],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(0,150,136)',
          borderWidth: 4
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });




      this.ngZone.run(() => {
        console.log(response);
        // Registra los valores en una variable que luego enseñará
        this.tiempo = response[response.length - 1].hora;
        this.ozono = response[response.length - 1].o3;
        console.log('Aqui guardo los valores de medidas oficiales');
        // rellenamos todos los valores de ozono
       // this.createSimpleLineChart(response);
      });
    });
    // PETICION REST ULTIMA
    setInterval(() => {
      this.serve.getMedidasOficiales().subscribe(response => {
        console.log('GET MedidasOficiales');
        console.log(response);

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [response[1].hora, response[2].hora, response[3].hora, response[4].hora, response[5].hora, response[6].hora],
        datasets: [{
          label: 'Ozono',
          data: [response[1].o3, response[2].o3, response[3].o3, response[4].o3, response[5].o3, response[6].o3],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(0,150,136)',
          borderWidth: 4
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });


        this.ngZone.run(() => {
          // Registra los valores en una variable que luego enseñará
          console.log('Aqui guardo los valores de medidas oficiales');
          // rellenamos todos los valores de ozono
         // this.createSimpleLineChart(response);
        });
      });
    }, 10000);


  }


  createSimpleLineChart(response) {
    console.log('la respuesta es: ' + response);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [response[14].hora, response[15].hora, response[16].hora, response[17].hora, response[18].hora, response[19].hora],
        datasets: [{
          label: 'Ozono',
          data: [response[14].o3, response[15].o3, response[16].o3, response[17].o3, response[18].o3, response[19].o3],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(0,150,136)',
          borderWidth: 4
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
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
  */
}
