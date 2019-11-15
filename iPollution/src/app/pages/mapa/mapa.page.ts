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
  map: any;
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
      /*const map = new google.maps.Map(
        this.mapElement.nativeElement, {
          zoom: 15,
      });*/

      this.mapa = new MapaService({lat: resp.lat, lng: resp.long}, {zoom: 15}, this.mapElement.nativeElement);
      this.mapa.anyadirMarcador({lat: this.currentLocation.lat, lng: this.currentLocation.long}, 'assets/icon/gpsIcon.svg');

      // Pido las medidas al servidor
      this.server.getAllMediciones().then((mediciones: any) => {
        mediciones.forEach(medicion => {
          this.mapa.anyadirMedicion(medicion);
        });

        this.mapa.refrescarMapa();
      });

      /*location object*/
      const pos = {
        lat: this.currentLocation.lat,
        lng: this.currentLocation.long
      };
      const icon = {
        url: 'assets/icon/gpsIcon.svg', // image url
        scaledSize: new google.maps.Size(40, 40), // scaled size
      };
      
      /*const marker = new google.maps.Marker({
        position: pos,
        map: mapa,
        icon: icon
      }); */
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }
  // ----------------------------------------------------------------------------------------------

}
