// ----------------------------
// BeaconProvider.service.ts
// Controlador del beacon
// Equipo
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import { Injectable } from '@angular/core';
import { Platform, Events } from '@ionic/angular';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
// ----------------------------
// BeaconProvider
// ----------------------------
@Injectable()
export class BeaconProvider {

  delegate: any;
  region: any;
  identifier: string = "iPollution-00001";
  uuid: string = "69504f4c-4c55-5449-4f4e-2d3030303031";

  constructor(
    public platform: Platform,
    public events: Events,
    public ibeacon: IBeacon,
  ) {

  }

  public initialise(): any {
    let promise = new Promise((resolve, reject) => {
      // we need to be running on a device
      if (this.platform.is('cordova')) {

        // Request permission to use location on iOS
        this.ibeacon.requestAlwaysAuthorization();

        // create a new delegate and register it with the native layer
        this.delegate = this.ibeacon.Delegate();

        // Subscribimos un delegaddo en el manejador de eventos
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
            data => {
              this.events.publish('didRangeBeaconsInRegion', data);
            },
            error => console.error()
          );

        // Ponemos al beacon en una region
        this.region = this.ibeacon.BeaconRegion(this.identifier, this.uuid);
        console.log('--------------Beacon Region-------------------');
        console.log(this.region);
        console.log(this.identifier + ' - ' + this.uuid);

        // Comenzamos en monitoreo
        this.ibeacon.startRangingBeaconsInRegion(this.region)
          .then(
            () => {
              resolve(true);
            },
            error => {
              console.error('Fallo al empezar el monitoreo: ', error);
              resolve(false);
            }
          );


      } else {
        console.error('La app necesita ejecutarse en un dispositivo con bluetooth');
        resolve(false);
      }
    });

    return promise;
  }
}
