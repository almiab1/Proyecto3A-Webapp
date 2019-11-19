/* @author: Oscar Blanquez
 * @description: Logica de la vista LoginPage
 * Sprint 2
 */
import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(public platform: Platform,
              public modalCtrl: ModalController,
              private toastCtrl: ToastController,
              public loadingController: LoadingController,
              private router: Router,
              private loginService: LoginService) { }
  email: string;
  password: string;
  loading: any;
  mode: any;
  // Cambia el modo según la plataforma en la que se encuentre
  ngOnInit() {
    if (this.platform.is('android')) {
      this.mode = 'md';
    }
    if (this.platform.is('ios')) {
      this.mode =  'ios';
    }
  }
  /* ********* onSubmitTemplate()  *************************************
 *  Oscar Blanquez
 *  description: Envia los datos introducidos del formulario al servicio
 * loginService que se encarga de enviarlo al servidor y autentificar al
 * usuario. En caso de recibir un error, no se logeara y llamara a la
 * funcion loginIncorrecto().
 * En caso de no recibirlo, se llamara a loginCorrecto()
 *  @params: void
 *  @return: void
 *  */
  onSubmitTemplate = () => {
    this.presentarLoading();
    this.loginService.autenticarUsuario(this.email, this.password).subscribe( data => {
      this.loginCorrecto();
    }, err => {
      if (err.status === 401) {
        this.loginIncorrecto();
      }
      if (err) {
        this.desconectadoDelServidor();
      }
    });
  }
  cerrarModal = () => {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }
  presentarToast = async (mensaje: string, color: string)  => {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'bottom',
      closeButtonText: 'Cerrar',
      showCloseButton: true
    });
    toast.present();
  }
  loginIncorrecto = () => {
    // Cerrar el loading
    setTimeout( () => {
      this.loadingController.dismiss();
    }, 800);
    // Cerrar el modal
    setTimeout( () => {
      this.presentarToast('Correo electronico y/o contraseña incorrectos', 'danger');
    }, 1000);
  }
  loginCorrecto = () => {
    // Cerrar el loading
    setTimeout( () => {
      this.loadingController.dismiss();
    }, 1000);
    // Cerrar el modal
    setTimeout( () => {
      this.cerrarModal();
    }, 1150);
    // Colocar el toast
    setTimeout( () => {
      this.presentarToast(`Hola, ${this.email}`, 'success');
    }, 1400);
  }
  desconectadoDelServidor = () => {
    // Cerrar el loading
    setTimeout( () => {
      this.loadingController.dismiss();
    }, 800);
    // Cerrar el modal
    setTimeout( () => {
      this.presentarToast('No se ha podido establecer la conexion.', 'danger');
    }, 1000);
  }
  presentarLoading = async () => {
    this.loading = await this.loadingController.create({
      mode: this.mode
    });
    return this.loading.present();
  }

}