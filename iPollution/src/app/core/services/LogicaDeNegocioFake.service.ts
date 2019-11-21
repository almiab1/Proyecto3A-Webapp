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

    // URL Base
    private urlServe = 'https://osblasae.upv.edu.es';

    // URL server remoto
    urlPOST = this.urlServe + '/guardarMedida';
    urlGET = this.urlServe + '/getUltimaMedida';
    urlGETAll = this.urlServe + '/getAllMedidas';


    // API de admin
    urlGetUsuarios = this.urlServe + '/admin/getUsuarios';
    urlGetNodos = this.urlServe + '/admin/getSensores';
    urlEditarUsuario = this.urlServe + '/admin/editarUsuario';
    urlAsociarSensorUsuario = this.urlServe + '/admin/asociarSensorUsuario';
    urlDarDeBajaUsuario = this.urlServe + '/admin/darDeBajaUsuario';
    urlDarDeAltaUsuario = this.urlServe + '/admin/darDeAltaUsuario';
    urlDarDeBajaSensor = this.urlServe + '/admin/darDeBajaSensor';
    urlDarDeAltaSensor = this.urlServe + '/admin/darDeAltaSensor';
    urlEditarUsuarioAdministrador = this.urlServe + '/admin/editarUsuarioAdministrador';

    // Api de técnico local
    urlBasureroGuardar = this.urlServe + '/basurero/guardarMedida';
    urlEditarUsuarioBasurero = this.urlServe + '/basurero/editarUsuarioBasurero';

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };

    // PRUEBAS USERS Y NODOS
    usuariosFicticios: any;

    nodosFicticios: any;

    constructor(
        public http: HttpClient
    ) {
        this.nodosFicticios = [{
                descripcion: 'Ozono',
                idUsuario: '1234@gmail.com',
                idSensor: 1
            },
            {
                descripcion: 'Ozono',
                idUsuario: '4567@gmail.com',
                idSensor: 2
            }
        ];
        this.usuariosFicticios = [{
                nombre: 'Santiago Moreno',
                descripcion: 'Basurero',
                idUsuario: '1234@5678.com',
                telefono: '622584526',
                idSensor: '01',
            },
            {
                nombre: 'Juan Pedro Rico',
                descripcion: 'Basurero',
                idUsuario: '5678@5678.com',
                telefono: '62525168',
                idSensor: '01',
            },
            {
                nombre: 'Antonio Fernandez',
                descripcion: 'Basurero',
                idUsuario: '9101@5678.com',
                telefono: '6548156',
                idSensor: '01',
            },
            {
                nombre: 'Pedro Jose Fernandez',
                descripcion: 'Basurero',
                idUsuario: '1213@5678.com',
                telefono: '6155895522',
                idSensor: '01',
            },
        ];
    }

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
                    // console.log(res);
                },
                err => {
                    console.log('ERROR --> ');
                    console.log(err);
                }
            );
    }
    // GET
    private async peticionGet(url) {

        let dataToReturn: any;
        this.http.get(url)
            .subscribe(
                res => {
                    dataToReturn = res;
                },
                err => {
                    if (err.status != 200) {
                        console.log('ERROR --> ' + err);
                        dataToReturn = err.status;
                    }
                }
            );
        console.log('--------------------__RETURN GET__-------------');
        console.log(dataToReturn);

        return dataToReturn;
    }
    // ------------------------------------------------------------------------------------


    // -----------------------------GET----------------------------------------------------
    // ------------------------------------------------------------------------------------
    // GET getUltimaMedicion()
    // ------------------------------------------------------------------------------------
    public async getUltimaMedicion() {
        const medicion: any = await this.peticionGet(this.urlGET);
        return JSON.parse(medicion);
    }

    // ------------------------------------------------------------------------------------
    // GET getUsuarios()
    // ------------------------------------------------------------------------------------
    public async getUsuarios() {

        let usuarios: any;
        usuarios = await this.peticionGet(this.urlGetUsuarios);
        console.log('-------------GET USUARIOS LOGICA------------------');
        console.table(usuarios);
        return usuarios;
        // return this.usuariosFicticios;
    }

    // ------------------------------------------------------------------------------------
    // GET getNodos()
    // ------------------------------------------------------------------------------------
    public async getNodos() {

        let nodos: any;
        nodos = await this.peticionGet(this.urlGetNodos);
        // console.log('-------------GET NODOS------------------');
        // console.table(nodos);
        return nodos;
        //return this.nodosFicticios;
    }

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

        this.peticionPost(this.urlBasureroGuardar, body);
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

        this.peticionPost(this.urlEditarUsuarioAdministrador, body);
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

        // this.usuariosFicticios.push(data);

        this.peticionPost(this.urlDarDeAltaUsuario, body);

    }

    // ------------------------------------------------------------------------------------
    // POST darDeAltaSensor()
    // Dar de alta al sensor
    // ------------------------------------------------------------------------------------
    public darDeAltaSensor(data) {

        const body = new HttpParams()
            .set('idTipoSensor', '' + data.idTipoSensor);

        // this.nodosFicticios.push(data);

        this.peticionPost(this.urlDarDeAltaSensor, body);
    }

    // ------------------------------------------------------------------------------------
    // POST asociarSensorAUsuario()
    // Asociar sensor con Usuario
    // ------------------------------------------------------------------------------------
    public asociarSensorAUsuario(data) {

        const body = new HttpParams()
            .set('idUsuario', '' + data.idUsuario)
            .set('idSensor', '' + data.idSensor);

        this.peticionPost(this.urlAsociarSensorUsuario, body);
    }

    // ------------------------------------------------------------------------------------
    // POST darDeBajaUsuario()
    // Dar de baja Usuario
    // ------------------------------------------------------------------------------------
    public darDeBajaUsuario(data) {

        const body = new HttpParams()
            .set('idUsuario', '' + data.idUsuario);

        // // Eleminar seleccionado ------- PRUEBA ----------------
        // this.usuariosFicticios.forEach(element => {
        //     console.log(element);
        //     if (element.idUsuario === data) {
        //         let index = this.usuariosFicticios.indexOf(element);
        //         console.log(index);
        //         this.usuariosFicticios.pop(index);
        //     }
        // });

        this.peticionPost(this.urlDarDeBajaUsuario, body);
    }

    // ------------------------------------------------------------------------------------
    // POST darDeBajaSensor()
    // Dar de baja Sensor
    // ------------------------------------------------------------------------------------
    public darDeBajaSensor(data) {

        const body = new HttpParams()
            .set('idSensor', '' + data.idSensor);

        // // Eleminar seleccionado ------- PRUEBA
        // this.nodosFicticios.forEach(element => {
        //     console.log(element);
        //     if (element.idSensor === data) {
        //         let index = this.nodosFicticios.indexOf(element);
        //         this.nodosFicticios.pop(index);
        //     }
        // });

        this.peticionPost(this.urlDarDeBajaSensor, body);
    }
}

// ----------------------------------------------------------------------------------------