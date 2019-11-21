import { EditarUsuariosComponent } from './components/editar-usuarios/editar-usuarios.component';
import { EditarComponent } from './components/editar/editar.component';
import { NodosComponent } from './components/nodos/nodos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { LogicaDeNegocioFake } from './core/services/LogicaDeNegocioFake.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import {LoginPage} from './pages/login/login.page';

import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [AppComponent, LoginPage, UsuariosComponent, NodosComponent, EditarComponent, EditarUsuariosComponent],
  entryComponents: [LoginPage],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
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
    IBeacon, BeaconProvider,
    File, Camera, PhotoViewer, ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
