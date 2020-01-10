import {
    DataService
} from './data.service';
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
import {
    Ruta
} from '../../models/Rutas';
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
    urlDistanciaUsuario = this.urlServe + '/admin/distanciaActividad/';
    urlEstadoUnSensor = this.urlServe + '/admin/estadoUnSensor';
    urlEstadoSensores = this.urlServe + '/admin/estadoSensores';
    urlPrecisionUnSensor = this.urlServe + '/admin/precisionUnSensor';
    urlPrecisionSensores = this.urlServe + '/admin/precisionTodosSensores';
    urlGetRutasPredefinidasAdmin = this.urlServe + '/admin/getRutasPredefinidas';
    urlGetRutasRealizadasAdmin = this.urlServe + '/admin/getRutasRealizadas';
    urlPostRutaAdmin = this.urlServe + '/admin/postRuta';
    urlDeleteRuta = this.urlServe + '/admin/deleteRuta';

    // API de basurero
    urlGetRutasPredefinidasBasurero = this.urlServe + '/basurero/getRutasPredefinidas';
    urlGetRutasRealizadasBasurero = this.urlServe + '/basurero/getRutasRealizadas';
    urlPostRutaBasurero = this.urlServe + '/basurero/postRuta';
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
    };

    constructor(
        public http: HttpClient,
        public dataService: DataService
    ) {}
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
    private peticionDelete(url): Observable < any > {
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

    // ------------------------------------------------------------------------------------
    // GET getDistanciaUsuario()
    // ------------------------------------------------------------------------------------
    getDistanciaUsuario(data): Observable < any > {
        return this.http
            .get(this.urlDistanciaUsuario + data, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
            );
    }

    // ------------------------------------------------------------------------------------
    // GET getEstadoUnSensor()
    // ------------------------------------------------------------------------------------
    getEstadoUnSensor(data): Observable < any > {
        return this.http
            .get(this.urlEstadoUnSensor + '/' + data, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
            );
    }

    // ------------------------------------------------------------------------------------
    // GET getPrecisionUnSensor()
    // ------------------------------------------------------------------------------------
    getPrecisionUnSensor(data): Observable < any > {
        return this.http
            .get(this.urlPrecisionUnSensor + '/' + data, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
            );
    }

    // ------------------------------------------------------------------------------------
    // GET getEstadoSensores()
    // ------------------------------------------------------------------------------------
    getEstadoSensores(): Observable < any > {
        return this.http
            .get(this.urlEstadoSensores, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
            );
    }

    // ------------------------------------------------------------------------------------
    // GET getPrecisionSensores()
    // ------------------------------------------------------------------------------------
    getPrecisionSensores(): Observable < any > {
        return this.http
            .get(this.urlPrecisionSensores, this.httpOptions)
            .pipe(
                // retry(2),
                // catchError(this.handleError)
            );
    }

    // ------------------------------------------------------------------------------------
    // GET getRutas()
    // ------------------------------------------------------------------------------------
    getRutas(tipoRuta, idUsuario): Observable < any > {
        switch (this.dataService.rolUser) {
            case 1: {
                //Estado basurero
                if (tipoRuta == 0) {
                    return this.http
                        .get(this.urlGetRutasPredefinidasBasurero); // Peticion cuando eres basurero y queres realizar consulta de una ruta predefinida
                } else if (tipoRuta == 1) {
                    return this.http
                        .get(this.urlGetRutasRealizadasBasurero + '/' + idUsuario); // Peticion cuando eres basurero y queres realizar consulta de una ruta realizada
                }
            }
            case 2: {
                //Estado admin
                if (tipoRuta == 0) {
                    return this.http
                        .get(this.urlGetRutasPredefinidasAdmin); // Peticion cuando eres admin y queres realizar consulta de una ruta predefinida
                } else if (tipoRuta == 1) {
                    return this.http
                        .get(this.urlGetRutasRealizadasAdmin + '/' + idUsuario); // Peticion cuando eres admin y queres realizar consulta de una ruta realizada
                }
            }
            default: {
                //Estado por defecto
                break;
            }
        }
    }


    // -----------------------------POST---------------------------------------------------
    // ------------------------------------------------------------------------------------
    // POST guardarMedida
    // ------------------------------------------------------------------------------------
    public guardarMedida(data) {

        // const body = new HttpParams()
        //     .set('valorMedido', '' + data.valorMedido)
        //     .set('tiempo', '' + data.tiempo)
        //     .set('latitud', '' + data.latitud)
        //     .set('longitud', '' + data.longitud)
        //     .set('idUsuario', 'a@gmail.com')
        //     .set('idTipoMedida', '1')
        //     .set('idSensor', '1')
        //     .set('temperatura', '' + data.temperatura)
        //     .set('humedad', '' + data.humedad);

        const body = {
            valorMedido: data.valorMedido,
            tiempo: data.tiempo,
            latitud: data.latitud,
            longitud: data.longitud,
            idUsuario: this.dataService.idUser,
            idSensor: 1,
            idTipoMedida: 1,
            temperatura: data.temperatura,
            humedad: data.humedad,
        }
        this.http.post(this.urlBasureroGuardar, JSON.stringify(body), this.httpOptions).subscribe(data => {
            console.log('Se ha hecho la peticion post guardarMedida');
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
        };
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
    // POST portRuta()
    // Guardar en la BD una ruta
    // ------------------------------------------------------------------------------------
    public postRuta(data, tipoRutaPost) {

        const ruta: Ruta = {
            nombreRuta: data.nombreRuta,
            tipoRuta: tipoRutaPost,
            ruta: data.ruta.toString(),
            idUsuario: this.dataService.idUser,
        };

        switch (this.dataService.rolUser) {
            case 1: {
                //Estado basurero
                this.http.post(this.urlPostRutaBasurero, JSON.stringify(ruta), this.httpOptions)
                    .subscribe(
                        data => console.log('Se ha hecho la peticion postRuta'),
                        err => {
                            console.log('ERROR!' + err);
                            console.log(err);
                        });
                break;
            }
            case 2: {
                //Estado admin cuando quieres hacer un post de una ruta
                this.http.post(this.urlPostRutaBasurero, JSON.stringify(ruta), this.httpOptions)
                    .subscribe(
                        data => console.log('Se ha hecho la peticion postRuta'),
                        err => {
                            console.log('ERROR!' + err);
                            console.log(err);
                        });
                break;
            }
            default: {
                //Estado por defecto 
                break;
            }
        }
    }

    // -----------------------------Delete-------------------------------------------------
    // ------------------------------------------------------------------------------------
    // Delete darDeBajaUsuario()
    // Dar de baja Usuario
    // idUsuario --> darDeBajaUsuario()
    // ------------------------------------------------------------------------------------
    public darDeBajaUsuario(data) {

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
    // Delete darDeBajaSensor()
    // Dar de baja Sensor
    // ------------------------------------------------------------------------------------
    public darDeBajaSensor(data) {

        this.peticionDelete(this.urlDarDeBajaSensor + '/' + data)
            .subscribe(
                data => console.log('--------------Se ha hecho la peticion--------------'),
                err => {
                    console.log('ERROR --> ');
                    console.log(err);
                });
    }

    // ------------------------------------------------------------------------------------
    // Delete eliminarRuta()
    // nombreRuta: string --> eliminarRuta() -->
    // Eliminar una ruta de la bd
    // ------------------------------------------------------------------------------------
    public eliminarRuta(nombreRuta) {

        this.peticionDelete(this.urlDeleteRuta + '/' + nombreRuta)
            .subscribe(
                data => console.log('--------------Se ha hecho la peticion--------------'),
                err => {
                    console.log('ERROR --> ');
                    console.log(err);
                });
    }
}

// ----------------------------------------------------------------------------------------