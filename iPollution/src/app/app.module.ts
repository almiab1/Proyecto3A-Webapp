import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {SharedModule} from './components/shared/shared.module';
import {LoginComponent} from './components/shared/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BeaconProvider } from './core/services/BeaconProvider.service';
import { IBeacon } from '@ionic-native/ibeacon/ngx';
import { LogicaDeNegocioFake } from './core/services/LogicaDeNegocioFake.service';
import { LocalizadorGPS } from './core/services/LocalizadorGPS.service';
import { AdminModule } from './components/admin/admin.module';
import { ReceptorBLE } from './core/services/ReceptorBle.service';
import { IonicStorageModule } from '@ionic/storage';
import {BackgroundModeOriginal} from '@ionic-native/background-mode';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [LoginComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        IonicStorageModule.forRoot()
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    LocalizadorGPS,
    BackgroundMode,
    ReceptorBLE,
    LogicaDeNegocioFake,
    HttpClientModule,
    IBeacon, BeaconProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
