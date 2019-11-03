import { TestBed } from '@angular/core/testing';
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



    constructor(
        public http: HttpClient
    ) {}

    // Realiza la conexión a la API REST
    async getUltimaMedicion() {
        return new Promise(resolve => {
            this.http.get(this.urlGET).subscribe(data => {
                resolve(data);
            }, error => {
                console.log(error);
            });
        });
    }
    // Enviar datos a la API Rest
    async guardarMedida(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.urlBasureroGuardar, JSON.stringify({
                valorMedido: data.valorMedido,
                idUsuario: data.isUsuario,
                latitud: data.latitud,
                longitud: data.longitud,
                tiempo: data.tiempo,
                idTipoMedida: data.idTipoMedida
            }),
                        {observe: 'response'}
                )
                .subscribe(response => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });
        });
    }

    // Enviar datos para editar el usuario
    async editarUsuario(data) {
        return new Promise((resolve, reject) => {
            this.http.post(this.urlEditarUsuarioAdministrador, JSON.stringify({
                idUsuario: data.idUsuario,
                password: data.password,
                tipoUsuario: data.tipoUsuario,
                telefono: data.telefono
            }),
                        {observe: 'response'}
                )
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
            this.http.post(this.urlDarDeAltaUsuario, JSON.stringify({
                idUsuario: data.idUsuario,
                password: data.password,
                tipoUsuario: data.tipoUsuario,
                telefono: data.telefono
            }),
                {observe: 'response'}
                )
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
            // this.http.post(this.urlPostLocal + data.valor + '&' + data.instante + '&' + data.lat + '&' + data.long, JSON.stringify(data))
            this.http.post(this.urlDarDeAltaSensor, JSON.stringify({
                idTipoSensor: data.idTipoSensor
            }),
                {observe: 'response'}
                )
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
            this.http.post(this.urlAsociarSensorUsuario, JSON.stringify({
                idUsuario: data.idUsuario,
                idSensor: data.idSensor
            }),
                {observe: 'response'}
                )
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
            this.http.post(this.urlDarDeBajaUsuario, JSON.stringify({
                idUsuario: data.idUsuario
            }),
                {observe: 'response'}
                )
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
            this.http.post(this.urlDarDeBajaSensor, JSON.stringify({
                idSensor: data.idSensor
            }),
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
