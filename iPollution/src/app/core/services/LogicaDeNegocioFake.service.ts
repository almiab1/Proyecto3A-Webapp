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
    HttpErrorResponse,
    HttpParams
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
    urlGetLocal = 'https://192.168.100.205/getultimaMedicion';
    urlPostLocal = 'https://192.168.100.103/guardarO3/';
    // URL server remoto
    urlPOST = 'https://osblasae.upv.edu.es/guardarMedida';
    urlGET = 'https://192.168.0.109:8080/getUltimaMedida';

    urlGetMedidasOficiales = 'https://osblasae.upv.edu.es/getMedidasOficiales';

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
    urlEditarUsuarioLocal = 'https://osblasae/admin/editarUsuario';
    urlAsociarSensorUsuarioLocal = 'https://osblasae.upv.edu.es/admin/asociarSensorUsuario';
    urlDarDeBajaUsuarioLocal = 'https://osblasae.upv.edu.es/admin/darDeBajaUsuario';
    urlDarDeAltaUsuarioLocal = 'https://osblasae.upv.edu.es/admin/darDeAltaUsuario';
    urlDarDeBajaSensorLocal = 'https://osblasae.upv.edu.es/admin/darDeBajaSensor';
    urlDarDeAltaSensorLocal = 'https://osblasae.upv.edu.es/admin/darDeAltaSensor';
    urlEditarUsuarioAdministradorLocal = 'https://osblasae.upv.edu.es/admin/editarUsuarioAdministrador';

    // Api de técnico local
    urlBasureroGuardarLocal = 'https://osblasae.upv.edu.es/basurero/guardarMedida';
    urlEditarUsuarioBasureroLocal = 'https://osblasae.upv.edu.es/basurero/editarUsuarioBasurero';

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
    // ------------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------------
    // Funciones para GET y POS
    // POST
    private peticionPost(url, body) {
        this.http.post(url, body)
            .subscribe(
                res => {
                    console.log(res);
                },
                err => {
                    console.log('ERROR --> ');
                    console.log(err);
                }
            );
    }
    // GET
    private peticionGet(url) {
        this.http.get(url)
            .subscribe(
                res => {
                    console.log(res);
                },
                err => {
                    if (err.status != 200) {
                        console.log('ERROR --> ' + err);
                    }
                }
            );
    }
    // ------------------------------------------------------------------------------------


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
    // GET getUsuarios()
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

    // ------------------------------------------------------------------------------------
    //  getMedidasOficiales()
    // ------------------------------------------------------------------------------------
    getMedidasOficiales(): Observable < any > {
        return this.http
            .get(this.urlGetMedidasOficiales, this.httpOptions)
            .pipe();
    }

    // -----------------------------POST---------------------------------------------------
    // ------------------------------------------------------------------------------------
    // POST guardarMedida
    // ------------------------------------------------------------------------------------
    public guardarMedida(data) {

        const body = new HttpParams()
            .set('valorMedido', '' + data.valorMedido)
            .set('tiempo', '' + data.tiempo)
            .set('latitud', '' + data.latitud)
            .set('longitud', '' + data.longitud)
            .set('idUsuario', 'a@gmail.com')
            .set('idTipoMedida', '1')
            .set('idSensor', '1')
            .set('temperatura', '' + data.temperatura)
            .set('humedad', '' + data.humedad);

        this.peticionPost(this.urlBasureroGuardarLocal, body);
    }

    // ------------------------------------------------------------------------------------
    // POST editarUsuario()
    // Enviar datos para editar el usuario
    // ------------------------------------------------------------------------------------
    public editarUsuario(data) {

        const body = new HttpParams()
            .set('idUsuario', '' + data.idUsuario)
            .set('password', '' + data.password)
            .set('tipoUsuario', '' + data.tipoUsuario)
            .set('telefono', '' + data.telefono);

        this.peticionPost(this.urlEditarUsuarioAdministradorLocal, body);
    }

    // ------------------------------------------------------------------------------------
    // POST darDeAltaUsuario()
    // Enviar datos para dar de alta el usuario
    // ------------------------------------------------------------------------------------
    public darDeAltaUsuario(data) {

        const body = new HttpParams()
            .set('idUsuario', '' + data.idUsuario)
            .set('password', '' + data.password)
            .set('tipoUsuario', '' + data.tipoUsuario)
            .set('telefono', '' + data.telefono);

        this.peticionPost(this.urlDarDeAltaUsuarioLocal, body);

    }

    // ------------------------------------------------------------------------------------
    // POST darDeAltaSensor()
    // Dar de alta al sensor
    // ------------------------------------------------------------------------------------
    public darDeAltaSensor(data) {

        const body = new HttpParams()
            .set('idTipoSensor', '' + data.idTipoSensor);

        this.peticionPost(this.urlDarDeAltaSensorLocal, body);
    }

    // ------------------------------------------------------------------------------------
    // POST asociarSensorAUsuario()
    // Asociar sensor con Usuario
    // ------------------------------------------------------------------------------------
    public asociarSensorAUsuario(data) {

        const body = new HttpParams()
            .set('idUsuario', '' + data.idUsuario)
            .set('idSensor', '' + data.idSensor);

        this.peticionPost(this.urlAsociarSensorUsuarioLocal, body);
    }

    // ------------------------------------------------------------------------------------
    // POST darDeBajaUsuario()
    // Dar de baja Usuario
    // ------------------------------------------------------------------------------------
    public darDeBajaUsuario(data) {

        const body = new HttpParams()
            .set('idUsuario', '' + data.idUsuario);

        this.peticionPost(this.urlDarDeBajaUsuarioLocal, body);
    }

    // ------------------------------------------------------------------------------------
    // POST darDeBajaSensor()
    // Dar de baja Sensor
    // ------------------------------------------------------------------------------------
    public darDeBajaSensor(data) {

        const body = new HttpParams()
            .set('idSensor', '' + data.idSensor);

        this.peticionPost(this.urlDarDeBajaSensorLocal, body);
    }
}

// ------------------------------------------------------------------------------------
