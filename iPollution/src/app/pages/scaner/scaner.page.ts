// ----------------------------
// scaner.page.ts
// Controlador vista scaner
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ----------------------------

// ----------------------------
// Includes
// ----------------------------
import {
  LogicaDeNegocioFake
} from './../../core/services/LogicaDeNegocioFake.service';
import {
  Component,
  OnInit,
  NgZone
} from '@angular/core';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera/ngx';
import {
  File,
  IWriteOptions,
  FileEntry
} from '@ionic-native/file/ngx';
import {
  PhotoViewer
} from '@ionic-native/photo-viewer/ngx';

// ----------------------------
// Components
// ----------------------------
@Component({
  selector: 'app-scaner',
  templateUrl: './scaner.page.html',
  styleUrls: ['./scaner.page.scss'],
})
export class ScanerPage implements OnInit {

  // image taked
  currentImage: any;
  // camera options
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  // Variables temporales
  imageJSON: any;
  imageURI: any;
  // Constructor
  constructor(
    private file: File,
    private uploadService: LogicaDeNegocioFake,
    private camera: Camera,
    private ngZone: NgZone,
    private photoViewer: PhotoViewer,
  ) {

  }

  ngOnInit(): void {}

  // takePicture()
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    // cargar imagen en la vista
    this.camera.getPicture(options).then((imageData) => {
      this.ngZone.run(() => {
        this.currentImage = 'data:image/jpeg;base64,' + imageData;
      });
    }, (err) => {
      // Handle errors
      console.log('Camera issue:' + err);
    });
  }

}