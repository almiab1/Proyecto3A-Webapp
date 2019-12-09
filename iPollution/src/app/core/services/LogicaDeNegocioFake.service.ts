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
    private urlServeLocal = '192.168.43.205';

    // URL server remoto
    urlPOST = this.urlServe + '/guardarMedida';
    urlGET = this.urlServe + '/getUltimaMedida';
    urlGETAll = this.urlServe + '/getAllMedidas';

    urlGetMedidasOficiales = 'https://osblasae.upv.edu.es/getMedidasOficiales';


    // API de admin
    urlGetUsuarios = this.urlServe + '/admin/getUsuarios';
    urlGetNodos = this.urlServe + '/admin/getSensores';
    urlEditarUsuario = this.urlServe + '/admin/editarUsuario';
    urlAsociarSensorUsuario = this.urlServe + '/admin/asociarSensorUsuario';
    urlDarDeBajaUsuario = this.urlServe + '/admin/darBajaUsuario';
    urlDarDeAltaUsuario = this.urlServe + '/admin/darAltaUsuario';
    urlDarDeBajaSensor = this.urlServe + '/admin/darBajaSensor';
    urlDarDeAltaSensor = this.urlServe + '/admin/darAltaSensor';
    urlEditarUsuarioAdministrador = this.urlServe + '/admin/editarUsuarioAdministrador';

    // Api de técnico local
    urlBasureroGuardar = this.urlServe + '/basurero/guardarMedida';
    urlEditarUsuarioBasurero = this.urlServe + '/basurero/editarUsuarioBasurero';

    // Http Options
    protected httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        })
    };

    protected httpOptionsGet = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
      }
/*
    // PRUEBAS USERS Y NODOS
    usuariosFicticios: any;

    nodosFicticios: any;
*/
    constructor(
        public http: HttpClient
    ) {
/*
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
*/
    }
/*
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
*/
    // ------------------------------------------------------------------------------------
    // Funciones para GET y POS
    // POST
    private peticionPost(url, body) {
        this.http.post(url, body, this.httpOptions)
            .subscribe(
                res => {
                    console.log('RES --> ');
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

        let dataToReturn: any;
        this.http.get(url, this.httpOptions)
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
    // DELETE
    private peticionDelete(url): Observable<any> {
        return this.http.delete(url, this.httpOptions);
    }
    // ------------------------------------------------------------------------------------


    // -----------------------------GET----------------------------------------------------
    // ------------------------------------------------------------------------------------
    // GET getUltimaMedicion()
    // ------------------------------------------------------------------------------------
    public getUltimaMedicion(): Observable < any > {
        return this.http
            .get(this.urlGET, this.httpOptions)
            .pipe();

        // return this.usuariosFicticios;
    }

    // ------------------------------------------------------------------------------------
    // GET getUsuarios() --> array de usurarios
    // ------------------------------------------------------------------------------------
    public getUsuarios(): Observable < any > {
        return this.http
            .get(this.urlGetUsuarios, this.httpOptions)
            .pipe();

        // return this.usuariosFicticios;
    }

    // ------------------------------------------------------------------------------------
    //  getMedidasOficiales()
    // ------------------------------------------------------------------------------------
    public getMedidasOficiales(): Observable < any > {
        return this.http
            .get(this.urlGetMedidasOficiales, this.httpOptionsGet)
            .pipe();
    }

    // ------------------------------------------------------------------------------------
    // GET getNodos() --> array de nodos
    // ------------------------------------------------------------------------------------
    public getNodos(): Observable < any > {
        return this.http
            .get(this.urlGetNodos, this.httpOptions)
            .pipe();

        // return this.nodosFicticios;
    }

    // ------------------------------------------------------------------------------------
    // GET getAllMedidas()
    // ------------------------------------------------------------------------------------
    getAllMedidas(): Observable < any > {
        return this.http
            .get(this.urlGETAll, this.httpOptionsGet)
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

        this.http.post(this.urlBasureroGuardar, body, this.httpOptions).subscribe(data => {
            console.log('Se ha hecho la peticion');
        }, err => {
            console.log('ERROR!' + err);
        });

        // this.peticionPost(this.urlBasureroGuardar, body);
    }

    // ------------------------------------------------------------------------------------
    // POST darDeAltaUsuario()
    // Enviar datos para dar de alta el usuario
    // ------------------------------------------------------------------------------------
    public darDeAltaUsuario(data) {

        const body = {
            nombre: data.nombre,
            idUsuario: data.idUsuario,
            contrasenya: data.contrasenya,
            idTipoUsuario: data.idTipoUsuario,
            telefono: data.telefono,
        }
        // this.usuariosFicticios.push(data);

        this.http.post(this.urlDarDeAltaUsuario, JSON.stringify(body), this.httpOptions).subscribe(
            data => console.log('--------------Se ha hecho la peticion--------------'),
            err => {
            console.log('ERROR! -->');
            console.log(err);
        });

        // this.peticionPost(this.urlDarDeAltaUsuario, body);

    }

    // ------------------------------------------------------------------------------------
    // POST darDeAltaSensor()
    // Dar de alta al sensor
    // ------------------------------------------------------------------------------------
    public darDeAltaSensor(data) {

        const body = {
            idTipoSensor: data.idTipoSensor,
            idSensor: data.idSensor,
            idUsuario: data.idUsuario
        };
        // this.nodosFicticios.push(data);

        this.http.post(this.urlDarDeAltaSensor, JSON.stringify(body), this.httpOptions)
        .subscribe(
            data => console.log('Se ha hecho la peticion'),
            err => {
            console.log('ERROR!' + err);
            console.log(err);
        });
        // this.peticionPost(this.urlDarDeAltaSensor, body);
    }

    // ------------------------------------------------------------------------------------
    // POST darDeBajaUsuario()
    // Dar de baja Usuario
    // idUsuario --> darDeBajaUsuario()
    // ------------------------------------------------------------------------------------
    public darDeBajaUsuario(data){

        // // Eleminar seleccionado ------- PRUEBA ----------------
        // this.usuariosFicticios.forEach(element => {
        //     console.log(element);
        //     if (element.idUsuario === data) {
        //         let index = this.usuariosFicticios.indexOf(element);
        //         console.log(index);
        //         this.usuariosFicticios.pop(index);
        //     }
        // });
        this.peticionDelete(this.urlDarDeBajaUsuario + '/' + data)
        .subscribe(
            data => console.log('--------------Se ha hecho la peticion--------------'),
            err => {
            console.log('ERROR --> ');
            console.log(err);
        });
    }

    // ------------------------------------------------------------------------------------
    // POST darDeBajaSensor()
    // Dar de baja Sensor
    // ------------------------------------------------------------------------------------
    public darDeBajaSensor(data) {

        // // Eleminar seleccionado ------- PRUEBA
        // this.nodosFicticios.forEach(element => {
        //     console.log(element);
        //     if (element.idSensor === data) {
        //         let index = this.nodosFicticios.indexOf(element);
        //         this.nodosFicticios.pop(index);
        //     }
        // });

        // this.http.delete(this.urlDarDeBajaSensor, body).subscribe(data => {
        //     console.log("Se ha hecho la peticion");
        // }, err => {
        //     console.log("ERROR!" + err);
        // });

        this.peticionDelete(this.urlDarDeBajaSensor + '/' + data)
        .subscribe(
            data => console.log('--------------Se ha hecho la peticion--------------'),
            err => {
            console.log('ERROR --> ');
            console.log(err);
        });
    }
}

// ----------------------------------------------------------------------------------------
