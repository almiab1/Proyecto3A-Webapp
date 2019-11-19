// ------------------------------------------------------------------------------------
// LogicaDeNegocioFake.service.ts
// Equipo 4
// Alejandro Mira Abad
// Fecha
// CopyRight
// ------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------
// Includes
// ------------------------------------------------------------------------------------
import {
    Injectable
} from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse
} from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
// ------------------------------------------------------------------------------------
// Class LogicaDeNegocioFake
// ------------------------------------------------------------------------------------
@Injectable()
export class LogicaDeNegocioFake {
    // URL server en local
    urlGetLocal = 'http://192.168.100.205/getultimaMedicion';
    urlPostLocal = 'http://192.168.100.103/guardarO3/';
    // URL server remoto
    urlPOST = 'https://osblasae.upv.edu.es/guardarMedida';
    urlGET = 'https://osblasae.upv.edu.es/getUltimaMedida';
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
    };

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

    // -----------------------------GET----------------------------------------------------
    // ------------------------------------------------------------------------------------
    // GET getUltimaMedicion()
    // ------------------------------------------------------------------------------------
    getUltimaMedicion(): Observable < any > {
        return this.http
            .get(this.urlGET, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
            );
    }

     // -----------------------------GET----------------------------------------------------
    // ------------------------------------------------------------------------------------
    // GET getAllMedidas()
    // ------------------------------------------------------------------------------------
    getAllMedidas(): Observable < any > {
        return this.http
            .get(this.urlGETAll, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
            );
    }

    // -----------------------------GET----------------------------------------------------
    // ------------------------------------------------------------------------------------
    // GET getUltimaMedicion()
    // ------------------------------------------------------------------------------------
    getUsuarios() {
        // return this.http
        //     .get(this.urlGET, this.httpOptions)
        //     .pipe(
        //         // retry(2),
        //         // catchError(this.handleError)
        //     );
        const datos = [
            'Alex',
            'Pepe',
            'Juan'
        ];
        return datos;
    }


    // -----------------------------POST---------------------------------------------------
    // ------------------------------------------------------------------------------------
    // POST guardarMedida
    // ------------------------------------------------------------------------------------
    guardarMedida(data): Observable < any > {
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
            .post < any > (this.urlBasureroGuardarLocal,
                JSON.stringify(datos),
                this.httpOptions);
        // .pipe(
        //     // retry(2),
        //     catchError(this.handleError)
        // );
    }

    // ------------------------------------------------------------------------------------
    // POST editarUsuario()
    // Enviar datos para editar el usuario
    // ------------------------------------------------------------------------------------
    editarUsuario(data): Observable < any > {
        // JSON a enviar
        const datos = {
            idUsuario: data.idUsuario,
            password: data.password,
            tipoUsuario: data.tipoUsuario,
            telefono: data.telefono
        };
        return this.http
            .post < any > (this.urlEditarUsuarioAdministradorLocal,
                JSON.stringify(datos),
                this.httpOptions);
        // .pipe(
        //     // retry(2),
        //     catchError(this.handleError)
        // );
    }

    // ------------------------------------------------------------------------------------
    // POST darDeAltaUsuario()
    // Enviar datos para dar de alta el usuario
    // ------------------------------------------------------------------------------------
    darDeAltaUsuario(data): Observable < any > {
        // JSON a enviar
        const datos = {
            idUsuario: data.idUsuario,
            password: data.password,
            tipoUsuario: data.tipoUsuario,
            telefono: data.telefono
        };
        return this.http
            .post < any > (this.urlDarDeAltaUsuarioLocal,
                JSON.stringify(datos),
                this.httpOptions);
        // .pipe(
        //     // retry(2),
        //     catchError(this.handleError)
        // );
    }

    // ------------------------------------------------------------------------------------
    // POST darDeAltaSensor()
    // Dar de alta al sensor
    // ------------------------------------------------------------------------------------
    darDeAltaSensor(data): Observable < any > {
        // JSON a enviar
        const datos = {
            idTipoSensor: data.idTipoSensor
        };
        return this.http
            .post < any > (this.urlDarDeAltaSensorLocal,
                JSON.stringify(datos),
                this.httpOptions);
        // .pipe(
        //     // retry(2),
        //     catchError(this.handleError)
        // );
    }

    // ------------------------------------------------------------------------------------
    // POST asociarSensorAUsuario()
    // Asociar sensor con Usuario
    // ------------------------------------------------------------------------------------
    asociarSensorAUsuario(data): Observable < any > {
        // JSON a enviar
        const datos = {
            idUsuario: data.idUsuario,
            idSensor: data.idSensor
        };
        return this.http
            .post < any > (this.urlAsociarSensorUsuarioLocal,
                JSON.stringify(datos),
                this.httpOptions);
        // .pipe(
        //     // retry(2),
        //     catchError(this.handleError)
        // );
    }

    // ------------------------------------------------------------------------------------
    // POST darDeBajaUsuario()
    // Dar de baja Usuario
    // ------------------------------------------------------------------------------------
    darDeBajaUsuario(data): Observable < any > {
        // JSON a enviar
        const datos = {
            idUsuario: data.idUsuario
        };
        return this.http
            .post < any > (this.urlDarDeBajaUsuarioLocal,
                JSON.stringify(datos),
                this.httpOptions);
        // .pipe(
        //     // retry(2),
        //     catchError(this.handleError)
        // );
    }

    // ------------------------------------------------------------------------------------
    // POST darDeBajaSensor()
    // Dar de baja Sensor
    // ------------------------------------------------------------------------------------
    darDeBajaSensor(data): Observable < any > {
        // JSON a enviar
        const datos = {
            idSensor: data.idSensor
        };
        return this.http
            .post < any > (this.urlDarDeBajaSensorLocal,
                JSON.stringify(datos),
                this.httpOptions);
        // .pipe(
        //     // retry(2),
        //     catchError(this.handleError)
        // );
    }
}

// ------------------------------------------------------------------------------------
