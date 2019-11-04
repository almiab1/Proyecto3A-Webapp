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
    urlPOST = 'https://cartormi.upv.edu.es/guardarMedida';
    urlGET = 'http://192.168.0.109:8080/getUltimaMedida';

    // API de admin
    urlEditarUsuario = 'https://cartormi.upv.edu.es/admin/editarUsuario';
    urlAsociarSensorUsuario = 'https://cartormi.upv.edu.es/admin/asociarSensorAUsuario';
    urlDarDeBajaUsuario = 'https://cartormi.upv.edu.es/admin/darDeBajaUsuario';
    urlDarDeAltaUsuario = 'https://cartormi.upv.edu.es/admin/darDeAltaUsuario';
    urlDarDeBajaSensor = 'https://cartormi.upv.edu.es/admin/darDeBajaSensor';
    urlDarDeAltaSensor = 'https://cartormi.upv.edu.es/admin/darDeAltaSensor';
    urlEditarUsuarioAdministrador = 'https://cartormi.upv.edu.es/admin/editarUsuarioAdministrador';

    // API de técnico
    urlBasureroGuardar = 'https://cartormi.upv.edu.es/basurero/guardarMedida';
    urlEditarUsuarioBasurero = 'https://cartormi.upv.edu.es/admin/editarUsuarioBasurero';

    // API de admin Local
    urlEditarUsuarioLocal = 'http://192.168.43.195/admin/editarUsuario';
    urlAsociarSensorUsuarioLocal = 'http://192.168.43.195/admin/asociarSensorUsuario';
    urlDarDeBajaUsuarioLocal = 'http://192.168.43.195/admin/darDeBajaUsuario';
    urlDarDeAltaUsuarioLocal = 'http://192.168.43.195/admin/darDeAltaUsuario';
    urlDarDeBajaSensorLocal = 'http://192.168.43.195/admin/darDeBajaSensor';
    urlDarDeAltaSensorLocal = 'http://192.168.43.195/admin/darDeAltaSensor';
    urlEditarUsuarioAdministradorLocal = 'http://192.168.43.195/admin/editarUsuarioAdministrador';

    // Api de técnico local
    urlBasureroGuardarLocal = 'http://192.168.0.109:8080/basurero/guardarMedida';
    urlEditarUsuarioBasureroLocal = 'http://192.168.43.195/basurero/editarUsuarioBasurero';

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
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