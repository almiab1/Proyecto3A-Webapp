export interface Ruta {
    nombreRuta: string;
    tipoRuta: string;
    ruta: [];
    idUsuario?: string;
}

export interface RutasPreviamenteCreadas {
    nombreRuta: string;
    puntoInicial: Posicion;
    wayPoints: Location[];
    puntoFinal: Posicion;
}

export interface RutasRealizadas {
    nombreRuta: string;
    path: Posicion[];
}

export interface Posicion {
    lat: number;
    lng: number;
}

export interface Location {
    location: Posicion;
}