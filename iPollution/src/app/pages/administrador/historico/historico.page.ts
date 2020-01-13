import {
  LocalizadorGPS
} from './../../../core/services/LocalizadorGPS.service';
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
import {
  MapaService
} from './../../../core/services/Mapa.service';
import { ToastController } from '@ionic/angular';
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

// ----------------------------------------------------------------------------------------------
// Class HistoricoPage
// ----------------------------------------------------------------------------------------------
export class HistoricoPage implements OnInit {
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
              private server: LogicaDeNegocioFake, private toastController: ToastController) {}

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

// ----------------------------------------------------------------------------------------------
// fechaIso:string --> cambioDeFecha()
// Handler del evento de cambio de fecha en el selector
// ----------------------------------------------------------------------------------------------
  cambioDeFecha(fechaIso: string): void {

    // Transformo la fecha en formato ISO a millis
    let fecha = new Date(Date.parse(fechaIso));

    // Ajusto para ponerlo a las 12h de ese dia
    fecha.setHours(12);
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    fecha.setMilliseconds(0);


    // Oculto las capas
    this.mapa.ocultarCapa('o3');
    this.mapa.borrarCapa('o3');


    // Obtén las medidas del servidor
    try {
    this.getMedidas(fecha, medidas => {
      if (medidas.length > 0) {
        this.anyadirLaCapa(medidas);
      } else {

        // Si no me ha llegado nada, lo indico en un toast
        this.mostrarToast('Sin resultados', 1500);

      }
    });
    } catch (error) {
     console.error(error);
     this.mostrarToast('Ha habido un error, inténtalo más tarde', 2000);
   }

  }
// -------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// fecha:int --> getMedidas() --> [medidas] via callback
// funcion que devuelve asíncronamente las medidas que pide al servidor segun una fecha
// ----------------------------------------------------------------------------------------------
  getMedidas(fecha, callback): void {
    this.server.getMedidasDeIntervaloConcreto(fecha.getTime(), 24).toPromise().then(valores => {

      // Si me llega algo del servidor...
      if(valores.length > 0) {
        let medidas = new Array<any>();
        let nuevaFecha = new Date();
        valores.forEach(valor => {
          nuevaFecha.setTime(valor.tiempo);

          // Añade al array a devolver al comprobar que son medidas del dia elegido
          if (nuevaFecha.toLocaleDateString() === fecha.toLocaleDateString()) {
            medidas.unshift(valor);
          }
        });

        callback(medidas);
      } else {
        // indica en el caso de que no haya llegado nada
        this.mostrarToast('Sin resultados', 1500);
      }
    });
  }
// ------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// [medidas] --> anyadirLaCapa()
// Añade al mapa como capa el array de medidas
// ----------------------------------------------------------------------------------------------
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

    this.mapa.refrescarMapa();
  }
// -----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// texto:string, duracion:int --> mostrarToast()
// Muestra un toast con el texto recibido con la duración indicada
// ----------------------------------------------------------------------------------------------
  async mostrarToast(texto: string, duracion: number) {
    const toast =  await this.toastController.create({
      message: texto,
      duration: duracion
    });

    toast.buttons = [{
      text: 'Cerrar',
      role: 'cancel',
      handler: () => {
       toast.dismiss();
      }
    }];

    toast.present();
  }
// ------------------------------------------------------------------------------------------------
}
