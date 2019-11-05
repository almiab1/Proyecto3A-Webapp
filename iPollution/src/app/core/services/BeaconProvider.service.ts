// ----------------------------
// BeaconProvider.service.ts
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
  Injectable
} from '@angular/core';
import {
  Platform,
  Events
} from '@ionic/angular';
import {
  IBeacon
} from '@ionic-native/ibeacon/ngx';

// ----------------------------
// BeaconProvider
// ----------------------------
@Injectable()
export class BeaconProvider {

  delegate: any;
  region: any;
  identifier = 'iPollution-00001';
  uuid = '69506f6c-6c75-7469-6f6e-2d3030303031';

  constructor(
    public platform: Platform,
    public events: Events,
    public ibeacon: IBeacon,
    ) {}

  initialise(): any {
    let promise = new Promise((resolve, reject) => {
      // we need to be running on a device
      if (this.platform.is('cordova')) {

        // Request permission to use location on iOS
        this.ibeacon.requestAlwaysAuthorization();

        // create a new delegate and register it with the native layer
        this.delegate = this.ibeacon.Delegate();

        // Subscribe to some of the delegate's event handlers
        this.delegate.didRangeBeaconsInRegion()
          .subscribe(
            data => {
              this.events.publish('didRangeBeaconsInRegion', data);
            },
            error => console.error()
          );

        // setup a beacon region
        this.region = this.ibeacon.BeaconRegion(this.identifier.toString(), this.uuid.toString());
        // this.region = this.ibeacon.BeaconRegion('iPollution-00001', '69506f6c-6c75-7469-6f6e-2d3030303031');

        // start ranging
        this.ibeacon.startRangingBeaconsInRegion(this.region)
          .then(
            () => {
              resolve(true);
            },
            error => {
              console.error('Failed to begin monitoring: ', error);
              resolve(false);
            }
          );


      } else {
        console.error('This application needs to be running on a device');
        resolve(false);
      }
    });

    return promise;
  }
}
