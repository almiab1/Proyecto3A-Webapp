export interface Ruta {
    nombreRuta: string;
    tipoRuta: string;
    ruta: Position[];
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
    ruta: Posicion[];
}

export interface Posicion {
    lat: number;
    lng: number;
}

export interface Location {
    location: Posicion;
}