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

      // Genero la capa donde pondre las medidas de ozono
      this.mapa.anyadirCapa({
        nombre: 'o3',
        disipado: true, // Escalado del aspecto de los puntos en funcion del zoom
        radio: 80, // Radio de influencia de cada punto en pixeles sobre el mapa
        maxIntensidad: 900 // Valor en el cual el color es máximo
      });

      this.mapa.anyadirCapa({
        nombre: 'co',
        disipado: true,
        radio: 90,
        maxIntensidad: 1000
      });

      // Pido las medidas al servidor y por cada una la añado a la capa de ozono en este caso

      const medidasOzono = [{
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

      medidasOzono.forEach(medicion => {
        this.mapa.anyadirMedicion('o3', medicion);
      });


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
