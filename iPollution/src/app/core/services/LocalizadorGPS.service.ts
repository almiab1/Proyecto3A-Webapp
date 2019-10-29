// ----------------------------
// LocalizadorGPS.service.ts
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
// GPS
import { Geolocation } from '@ionic-native/geolocation/ngx';

// ----------------------------
// LocalizadorGPS
// ----------------------------
@Injectable()
export class LocalizadorGPS {
  // Propiedades
  public lat: number;
  public long: number;

  constructor(
    private geolocation: Geolocation
  ) {}

  async obtenerMiPosicionGPS() {
    // Parametrizamos la latitud y longitud
    await this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    // console.log('Lat: ' + this.lat + ' , Long: ' + this.long);

    return {lat: this.lat, long: this.long};
  }
}
