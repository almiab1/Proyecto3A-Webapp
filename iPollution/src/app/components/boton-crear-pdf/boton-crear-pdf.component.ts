import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

// PDFMake
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-boton-crear-pdf',
  templateUrl: './boton-crear-pdf.component.html',
  styleUrls: ['./boton-crear-pdf.component.scss'],
})
export class BotonCrearPdfComponent implements OnInit {

  pdfObj: any;

  constructor(public modalController: ModalController, public http: HttpClient) { }

  openPdfModal() {
    console.log("openpdfmodal")


    let docDefinition = {
      content: [
        'Hello World',
      ]
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);

    this.pdfObj.download

    /*
    let headers: any = new HttpHeaders({'Content-Type':'application/json'}),
      body: any = { "fname": "carlos", "lname": "canut" },
      url: any = 'http://localhost:8080/pdf';

      console.log(headers)
      console.log(body)
      this.http
        .post(url,body,headers)
        .subscribe((data: any) => {
          console.log("el pdf llegó")

        },
        (error: any) => {
          console.log("el pdf NO llegó")
        }
        );
      */

  }

  ngOnInit() {}

}
