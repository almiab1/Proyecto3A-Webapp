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
import {
  LocalizadorGPS
} from './../../core/services/LocalizadorGPS.service';
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
export class RutasPage implements OnInit {
  // Lista de rutas
  public rutes: any;
  // Propiedades
  map: any;
  // Referencia vista mapa
  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;
  // Actual localizacion
  currentLocation: any = {
    lat: 0,
    lng: 0
  };
  // Direcciones
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  selectedRute: any;
  correctRute: any;
  // Constructor
  constructor(
    private geolocation: LocalizadorGPS,
  ) {

    this.rutes = [{
        name: 'Grau i Platja Gandia - ida',
        posicion: {lat: 39.019929, lng: -0.177311},
      },
      {
        name: 'Grau i Platja Gandia - vuelta',
        posicion: {lat: 38.984524, lng: -0.164641},
      },
      {
        name: 'Gandia',
        posicion: {lat: 38.959545, lng: -0.187941},
      },
    ];
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  ngOnInit(): void {}
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
    this.geolocation.obtenerMiPosicionGPS().then((resp) => {
      this.currentLocation.lat = resp.lat;
      this.currentLocation.long = resp.long;
      const map = new google.maps.Map(
        this.mapElement.nativeElement, {
          zoom: 15,
          center: {lat: 41.85, lng: -87.65}
        });
      // Direciones
      this.directionsDisplay.setMap(map);
      /*location object*/
      const pos = {
        lat: this.currentLocation.lat,
        lng: this.currentLocation.long
      };
      map.setCenter(pos);
      const icon = {
        url: 'assets/icon/gpsIcon.svg', // image url
        scaledSize: new google.maps.Size(40, 40), // scaled size
      };
      const marker = new google.maps.Marker({
        position: pos,
        map: map,
        icon: icon
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
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
      origin: '{lat:38.997239,long: -0.166362}',
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
}