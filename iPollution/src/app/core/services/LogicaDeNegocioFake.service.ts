// ----------------------------
// LogicaDeNegocioFake.service.ts
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
import {
    HttpClient
} from '@angular/common/http';


// ----------------------------
// Class LogicaDeNegocioFake
// ----------------------------
@Injectable()
export class LogicaDeNegocioFake {

    // URL server en local
    urlGetLocal = 'http://192.168.100.103/ultimaMedicion';
    urlPostLocal = 'http://192.168.100.103/guardarO3/';
    // URL server remoto
    urlPOST = 'https://cartormi.upv.edu.es/guardarMedida';
    urlGET = 'https://cartormi.upv.edu.es/getUltimaMedida';


    constructor(
        public http: HttpClient
    ) {}

    // Realiza la conexión a la API REST
    async getUltimaMedicion() {
        return new Promise(resolve => {
            // this.http.get(this.urlGetLocal).subscribe(data => {
            this.http.get(this.urlGET).subscribe(data => {
                resolve(data);
            }, error => {
                console.log(error);
            });
        });
    }
    // Enviar datos a la API Rest
    async postGuardarMedicion(data) {
        return new Promise((resolve, reject) => {
            // this.http.post(this.urlPostLocal + data.valor + '&' + data.instante + '&' + data.lat + '&' + data.long, JSON.stringify(data))
            this.http.post(this.urlPOST, JSON.stringify({
                        resultados: {
                            Time: data.instante,
                            Value: data.valor
                        }}),
                        {observe: 'response'}
                )
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

}

// ----------------------------