import {
  LocalizadorGPS
} from './../../../core/services/LocalizadorGPS.service';
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
import {
  MapaService
} from './../../../core/services/Mapa.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  LogicaDeNegocioFake
} from 'src/app/core/services/LogicaDeNegocioFake.service';

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
              private server: LogicaDeNegocioFake) {}

  ngOnInit() {}

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

  cambioDeFecha(fechaIso: string): void {
    let fecha = new Date(Date.parse(fechaIso));
    fecha.setHours(12);
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    fecha.setMilliseconds(0);

    this.mapa.ocultarCapa('o3');
    this.mapa.borrarCapa('o3');

    this.getMedidas(fecha, medidas => {
      if(medidas.length > 0) {
        this.anyadirLaCapa(medidas);
      }
    });
  }

  getMedidas(fecha, callback): void {
    this.server.getMedidasDeIntervaloConcreto(fecha.getTime(), 24).toPromise().then(valores => {

      if(valores.length > 0) {
        let medidas = new Array<any>();
        let nuevaFecha = new Date();
        valores.forEach(valor => {
          nuevaFecha.setTime(valor.tiempo);
          if (nuevaFecha.toLocaleDateString() === fecha.toLocaleDateString()) {
            medidas.unshift(valor);
          }
        });
        callback(medidas);
      }
    });
  }

  anyadirLaCapa(medidas: any): void {
    this.mapa.refrescarMapa();
    this.mapa.anyadirCapa({
      nombre: 'o3',
      disipado: true, // Escalado del aspecto de los puntos en funcion del zoom
      radio: 70, // Radio de influencia de cada punto en pixeles sobre el mapa
      maxIntensidad: 1500 // Valor en el cual el color es máximo
    });
    medidas.forEach(medida => {
      this.mapa.anyadirMedicion('o3', medida);
    });

    console.log('He acabado con las mediciones');

    this.mapa.refrescarMapa();
  }

}
