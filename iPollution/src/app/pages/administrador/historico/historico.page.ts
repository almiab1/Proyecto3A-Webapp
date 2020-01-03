import { LocalizadorGPS } from './../../../core/services/LocalizadorGPS.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MapaService } from './../../../core/services/Mapa.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LogicaDeNegocioFake } from 'src/app/core/services/LogicaDeNegocioFake.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  mapa: MapaService;
  @ViewChild('mapElement', {
    static: false
  }) mapElement: ElementRef;

  currentLocation: any = {
    lat: 0,
    long: 0
  };

  constructor(private geolocation: LocalizadorGPS,
              private server: LogicaDeNegocioFake) { }

  ngOnInit() {
  }

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
    });
  }

}
