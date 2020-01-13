import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MapaService} from '../../../core/services/Mapa.service';
import {LocalizadorGPS} from '../../../core/services/LocalizadorGPS.service';
import {LogicaDeNegocioFake} from '../../../core/services/LogicaDeNegocioFake.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})

// ----------------------------------------------------------------------------------------------
// Class MapaPage
// ----------------------------------------------------------------------------------------------
export class MapaPage implements OnInit {
  mapa: MapaService;
  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;
  currentLocation: any = {
    lat: 0,
    long: 0
  };

// ----------------------------------------------------------------------------------------------
// Constructor
// ----------------------------------------------------------------------------------------------
  constructor(private geolocation: LocalizadorGPS,
              private server: LogicaDeNegocioFake) { }

  ngOnInit() {
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit(): void {
    this.geolocation.obtenerMiPosicionGPS().then((resp) => {
      this.currentLocation.lat = resp.lat;
      this.currentLocation.long = resp.long;

      // Genera el objeto mapa
      this.mapa = new MapaService({
        lat: resp.lat,
        lng: resp.long
      }, {
        zoom: 15
      }, this.mapElement.nativeElement);


      // Añade un marcador en mi posición actual
      this.mapa.anyadirMarcador(
          'Posicion Actual', {
            lat: this.currentLocation.lat,
            lng: this.currentLocation.long
          }, 'assets/icon/gpsIcon.svg'
      );

      // Añade un marcador en la posición de la estación oficial
      const estacionOficial = this.mapa.anyadirMarcador(
          'Estacion Oficial', {
            lat: 38.966754,
            lng: -0.185648
          }, 'assets/icon/courthouse.svg'
      );

      // Div que aparece al tapear el icono de la estacióbn
      const contenido = '<div align="center"><img src="assets/estacion_oficial.png" width="270" heigth="195"></div>' +
          '<br>' +
          '<p>Estación oficial de la red de vigilancia y control de la</p>' +
          '<p>contaminación atmosférica(RVVCCA) situada en Gandia</p>' +
          '<br>' +
          '<style type="text/css">' +
          '.tg  {border-collapse:collapse;border-spacing:0;border-color:#bbb;}' +
          // tslint:disable-next-line: max-line-length
          '.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#bbb;color:#594F4F;background-color:#E0FFEB;}' +
          // tslint:disable-next-line: max-line-length
          '.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:#bbb;color:#493F3F;background-color:#9DE0AD;}' +
          '.tg .tg-996f{background-color:#C2FFD6;border-color:inherit;text-align:center;vertical-align:top}' +
          '.tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}' +
          '.tg .tg-wjr8{background-color:#9de0ad;border-color:inherit;text-align:center;vertical-align:top}' +
          '.tg .tg-3xi5{background-color:#ffffff;border-color:inherit;text-align:center;vertical-align:top}' +
          '</style>' +
          '<div align="center">' +
          '<table class="tg">' +
          ' <tr>' +
          '<th class="tg-baqh"><span style="font-weight:bold">GAS</span></th>' +
          '<th class="tg-baqh"><span style="font-weight:bold">Valor</span></th>' +
          '<th class="tg-baqh"><span style="font-weight:bold">Contaminación</span></th>' +
          '<th class="tg-baqh"><span style="font-weight:bold">Calidad</span></th>' +
          '</tr>' +
          '<tr>' +
          '<td class="tg-baqh">O3</td>' +
          '<td class="tg-baqh">35</td>' +
          '<td class="tg-baqh">MUY BAJA</td>' +
          '<td class="tg-baqh">EXCELENTE</td>' +
          '</tr>' +
          '</table>' +
          '</div>' +
          '<br>' +
          '<div><a href="/mas-info">Ver más</a></div>';

      this.mapa.anyadirInformacionMarcador(estacionOficial, contenido);

      // Genero la capa donde pondre las medidas de ozono
      this.mapa.anyadirCapa({
        nombre: 'o3',
        disipado: true, // Escalado del aspecto de los puntos en funcion del zoom
        radio: 70, // Radio de influencia de cada punto en pixeles sobre el mapa
        maxIntensidad: 1500 // Valor en el cual el color es máximo
      });

      // Capa con las medidas de CO
      this.mapa.anyadirCapa({
        nombre: 'co',
        disipado: true,
        radio: 90,
        maxIntensidad: 1000
      });

      // Capa con las medidas de SO2
      this.mapa.anyadirCapa({
        nombre: 'so2',
        disipado: true,
        radio: 60,
        maxIntensidad: 800
      });

      // Pido las medidas al servidor y por cada una la añado a la capa de ozono en este caso

      try {
        this.server.getAllMedidas().toPromise().then(data => {
          for (const medida of data) {
            this.mapa.anyadirMedicion('o3', medida);
          }
        });
      } catch (erro) {
        console.error('Error Mapa: ' + erro);
      }
      const medidasCo = [{
        latitud: 39.000466,
        longitud: -0.165349,
        valorMedido: 320
      }, {
        latitud: 39.002577,
        longitud: -0.161285,
        valorMedido: 500
      }, {
        latitud: 38.999102,
        longitud: -0.160547,
        valorMedido: 703
      }];
      const medidasSo2 = [{
        latitud: 39.007554,
        longitud: -0.166646,
        valorMedido: 620
      }, {
        latitud: 39.009055,
        longitud: -0.167912,
        valorMedido: 130
      }, {
        latitud: 39.007703,
        longitud: -0.168824,
        valorMedido: 270
      }];


      // Añade las medidas de CO
      medidasCo.forEach(medida => {
        this.mapa.anyadirMedicion('co', medida);
      });

      // Añade las medidas de So2
      medidasSo2.forEach(medida => {
        this.mapa.anyadirMedicion('so2', medida);
      });

      // Mostrar solo la de O3 por defecto
      this.mapa.ocultarTodasLasCapas();
      this.mapa.mostrarCapa('o3');


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  // ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// [valores]:string -> onSelectCapaChange()
// Handler de cuando se elige mostrar otra capa
// ----------------------------------------------------------------------------------------------
  onSelectCapaChange(valores) {
    this.mapa.ocultarTodasLasCapas();
    valores.forEach(capa => {
      this.mapa.mostrarCapa(capa);
    });
  }
}
