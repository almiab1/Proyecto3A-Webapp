// ------------------------------------------------------------------------------------------------
// ReceptorBle.service.ts
// Controlados BLE
// Equipo
// Alejandro Mira Abad
// Fecha
// CopyRight
// ------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------
// Includes
// ------------------------------------------------------------------------------------------------
import { Injectable } from '@angular/core';
// GPS
import { LocalizadorGPS} from 'src/app/core/services/LocalizadorGPS.service';
// iBEacon
import {IBeacon} from '@ionic-native/ibeacon/ngx';
// BeaconProvider
import { BeaconProvider } from 'src/app/core/services/BeaconProvider.service';
import { Events } from '@ionic/angular';


// ------------------------------------------------------------------------------------------------
// ReceptorBle
// ------------------------------------------------------------------------------------------------
@Injectable()
export class ReceptorBLE {
  // ------------------------------------------------------------------------------------------------
  // Propiedades
  // ibeacon data
  major: number;
  minor: number;
  uuid: string;
  // medicion
  medicion: any = {};
  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
  // Constructor
  constructor(
    // private servidor: ServidorFake,
    private gps: LocalizadorGPS,
    private ibeacon: IBeacon,
    public beaconProvider: BeaconProvider,
    public events: Events,
  ) {}
  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
  // Metodos
  // ------------------------------------------------------------------------------------------------
  // inizializar()
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
  }
  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
  // estaBLEactivado()
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
  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
  // activarBLE()
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
  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
  // desactivarBLE()
  desactivarBLE() {
    this.ibeacon.disableBluetooth().then(
      success => {
        console.log('Bluetooth is disabled');
      },
      error => {
        console.log('Error disabling bluetooth');
      }
    );
  }
  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
  // obtenerMisTramas()
  private obtenerMisTramas() {
    this.events.subscribe('didRangeBeaconsInRegion', async (data) => {

      console.log(data.beacons);

      if (data.beacons.length > 0) {
        console.log('------------------Beacon recibido------------------');
        console.table(data.beacons[0]);

        // Parametros
        // tslint:disable-next-line: radix
        this.major = parseInt(data.beacons[0].major);
        // tslint:disable-next-line: radix
        this.minor = parseInt(data.beacons[0].minor);
        this.uuid = data.beacons[0].uuid;
        if (this.major === undefined) {
          this.major = 0;
        }
        if (this.minor === undefined) {
          this.major = 0;
        }
      }
    });
  }
  // ------------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------------
  // actualizarMediciones()
  async actualizarMediciones() {
    // llamada a obtenerMisTramas()
    this.obtenerMisTramas();
    // Cogemos fecha
    const date = new Date();
    // Creamos json medicion
    this.medicion = {
      valorMedido: this.major,
      latitud: await this.gps.obtenerMiPosicionGPS().then(ubicacion => {
        return ubicacion.lat;
      }),
      longitud: await this.gps.obtenerMiPosicionGPS().then(ubicacion => {
        return ubicacion.long;
      }),
      tiempo: date.getTime(),
      idTipoMedida: 1,
      temperatura: this.minor,
      humedad: this.minor,
    };
  }

  // ------------------------------------------------------------------------------------------------
  obtenerO3() {
    this.actualizarMediciones();
    console.log('-------------Este es el JSON medicion-----------------------------');
    console.table(this.medicion);
    return this.medicion;
  }

}

// ---------------------------------------------------------------------------------------------------------
