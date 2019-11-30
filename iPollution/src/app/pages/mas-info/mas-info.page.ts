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
import { create } from 'domain';
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
  totalMedidas: Int16Array;


  constructor(
    private serve: LogicaDeNegocioFake,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {


    // obtener las medidas oficiales de la estación de Gandia y mostrar las dos más recientes y luego una gráfica con todas
    this.serve.getMedidasOficiales().subscribe(response => {
      console.log('GET MedidasOficiales');
      console.log(response);

      this.totalMedidas = response.length;
      console.log('totalMedidas: ' + this.totalMedidas);


      this.createSimpleLineChart(response,this.totalMedidas);





      this.ngZone.run(() => {
        console.log(response);
        // Registra los valores en una variable que luego enseñará
        this.tiempo = response[response.length - 1].hora;
        this.ozono = response[response.length - 1].o3;
        console.log(response.length);
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

        this.createSimpleLineChart(response, this.totalMedidas);


        this.ngZone.run(() => {
          // Registra los valores en una variable que luego enseñará
          console.log('Aqui guardo los valores de medidas oficiales');
          // rellenamos todos los valores de ozono
         // this.createSimpleLineChart(response);
        });
      });
    }, 10000);


  }


  createSimpleLineChart(response, totalMedidas) {
    console.log('la respuesta es: ' + response);
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        // tslint:disable-next-line: max-line-length
        labels: [response[totalMedidas - 1].hora, response[totalMedidas - 2].hora, response[totalMedidas - 3].hora, response[totalMedidas - 4].hora, response[totalMedidas - 5].hora, response[totalMedidas - 6].hora],
        datasets: [{
          label: 'Ozono',
          // tslint:disable-next-line:max-line-length
          data: [response[totalMedidas - 1].o3, response[totalMedidas - 2].o3, response[totalMedidas - 3].o3, response[totalMedidas - 4].o3, response[totalMedidas - 5].o3, response[totalMedidas - 6].o3],
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
  }

}
