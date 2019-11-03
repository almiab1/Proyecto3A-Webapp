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
    long: 0
  };
  // Constructor
  constructor(
    private geolocation: LocalizadorGPS,
  ) {
    this.rutes = [{
      name: 'Grau i Platja Gandia',
    },
    {
      name: 'Oliva',
    },
    {
      name: 'Gandia',
    },
  ];
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
      const map = new google.maps.Map(
        this.mapElement.nativeElement, {
          zoom: 15,
        });

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

}