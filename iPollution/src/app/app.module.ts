import { LogicaDeNegocioFake } from './core/services/LogicaDeNegocioFake.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReceptorBLE } from './core/services/ReceptorBle.service';
import { LocalizadorGPS } from './core/services/LocalizadorGPS.service';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { BeaconProvider } from './core/services/BeaconProvider.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    LocalizadorGPS,
    ReceptorBLE,
    LogicaDeNegocioFake,
    HttpClientModule,
    IBeacon, BeaconProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
