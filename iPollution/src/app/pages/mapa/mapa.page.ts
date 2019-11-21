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
      this.mapa.anyadirMarcador(
        'Estación oficial', {lat: 38.966754, lng: -0.185648}, 'assets/icon/courthouse.svg'
      );

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
