import { MapaService } from './../../core/services/Mapa.service';
// ----------------------------
// mapa.page.ts
// Controlador de la vista mapa
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { LocalizadorGPS } from './../../core/services/LocalizadorGPS.service';
import { LogicaDeNegocioFake } from 'src/app/core/services/LogicaDeNegocioFake.service';
// Variable global
declare var google;
// ----------------------------
// Components
// ----------------------------
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})

// ----------------------------
// Class
// ----------------------------
export class MapaPage implements OnInit {
  mapa: MapaService;
  @ViewChild('mapElement', {static: false}) mapElement: ElementRef;
  currentLocation: any = {
    lat: 0,
    long: 0
  };
  // Constructor
  constructor(
    private geolocation: LocalizadorGPS,
    private server: LogicaDeNegocioFake
  ) {
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  ngOnInit(): void {
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.geolocation.obtenerMiPosicionGPS().then((resp) => {
      this.currentLocation.lat = resp.lat;
      this.currentLocation.long = resp.long;

      this.mapa = new MapaService({lat: resp.lat, lng: resp.long}, {zoom: 15}, this.mapElement.nativeElement);
      this.mapa.anyadirMarcador(
        'Posicion Actual', {lat: this.currentLocation.lat, lng: this.currentLocation.long}, 'assets/icon/gpsIcon.svg'
      );
      const estacionOficial = this.mapa.anyadirMarcador(
        'Estación oficial', {lat: 38.966754, lng: -0.185648}, 'assets/icon/courthouse.svg'
      );

      let contenido = '<div align="center"><img src="assets/estacion_oficial.png" width="270" heigth="195"></div>' +
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
        maxIntensidad: 120 // Valor en el cual el color es máximo
      });

      this.mapa.anyadirCapa({
        nombre: 'co',
        disipado: true,
        radio: 90,
        maxIntensidad: 1000
      });

      this.mapa.anyadirCapa({
        nombre: 'so2',
        disipado: true,
        radio: 60,
        maxIntensidad: 800
      });

      // Pido las medidas al servidor y por cada una la añado a la capa de ozono en este caso

      this.server.getAllMedidas().toPromise().then((medidasOzono) => {
        try {
          medidasOzono.forEach(medida => {
            this.mapa.anyadirMedicion('o3', medida);
          });
        } catch (error) {
          console.error(error);
        }
      });
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
      longitud:  -0.166646,
      valorMedido: 620
  }, {
      latitud: 39.009055,
      longitud:  -0.167912,
      valorMedido: 130
  }, {
      latitud: 39.007703,
      longitud:  -0.168824,
      valorMedido: 270
  }];

      medidasCo.forEach(medida => {
        this.mapa.anyadirMedicion('co', medida);
      });

      medidasSo2.forEach(medida => {
        this.mapa.anyadirMedicion('so2', medida);
      });

      this.mapa.ocultarTodasLasCapas();
      this.mapa.mostrarCapa('o3');


    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  // ----------------------------------------------------------------------------------------------

   onSelectCapaChange(valores) {
    this.mapa.ocultarTodasLasCapas();
    valores.forEach(capa => {
      this.mapa.mostrarCapa(capa);
    });
  }
}
