// ----------------------------
// ReceptorBle.service.ts
// Descripcion que hace el codigo a grandes rasgos
// Equipo
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import {
  Injectable,
  NgZone
} from '@angular/core';

// LogicaDeNegocioFake
// import { LogicaDeNegocioFake } from './services/LogicaDeNegocioFake.service';

// GPS
import {LocalizadorGPS} from 'src/app/core/services/LocalizadorGPS.service';
// iBEacon
import {IBeacon} from '@ionic-native/ibeacon/ngx';
// BeaconProvider
import {BeaconProvider} from 'src/app/core/services/BeaconProvider.service';
import {Events} from '@ionic/angular';


// ----------------------------
// ReceptorBle
// ----------------------------
@Injectable()
export class ReceptorBLE {
  // ----------------------------
  // Propiedades
  // ----------------------------
  // ibeacon data
  identifier: string;
  uuid: string;
  major: number;
  minor: number;
  // ubicacion data
  valor: number;
  lat: number;
  long: number;
  instante: number;
  // medicion
  medicion: any = {};
  // ----------------------------
  // Constructor
  // ----------------------------
  constructor(
    // private servidor: ServidorFake,
    private gps: LocalizadorGPS,
    private ibeacon: IBeacon,
    public beaconProvider: BeaconProvider,
    public events: Events,
    private ngZone: NgZone,
  ) {}

  // ----------------------------
  // Metodos
  // ----------------------------

  async inizializar() {
    // Comprobar ble
    if (!this.estaBLEactivado()) {
      await this.activarBLE();
    }
    // Inicializar beacon
    this.beaconProvider.initialise().then((isInitialised) => {
      if (isInitialised) {
        this.actualizarMediciones();
      }
    });

    // Actualizar Mediciones
  }

  estaBLEactivado() {
    this.ibeacon.isBluetoothEnabled().then(
      success => {
        return true;
      },
      error => {
        return false;
      }
    );
    return false;
  }

  activarBLE() {
    this.ibeacon.enableBluetooth().then(
      success => {
        console.log('Bluetooth is enabled');
      },
      error => {
        console.log('Error enabling bluetooth');
      }
    );
  }

  // ASCII only
  private bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
  }

  obtenerMisTramas() {
    this.events.subscribe('didRangeBeaconsInRegion', (data) => {
      // Crear array ibeacons
      let beacons = [];
      // Rellenamar la array
      let beaconList = data.beacons;
      beaconList.forEach((beacon) => {
        let beaconObject = beacon;
        beacons.push(beaconObject);
      });
      // Parametros
      this.uuid = beacons[0].uuid.toString();
      this.major = parseInt(beacons[0].major);
      this.minor = parseInt(beacons[0].minor);

      // console.log('ObtenerMisTramas: Major: ' + this.major)
    });
  }

  async actualizarMediciones() {
    this.obtenerMisTramas();
    let date = new Date();
    this.medicion = {
      valor: this.major,
      lat: await this.gps.obtenerMiPosicionGPS().then(ubicacion => {
        return ubicacion.lat;
      }),
      long: await this.gps.obtenerMiPosicionGPS().then(ubicacion => {
        return ubicacion.long;
      }),
      instante: date.getTime()
    };

    // console.log(this.medicion);
    /*
    // Actualizar UI
    this.ngZone.run(() => {
      this.valor = this.medicion.valor;
      this.lat = this.medicion.lat;
      this.long = this.medicion.long;
      // console.log('Lat: ' + this.lat + ', Long: ' + this.long);
      this.instante = this.medicion.instante;
    });
    */
  }

  obtenerO3() {
    this.actualizarMediciones();
    console.log(this.medicion);
    return this.medicion;
  }

}

// ----------------------------
