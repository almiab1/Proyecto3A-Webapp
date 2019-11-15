import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, NavParams, ToastController} from '@ionic/angular';
import {delay} from "rxjs/operators";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public modalCtrl: ModalController,
              private toastCtrl: ToastController,
              public loadingController: LoadingController,
              private router: Router) { }
  email: string;
  password: string;
  loading: any;
  ngOnInit() {
  }
  cerrarModal = () => {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
  onSubmitTemplate = () => {
    console.log('Form submit');
    if (this.password === '1234') {
      this.loginCorrecto();
    } else {
      this.loginIncorrecto();
    }
  }
  presentarToast = async (mensaje: string, color: string)  => {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }
  loginIncorrecto = () => {
    this.presentarToast('Correo electronico y contraseña no validos', 'danger');
  }
  loginCorrecto = () => {
    this.presentarLoading();
    setTimeout(() => {
      this.loading.dismiss();
    }, 2000);
    setTimeout(this.cerrarModalConLogin, 2250);

  }
  cerrarModalConLogin = () => {
    this.modalCtrl.dismiss({
      dismissed: true
    });
    this.presentarToast('Hola, admin', 'success');
  }
  presentarLoading = async () => {
    this.loading = await this.loadingController.create({
      message: 'Entrando',
    });
    return this.loading.present();
  }
}
