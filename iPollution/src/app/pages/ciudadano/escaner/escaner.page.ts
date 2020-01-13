// ----------------------------------------------------------------------------------------------
// escaner.page.ts
// Controlador de la vista escaner
// Equipo 4
// Alejandro Mira Abad
// 12/01/2020
// CopyRight
// ----------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------
// Includes
// ----------------------------------------------------------------------------------------------
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
// ----------------------------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------------------------
@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
// ----------------------------------------------------------------------------------------------
// Class EscanerPage
// ----------------------------------------------------------------------------------------------
export class EscanerPage implements OnInit {

  date:any;
  capturedSnapURL:string;

  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  // ----------------------------------------------------------------------------------------------
  // Constructor
  constructor(private camera: Camera) { }
  // ----------------------------------------------------------------------------------------------


  // ----------------------------------------------------------------------------------------------
  // ngOnInit
  // Metodo que se ejecuta cuando entras en la page
  // ----------------------------------------------------------------------------------------------
  ngOnInit() {
  }
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // tomarFoto()
  // Metodo para tomar fotos y poner en la vista la foto
  // --> tomarFoto() -->
  // ----------------------------------------------------------------------------------------------
  tomarFoto(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      this.date = new Date().toLocaleString();

      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {

      console.log(err);
      // Handle error
    });
  }
  // ----------------------------------------------------------------------------------------------
}
// ----------------------------------------------------------------------------------------------

