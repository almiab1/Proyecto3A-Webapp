// ----------------------------
// rutas.page.ts
// Controlador de la vista rutas
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
// Services
import {
  LocalizadorGPS
} from './../../../core/services/LocalizadorGPS.service';
import {
  MapaService
} from './../../../core/services/Mapa.service';
import {
  LogicaDeNegocioFake
} from 'src/app/core/services/LogicaDeNegocioFake.service';
// Variable global
declare var google;
// ----------------------------
// Components
// ----------------------------
@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.page.html',
  styleUrls: ['./rutas.page.scss'],
})
// ----------------------------
// Class RutasPage
// ----------------------------
export class RutasPage implements OnInit {

  // Mapa
  mapa: MapaService;
  // Referencia elemento vista mapa
  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;
  currentLocation: any = {
    lat: 38.996394,
    lng: -0.166196
  };
  // Lista de rutas
  public rutes: any;
  // Direcciones
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  selectedRute: any;
  correctRute: any;
  // Constructor
  constructor(
    private geolocation: LocalizadorGPS,
    private server: LogicaDeNegocioFake
  ) {

    this.rutes = [{
        name: 'Grau i Platja Gandia - ida',
        posicion: {
          lat: 39.019929,
          lng: -0.177311
        },
      },
      {
        name: 'Grau i Platja Gandia - vuelta',
        posicion: {
          lat: 38.984524,
          lng: -0.164641
        },
      },
      {
        name: 'Gandia',
        posicion: {
          lat: 38.959545,
          lng: -0.187941
        },
      },
    ];
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  ngOnInit(): void {}
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  ruteSelected() {
    console.log('MetodoRutaSeleccionado y ruta select ' + this.selectedRute);
    this.rutes.forEach(element => {
      if (element.name === this.selectedRute) {
        this.correctRute = element.posicion;
        console.log('Ruta puesta - ' + this.correctRute);
        this.calculateAndDisplayRoute();
      }
    });
  }

  calculateAndDisplayRoute() {
    const that = this;
    this.directionsService.route({
      // origin: this.currentLocation,
      origin: {
        lat: this.currentLocation.lat,
        lng: this.currentLocation.long
      },
      destination: this.correctRute,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.geolocation.obtenerMiPosicionGPS().then((resp) => {
      this.currentLocation.lat = resp.lat;
      this.currentLocation.long = resp.long;

      this.mapa = new MapaService({
        lat: resp.lat,
        lng: resp.long
      }, {
        zoom: 15
      }, this.mapElement.nativeElement);
      this.mapa.anyadirMarcador(
        'Posicion Actual', {
          lat: this.currentLocation.lat,
          lng: this.currentLocation.long
        }, 'assets/icon/gpsIcon.svg'
      );
    })
  }
}