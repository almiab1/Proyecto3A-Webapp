import { timeout } from 'q';
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
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import {
    TestBed
} from '@angular/core/testing';
import {
    Observable,
    throwError
} from 'rxjs';
import {
    retry,
    catchError
} from 'rxjs/operators';
// ----------------------------
// Class LogicaDeNegocioFake
// ----------------------------
@Injectable()
export class LogicaDeNegocioFake {
    // URL server en local
    urlGetLocal = 'http://192.168.100.205/getultimaMedicion';
    urlPostLocal = 'http://192.168.100.103/guardarO3/';
    // URL server remoto
    urlPOST = 'https://osblasae.upv.edu.es/guardarMedida';
    urlGET = 'http://192.168.0.109:8080/getUltimaMedida';
    urlGETAll = 'https://osblasae.upv.edu.es/getAllMedidas';

    // API de admin
    urlEditarUsuario = 'https://osblasae.upv.edu.es/admin/editarUsuario';
    urlAsociarSensorUsuario = 'https://osblasae.upv.edu.es/admin/asociarSensorAUsuario';
    urlDarDeBajaUsuario = 'https://osblasae.upv.edu.es/admin/darDeBajaUsuario';
    urlDarDeAltaUsuario = 'https://osblasae.upv.edu.es/admin/darDeAltaUsuario';
    urlDarDeBajaSensor = 'https://osblasae.upv.edu.es/admin/darDeBajaSensor';
    urlDarDeAltaSensor = 'https://osblasae.upv.edu.es/admin/darDeAltaSensor';
    urlEditarUsuarioAdministrador = 'https://osblasae.upv.edu.es/admin/editarUsuarioAdministrador';

    // API de técnico
    urlBasureroGuardar = 'https://osblasae.upv.edu.es/basurero/guardarMedida';
    urlEditarUsuarioBasurero = 'https://osblasae.upv.edu.es/admin/editarUsuarioBasurero';

    // API de admin Local
    urlEditarUsuarioLocal = 'http://osblasae/admin/editarUsuario';
    urlAsociarSensorUsuarioLocal = 'http://osblasae.upv.edu.es/admin/asociarSensorUsuario';
    urlDarDeBajaUsuarioLocal = 'http://osblasae.upv.edu.es/admin/darDeBajaUsuario';
    urlDarDeAltaUsuarioLocal = 'http://osblasae.upv.edu.es/admin/darDeAltaUsuario';
    urlDarDeBajaSensorLocal = 'http://osblasae.upv.edu.es/admin/darDeBajaSensor';
    urlDarDeAltaSensorLocal = 'http://osblasae.upv.edu.es/admin/darDeAltaSensor';
    urlEditarUsuarioAdministradorLocal = 'http://osblasae.upv.edu.es/admin/editarUsuarioAdministrador';

    // Api de técnico local
    urlBasureroGuardarLocal = 'http://osblasae.upv.edu.es/basurero/guardarMedida';
    urlEditarUsuarioBasureroLocal = 'http://osblasae.upv.edu.es/basurero/editarUsuarioBasurero';

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    }

    constructor(
        public http: HttpClient
    ) {}

    // Handle API errors
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                'Backend returned code ${error.status}, ' +
                'body was: ${error.error}');
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    // Get single student data by ID
    getUltimaMedicion(): Observable < any > {
        return this.http
            .get(this.urlGET, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
              )
    }

    // Get all data by ID
   /* getAllMediciones(): Observable < any > {
        return this.http
            .get(this.urlGETAll, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
              );            
    }*/

    // METODO GET ALL DE PRUEBA
    async getAllMediciones() {
        const medidas = [{
            esto: 'aquello'
        }, {
            latitud: 39.000466,
            longitud: -0.165349,
            valorMedido: 320
        }, {
            latitud: 39.002577,
            longitud: -0.161285,
            valorMedido: 500
        }, {
            latitud: 38.999102,
            longitud: -0.160547,
            valorMedido: 703
        }];

        return medidas;
    }

    // Create a new item
    guardarMedida(data): Observable<any> {
        // JSON a enviar
        const datos = {
            valorMedido: data.valorMedido,
            tiempo: data.tiempo,
            latitud: data.latitud,
            longitud: data.longitud,
            idUsuario: 'a@gmail.com',
            idTipoMedida: 1,
            idSensor: 1,
            temperatura: data.temperatura,
            humedad: data.humedad
        };
        return this.http
            .post<any>(this.urlBasureroGuardarLocal,
                JSON.stringify(datos),
                this.httpOptions);
            // .pipe(
            //     // retry(2),
            //     catchError(this.handleError)
            // );
    }

    // Enviar datos para editar el usuario
    async editarUsuario(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.urlEditarUsuarioAdministradorLocal, JSON.stringify({
                    idUsuario: data.idUsuario,
                    password: data.password,
                    tipoUsuario: data.tipoUsuario,
                    telefono: data.telefono
                }), {
                    observe: 'response'
                })
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }


    // Enviar datos para dar de alta el usuario
    async darDeAltaUsuario(data) {
        return new Promise((resolve, reject) => {
            // this.http.post(this.urlPostLocal + data.valor + '&' + data.instante + '&' + data.lat + '&' + data.long, JSON.stringify(data))
            this.http.post(this.urlDarDeAltaUsuarioLocal, JSON.stringify({
                    idUsuario: data.idUsuario,
                    password: data.password,
                    tipoUsuario: data.tipoUsuario,
                    telefono: data.telefono
                }), {
                    observe: 'response'
                })
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    // Dar de alta sensor
    async darDeAltaSensor(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.urlDarDeAltaSensorLocal, JSON.stringify({
                    idTipoSensor: data.idTipoSensor
                }), {
                    observe: 'response'
                })
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    // Asociar sensor con Usuario
    async asociarSensorAUsuario(data) {
        return new Promise((resolve, reject) => {
            // this.http.post(this.urlPostLocal + data.valor + '&' + data.instante + '&' + data.lat + '&' + data.long, JSON.stringify(data))
            this.http.post(this.urlAsociarSensorUsuarioLocal, JSON.stringify({
                    idUsuario: data.idUsuario,
                    idSensor: data.idSensor
                }), {
                    observe: 'response'
                })
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    // Dar de baja Usuario
    async darDeBajaUsuario(data) {
        return new Promise((resolve, reject) => {
            // this.http.post(this.urlPostLocal + data.valor + '&' + data.instante + '&' + data.lat + '&' + data.long, JSON.stringify(data))
            this.http.post(this.urlDarDeBajaUsuarioLocal, JSON.stringify({
                    idUsuario: data.idUsuario
                }), {
                    observe: 'response'
                })
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }


    // Dar de baja Sensor
    async darDeBajaSensor(data) {
        return new Promise((resolve, reject) => {
            // this.http.post(this.urlPostLocal + data.valor + '&' + data.instante + '&' + data.lat + '&' + data.long, JSON.stringify(data))
            this.http.post(this.urlDarDeBajaSensorLocal, JSON.stringify({
                    idSensor: data.idSensor
                }), {
                    observe: 'response'
                })
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }
}

// ----------------------------