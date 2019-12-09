import {Component, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
import {LoginService} from '../../../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  mode: any;
  loading: any;
  rolUser: number;
  private readonly tokenKey = 'token';
  constructor(private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private loginService: LoginService) { }

  ngOnInit() {}
  onSubmitTemplate() {
    this.presentarLoading();
    this.loginService.autenticarUsuario(this.email, this.password)
        .subscribe(data => {
          this.loginCorrecto(data.token);
        }, err => {
          if (err.status === 404) {
            this.loginIncorrecto();
          }
          if (err.status !== 404) {
            this.desconectadoDelServidor();
          }
        });
  }
  loginCorrecto(data: string) {
    this.rolUser = this.loginService.procesarToken(data);
    this.loadingCtrl.dismiss();
    this.password = '';
    this.modalCtrl.dismiss(this.rolUser);
    this.presentarToast(`Hola, ${this.email}`, 'success');
  }
  loginIncorrecto() {
    this.loadingCtrl.dismiss();
    this.presentarToast('Correo electrónico y/o contraseña incorrectos', 'danger');
  }
  desconectadoDelServidor() {
    this.loadingCtrl.dismiss();
    this.presentarToast('No se ha podido establecer la conexión', 'danger');
  }
  async presentarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color,
      position: 'bottom',
      closeButtonText: 'Cerrar',
      showCloseButton: true
    });
    await toast.present();
  }
  async presentarLoading() {
    this.loading = await this.loadingCtrl.create({
      mode: this.mode
    });
    await this.loading.present();
  }

    closeModal() {
        this.modalCtrl.dismiss();
    }
}
