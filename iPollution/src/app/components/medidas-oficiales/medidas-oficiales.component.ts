import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  LogicaDeNegocioFake
} from './../../core/services/LogicaDeNegocioFake.service';
import { ViewChild, ElementRef } from '@angular/core';
// npm install chart.js --save
import { Chart } from 'chart.js';

  // ----------------------------
  // Includes
  // ----------------------------
  import {
    NgZone
  } from '@angular/core';

@Component({
  selector: 'app-medidas-oficiales',
  templateUrl: './medidas-oficiales.component.html',
  styleUrls: ['./medidas-oficiales.component.scss'],
})
export class MedidasOficialesComponent implements OnInit {
  @ViewChild('lineChart', {static: true}) lineChart;



  medidas: any;
  tiempo: any[];
  ozono: any[];


  constructor(
    private serve: LogicaDeNegocioFake,
    private ngZone: NgZone,
    private platform: Platform,
  ) {}

  ngOnInit() {
    this.serve.getMedidasOficiales().subscribe(response => {
      console.log('GET MedidasOficiales');
      console.log(response);
        this.ngZone.run(() => {
        console.log(response)
        // Registra los valores en una variable que luego enseñará
        this.tiempo = response[response.length - 1].hora;
        this.ozono = response[response.length - 1].o3;
        console.log('Aqui guardo los valores de medidas oficiales');

        // * fill the chart with the oficial data *
        if (this.platform.is('ios')) {
          this.crearChartParaMovil(response);
         }
         if(this.platform.is('android')){
           this.crearChartParaMovil(response);
         }
         if(this.platform.is('desktop')){
           this.crearChartParaDesktop(response);
         }
        // /fill the chart
      });
    });
    // PETICION REST ULTIMA
    // * do the thing above every 10 seconds *
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
    // /setInterval


  }

  // ------------------------------------------------------------------
  //  * Creates a chart with the data of the response *
  //  response: json ->
  //  crearChartParaDesktop()
  // ------------------------------------------------------------------
  crearChartParaDesktop(response: any) {
    
    this.lineChart = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: [response[response.length - 8].hora, response[response.length - 7].hora, response[response.length - 6].hora, response[response.length - 5].hora, response[response.length - 4].hora, response[response.length - 3].hora,response[response.length - 2].hora,response[response.length - 1].hora],
        datasets: [{
          label: 'Ozono',
          data: [response[response.length - 8].o3, response[response.length - 7].o3, response[response.length - 6].o3, response[response.length - 5].o3, response[response.length - 4].o3, response[response.length - 3].o3, response[response.length - 2].o3, response[response.length - 1].o3],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(0,150,136)',
          borderWidth: 2
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
  } // crearChartparaDesktop
  

  // ------------------------------------------------------------------
  //  * Creates a chart with the data of the response *
  //  response: json ->
  //  crearChartParaMovil()
  // ------------------------------------------------------------------
  crearChartParaMovil(response: any) {
    this.lineChart = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: [response[response.length - 6].hora, response[response.length - 5].hora, response[response.length - 4].hora, response[response.length - 3].hora, response[response.length - 2].hora, response[response.length - 1].hora],
        datasets: [{
          label: 'Ozono',
          data: [response[response.length - 6].o3, response[response.length - 5].o3, response[response.length - 4].o3, response[response.length - 3].o3, response[response.length - 2].o3, response[response.length - 1].o3],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(0,150,136)',
          borderWidth: 2
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
  } // crearChartParaMovil

}
